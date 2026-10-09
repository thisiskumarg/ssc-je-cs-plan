import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import {
  type Slot,
  days,
  kindLabel,
  slotsFor,
  studyMinutes,
  tally,
} from "@/lib/plan";
import { paperLabel, topicsOnDay } from "@/lib/official-syllabus";
import { formulaSheets, sheetsForDay } from "@/lib/formulas";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 36;
const INK = rgb(0.12, 0.11, 0.1);
const MUTED = rgb(0.38, 0.34, 0.3);
const RULE = rgb(0.78, 0.74, 0.68);
const NAVY = rgb(0.15, 0.22, 0.36);

const romanDay: Record<string, string> = {
  रविवार: "Ravivar",
  सोमवार: "Somvar",
  मंगलवार: "Mangalvar",
  बुधवार: "Budhvar",
  गुरुवार: "Guruvar",
  शुक्रवार: "Shukravar",
  शनिवार: "Shanivar",
};

function pdfSafe(input: string) {
  const mapped = input
    .replace(/[–—]/g, "-")
    .replace(/−/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/·/g, "|")
    .replace(/×/g, "x")
    .replace(/…/g, "...");
  let out = "";
  for (const ch of mapped) {
    const code = ch.codePointAt(0) ?? 0;
    if (code === 10 || (code >= 32 && code <= 126) || (code >= 160 && code <= 255)) {
      out += ch;
    }
  }
  return out.replace(/[ \t]{2,}/g, " ").trim();
}

function minutesBetween(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return eh * 60 + em - (sh * 60 + sm);
}

function asciiDuration(mins: number) {
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours}h`;
  return `${hours}h ${rest}m`;
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const clean = pdfSafe(text);
  if (!clean) return [];
  const words = clean.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      line = next;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function buildSchedulePdf(saturdayDuty: boolean) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  doc.setTitle(
    saturdayDuty
      ? "SSC JE CS plan, 8-31 Oct 2026, Saturday duty"
      : "SSC JE CS plan, 8-31 Oct 2026",
  );
  doc.setAuthor("SSC JE CS planner");

  drawCover(doc, font, bold, saturdayDuty);
  drawIndex(doc, font, bold, saturdayDuty);
  for (const day of days) {
    drawDay(doc, font, bold, day.iso, saturdayDuty);
  }
  drawFormulaAppendix(doc, font, bold);

  return doc.save();
}

function drawCover(
  doc: PDFDocument,
  font: PDFFont,
  bold: PDFFont,
  saturdayDuty: boolean,
) {
  const page = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - 56;
  page.drawText("SSC JE 2026  |  Part-D  |  Computer Science & IT", {
    x: MARGIN,
    y,
    size: 11,
    font,
    color: MUTED,
  });
  y -= 28;
  page.drawText("8 October - 31 October", {
    x: MARGIN,
    y,
    size: 22,
    font: bold,
    color: INK,
  });
  y -= 18;
  page.drawText(
    saturdayDuty
      ? "Saturday bhi duty: 10:00-19:00. Padhai subah 6:00 aur raat 8:00."
      : "Office Mon-Fri 10:00-19:00. Saturday aur Sunday study days.",
    { x: MARGIN, y, size: 11, font, color: INK },
  );
  y -= 28;
  y = section(page, bold, y, "Roz ka ghadi, office day");
  const clock = [
    ["06:00-07:20", "1h 20m", "Naya technical topic"],
    ["07:20-07:35", "15 min", "Break. Agle sawal khol ke rakho"],
    ["07:35-08:50", "1h 15m", "Technical practice, about 25 MCQ"],
    ["08:50-10:00", "1h 10m", "Nikalna. 9:15 tak ghar se bahar"],
    ["10:00-13:00", "3h", "Office kaam. Naya chapter nahi"],
    ["13:00-13:20", "20 min", "Zaroori: aaj ki formula sheet + 6 MCQ"],
    ["13:20-16:30", "3h 10m", "Office kaam"],
    ["16:30-16:42", "12 min", "Zaroori: sheet band, formulas yaad"],
    ["16:42-18:50", "2h 8m", "Office kaam"],
    ["18:50-19:00", "10 min", "Zaroori: 5 formulas pocket card"],
    ["19:00-20:00", "1h", "Ghar, khana, kapde"],
    ["20:00-20:25", "25 min", "General Awareness"],
    ["20:25-21:40", "1h 15m", "Doosra technical hissa + MCQ"],
    ["21:40-21:50", "10 min", "Paani aur stretch"],
    ["21:50-22:35", "45 min", "Reasoning"],
    ["22:35-22:50", "15 min", "Error copy. Phir neend"],
  ];
  for (const [time, dur, what] of clock) {
    page.drawText(time, { x: MARGIN, y, size: 10, font: bold, color: INK });
    page.drawText(dur, { x: MARGIN + 108, y, size: 10, font, color: NAVY });
    page.drawText(what, { x: MARGIN + 168, y, size: 10, font, color: INK });
    y -= 16;
  }
  y -= 10;
  y = section(page, bold, y, "Weekend");
  const weekend = saturdayDuty
    ? [
        "Shanivar bhi office day jaisa hai: subah 6:00-8:50 aur raat 8:00-10:50.",
        "Ravivar lambi padhai: subah topic, 2 baje timed test, phir analysis.",
      ]
    : [
        "Shanivar: kareeb 7-8 ghante. Beech mein 12:00-14:30 aaram.",
        "Ravivar: subah topic, 2 baje timed test, shaam ko analysis.",
      ];
  for (const line of weekend) {
    for (const wrapped of wrap(line, font, 11, PAGE_W - MARGIN * 2)) {
      page.drawText(wrapped, { x: MARGIN, y, size: 11, font, color: INK });
      y -= 15;
    }
  }
  y -= 8;
  y = section(page, bold, y, "Strict rules");
  const rules = [
    "Paper-II merit hai: 100 sawal, 300 marks, har galat par -1. Andaza kam.",
    "Paper-I shortlist hai: Reasoning 50, GA 50, CS 100, har galat par -0.25.",
    "Tracker future slot lock karta hai. Time shuru hone se pehle tick nahi hota.",
    "Jo slot nikal gaya aur tick nahi, woh Missed rehta hai jab tak complete na karo.",
    "Ek hi notes aur ek error copy. 23:00 ke baad naya topic nahi.",
    "Office ke teen slot zaroori hain: lunch formula, chai recall, nikalte hue 5 line.",
    "Formula sheet ant ke pages par hai. Lunch par wahi din ki sheet.",
  ];
  for (const rule of rules) {
    for (const line of wrap(rule, font, 11, PAGE_W - MARGIN * 2 - 12)) {
      page.drawText(line, { x: MARGIN + 12, y, size: 11, font, color: INK });
      y -= 15;
    }
    y -= 2;
  }
  page.drawText("Har din ka time, topic aur duration agle pages par hai.", {
    x: MARGIN,
    y: 48,
    size: 10,
    font,
    color: MUTED,
  });
}

function section(page: PDFPage, bold: PDFFont, y: number, title: string) {
  page.drawText(title, { x: MARGIN, y, size: 13, font: bold, color: NAVY });
  return y - 20;
}

function drawIndex(
  doc: PDFDocument,
  font: PDFFont,
  bold: PDFFont,
  saturdayDuty: boolean,
) {
  const page = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - 48;
  page.drawText("24 din, ek nazar", {
    x: MARGIN,
    y,
    size: 16,
    font: bold,
    color: INK,
  });
  y -= 22;
  page.drawText("Date", { x: MARGIN, y, size: 9, font: bold, color: MUTED });
  page.drawText("Topic", { x: MARGIN + 150, y, size: 9, font: bold, color: MUTED });
  page.drawText("Padhai", { x: MARGIN + 390, y, size: 9, font: bold, color: MUTED });
  page.drawText("MCQ", { x: MARGIN + 460, y, size: 9, font: bold, color: MUTED });
  y -= 8;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_W - MARGIN, y },
    thickness: 0.6,
    color: RULE,
  });
  y -= 16;
  for (const day of days) {
    const slots = slotsFor(day, saturdayDuty);
    const questions = tally(slots);
    const mcq = questions.tech + questions.reasoning + questions.ga;
    page.drawText(`${day.dateLabel}  ${romanDay[day.weekday] ?? ""}`, {
      x: MARGIN,
      y,
      size: 10,
      font: bold,
      color: INK,
    });
    page.drawText(pdfSafe(day.title), {
      x: MARGIN + 150,
      y,
      size: 10,
      font,
      color: INK,
    });
    page.drawText(asciiDuration(studyMinutes(slots)), {
      x: MARGIN + 390,
      y,
      size: 10,
      font,
      color: NAVY,
    });
    page.drawText(String(mcq), {
      x: MARGIN + 460,
      y,
      size: 10,
      font,
      color: INK,
    });
    y -= 18;
  }
  y -= 8;
  page.drawText(
    "Padhai ka time office aur breaks ke bagair hai. MCQ us din ke technical + reasoning + GA ka target hai.",
    { x: MARGIN, y, size: 9, font, color: MUTED },
  );
}

function drawDay(
  doc: PDFDocument,
  font: PDFFont,
  bold: PDFFont,
  iso: string,
  saturdayDuty: boolean,
) {
  const day = days.find((item) => item.iso === iso);
  if (!day) return;
  const slots = slotsFor(day, saturdayDuty);
  const questions = tally(slots);
  let page = doc.addPage([PAGE_W, PAGE_H]);
  let y = header(page, bold, font, day.dateLabel, romanDay[day.weekday] ?? "", day.title, studyMinutes(slots), questions);

  const note = saturdayDuty && day.dutyNote ? day.dutyNote : day.note;
  if (note) {
    for (const line of wrap(note, font, 9, PAGE_W - MARGIN * 2)) {
      if (y < 64) {
        page = doc.addPage([PAGE_W, PAGE_H]);
        y = header(page, bold, font, day.dateLabel, romanDay[day.weekday] ?? "", `${day.title} (contd)`, studyMinutes(slots), questions);
      }
      page.drawText(line, { x: MARGIN, y, size: 9, font, color: MUTED });
      y -= 12;
    }
    y -= 6;
  }

  const lines = topicsOnDay(iso);
  if (lines.length > 0) {
    if (y < 80) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = header(page, bold, font, day.dateLabel, romanDay[day.weekday] ?? "", `${day.title} (contd)`, studyMinutes(slots), questions);
    }
    page.drawText("Official syllabus lines", { x: MARGIN, y, size: 11, font: bold, color: NAVY });
    y -= 14;
    for (const item of lines) {
      const row = pdfSafe(`${paperLabel(item.paper)} ${item.code} ${item.section}: ${item.text}`);
      for (const line of wrap(row, font, 9, PAGE_W - MARGIN * 2)) {
        if (y < 64) {
          page = doc.addPage([PAGE_W, PAGE_H]);
          y = header(page, bold, font, day.dateLabel, romanDay[day.weekday] ?? "", `${day.title} (contd)`, studyMinutes(slots), questions);
        }
        page.drawText(line, { x: MARGIN, y, size: 9, font, color: INK });
        y -= 12;
      }
    }
    y -= 8;
  }

  const formulas = sheetsForDay(iso);
  if (formulas.length > 0) {
    if (y < 80) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = header(page, bold, font, day.dateLabel, romanDay[day.weekday] ?? "", `${day.title} (contd)`, studyMinutes(slots), questions);
    }
    page.drawText("Formula sheet for this day", { x: MARGIN, y, size: 11, font: bold, color: NAVY });
    y -= 14;
    for (const sheet of formulas) {
      for (const item of sheet.formulas) {
        const row = pdfSafe(`${sheet.subject}: ${item.title} = ${item.expr}. ${item.note}`);
        for (const line of wrap(row, font, 9, PAGE_W - MARGIN * 2)) {
          if (y < 64) {
            page = doc.addPage([PAGE_W, PAGE_H]);
            y = header(page, bold, font, day.dateLabel, romanDay[day.weekday] ?? "", `${day.title} (contd)`, studyMinutes(slots), questions);
          }
          page.drawText(line, { x: MARGIN, y, size: 9, font, color: INK });
          y -= 12;
        }
      }
    }
    y -= 8;
  }

  for (const slot of slots) {
    const block = measureSlot(slot, font, bold);
    if (y - block < 48) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = header(page, bold, font, day.dateLabel, romanDay[day.weekday] ?? "", `${day.title} (contd)`, studyMinutes(slots), questions);
    }
    y = paintSlot(page, font, bold, slot, y);
  }
}

function header(
  page: PDFPage,
  bold: PDFFont,
  font: PDFFont,
  dateLabel: string,
  weekday: string,
  title: string,
  minutes: number,
  questions: { tech: number; reasoning: number; ga: number },
) {
  let y = PAGE_H - 42;
  page.drawRectangle({
    x: 0,
    y: PAGE_H - 28,
    width: PAGE_W,
    height: 28,
    color: rgb(0.94, 0.91, 0.86),
  });
  page.drawText("SSC JE CS  |  8-31 Oct 2026", {
    x: MARGIN,
    y: PAGE_H - 18,
    size: 9,
    font,
    color: MUTED,
  });
  y -= 8;
  page.drawText(`${dateLabel}  ${weekday}`, {
    x: MARGIN,
    y,
    size: 12,
    font: bold,
    color: NAVY,
  });
  y -= 20;
  page.drawText(pdfSafe(title), { x: MARGIN, y, size: 16, font: bold, color: INK });
  y -= 16;
  page.drawText(
    `Padhai ${asciiDuration(minutes)}   |   ${questions.tech} technical   ${questions.reasoning} reasoning   ${questions.ga} GA`,
    { x: MARGIN, y, size: 10, font, color: MUTED },
  );
  y -= 10;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_W - MARGIN, y },
    thickness: 0.8,
    color: RULE,
  });
  return y - 16;
}

function measureSlot(slot: Slot, font: PDFFont, bold: PDFFont) {
  const width = PAGE_W - MARGIN * 2;
  const titleLines = wrap(slot.title, bold, 11, width);
  const detailLines = wrap(slot.detail, font, 9, width);
  return 16 + titleLines.length * 14 + detailLines.length * 12 + 8;
}

function paintSlot(page: PDFPage, font: PDFFont, bold: PDFFont, slot: Slot, y: number) {
  const duration = asciiDuration(minutesBetween(slot.start, slot.end));
  page.drawText(`${slot.start}-${slot.end}`, {
    x: MARGIN,
    y,
    size: 10,
    font: bold,
    color: INK,
  });
  page.drawText(pdfSafe(duration), {
    x: MARGIN + 108,
    y,
    size: 10,
    font: bold,
    color: NAVY,
  });
  page.drawText(kindLabel[slot.kind].toUpperCase(), {
    x: MARGIN + 168,
    y,
    size: 9,
    font: bold,
    color: MUTED,
  });
  y -= 14;
  for (const line of wrap(slot.title, bold, 11, PAGE_W - MARGIN * 2)) {
    page.drawText(line, { x: MARGIN, y, size: 11, font: bold, color: INK });
    y -= 14;
  }
  for (const line of wrap(slot.detail, font, 9, PAGE_W - MARGIN * 2)) {
    page.drawText(line, { x: MARGIN, y, size: 9, font, color: MUTED });
    y -= 12;
  }
  const counts = [
    slot.tech ? `${slot.tech} technical MCQ` : "",
    slot.reasoning ? `${slot.reasoning} reasoning` : "",
    slot.ga ? `${slot.ga} GA` : "",
  ].filter(Boolean);
  if (counts.length) {
    page.drawText(counts.join("  |  "), {
      x: MARGIN,
      y,
      size: 9,
      font: bold,
      color: NAVY,
    });
    y -= 12;
  }
  return y - 8;
}

function drawFormulaAppendix(doc: PDFDocument, font: PDFFont, bold: PDFFont) {
  let page = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - 48;
  page.drawText("Formula sheet", { x: MARGIN, y, size: 16, font: bold, color: INK });
  y -= 16;
  page.drawText("Office lunch uses the day's sheet. Tick a line only when you can say it closed.", {
    x: MARGIN,
    y,
    size: 9,
    font,
    color: MUTED,
  });
  y -= 22;
  for (const sheet of formulaSheets) {
    if (y < 90) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - 48;
    }
    page.drawText(pdfSafe(sheet.subject), { x: MARGIN, y, size: 12, font: bold, color: NAVY });
    y -= 16;
    for (const item of sheet.formulas) {
      const row = pdfSafe(`${item.title}: ${item.expr}. ${item.note}`);
      for (const line of wrap(row, font, 9, PAGE_W - MARGIN * 2)) {
        if (y < 48) {
          page = doc.addPage([PAGE_W, PAGE_H]);
          y = PAGE_H - 48;
        }
        page.drawText(line, { x: MARGIN, y, size: 9, font, color: INK });
        y -= 12;
      }
      y -= 4;
    }
    y -= 8;
  }
}
