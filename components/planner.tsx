"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  BookOpen,
  Brain,
  Briefcase,
  Coffee,
  Globe2,
  NotebookPen,
  PenLine,
  Sigma,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type DayPlan,
  type Kind,
  type Slot,
  PLAN_END,
  PLAN_START,
  clampIso,
  dayByIso,
  dayNumber,
  days,
  formatDuration,
  isoFromDate,
  kindLabel,
  requiredSlots,
  rules,
  slotsFor,
  studyMinutes,
  tally,
  weeks,
} from "@/lib/plan";
import { officialTopics, paperLabel, topicsOnDay } from "@/lib/official-syllabus";
import { allFormulas } from "@/lib/formulas";
import { SyllabusBoard } from "@/components/syllabus-board";
import { DayFormulas, FormulaBoard } from "@/components/formula-board";
import { DaySheets, SheetLibrary, slotSheets } from "@/components/study-library";
import { studySheets, type StudySheet } from "@/lib/study-sheets";

const STORAGE_KEY = "sscje-cs-plan-v1";
const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Persisted = {
  checks: Record<string, boolean>;
  saturdayDuty: boolean;
  topics: Record<string, boolean>;
  formulas: Record<string, boolean>;
  sheets: Record<string, boolean>;
};

const emptyProgress: Persisted = {
  checks: {},
  saturdayDuty: false,
  topics: {},
  formulas: {},
  sheets: {},
};
let progress = emptyProgress;
const progressListeners = new Set<() => void>();
let progressLoaded = false;

function ensureProgress() {
  if (progressLoaded || typeof window === "undefined") return;
  progressLoaded = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    progress = {
      checks: parsed.checks ?? {},
      saturdayDuty: Boolean(parsed.saturdayDuty),
      topics: parsed.topics ?? {},
      formulas: parsed.formulas ?? {},
      sheets: parsed.sheets ?? {},
    };
  } catch {
    progress = emptyProgress;
  }
}

function subscribeProgress(listener: () => void) {
  ensureProgress();
  progressListeners.add(listener);
  return () => progressListeners.delete(listener);
}

function progressSnapshot() {
  ensureProgress();
  return progress;
}

function writeProgress(next: Persisted) {
  progress = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  progressListeners.forEach((listener) => listener());
}

let clock: Date | null = null;
const clockListeners = new Set<() => void>();

function subscribeClock(listener: () => void) {
  if (clock === null) clock = new Date();
  clockListeners.add(listener);
  const id = window.setInterval(() => {
    clock = new Date();
    clockListeners.forEach((item) => item());
  }, 30000);
  return () => {
    clockListeners.delete(listener);
    window.clearInterval(id);
  };
}

function clockSnapshot() {
  if (clock === null) clock = new Date();
  return clock;
}

const shortDay: Record<string, string> = {
  रविवार: "रवि",
  सोमवार: "सोम",
  मंगलवार: "मंगल",
  बुधवार: "बुध",
  गुरुवार: "गुरु",
  शुक्रवार: "शुक्र",
  शनिवार: "शनि",
};

const kindClass: Record<Kind, string> = {
  theory: "border-l-[#1e3a5f]",
  practice: "border-l-[#1f6b4a]",
  reasoning: "border-l-[#3d4a86]",
  ga: "border-l-[#8a5a12]",
  mock: "border-l-[#9f1239]",
  review: "border-l-[#57534e]",
  desk: "border-l-[#b45309]",
  job: "border-l-[#a8a29e]",
  buffer: "border-l-transparent",
};

function KindIcon({ kind }: { kind: Kind }) {
  const className = "size-3.5";
  if (kind === "theory") return <BookOpen className={className} />;
  if (kind === "practice") return <PenLine className={className} />;
  if (kind === "reasoning") return <Brain className={className} />;
  if (kind === "ga") return <Globe2 className={className} />;
  if (kind === "mock") return <Timer className={className} />;
  if (kind === "review") return <NotebookPen className={className} />;
  if (kind === "desk") return <Sigma className={className} />;
  if (kind === "job") return <Briefcase className={className} />;
  return <Coffee className={className} />;
}

function toMinutes(value: string) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

function slotMinutes(slot: Slot) {
  return toMinutes(slot.end) - toMinutes(slot.start);
}

type LockReason = "future-day" | "not-yet";

function lockFor(dayIso: string, slot: Slot, now: Date | null): LockReason | null {
  if (!now) return null;
  const today = isoFromDate(now);
  if (dayIso > today) return "future-day";
  if (dayIso < today) return null;
  const nowMins = now.getHours() * 60 + now.getMinutes();
  if (toMinutes(slot.start) > nowMins) return "not-yet";
  return null;
}

function isMissed(
  dayIso: string,
  slot: Slot,
  now: Date | null,
  checked: boolean,
) {
  if (!now || checked || slot.optional) return false;
  if (slot.kind === "job" || slot.kind === "buffer") return false;
  const today = isoFromDate(now);
  if (dayIso > today) return false;
  if (dayIso < today) return true;
  return now.getHours() * 60 + now.getMinutes() >= toMinutes(slot.end);
}

function countsLabel(slot: Slot) {
  const parts = [
    slot.tech ? `${slot.tech} technical` : "",
    slot.reasoning ? `${slot.reasoning} reasoning` : "",
    slot.ga ? `${slot.ga} GA` : "",
  ].filter(Boolean);
  return parts.join(" · ");
}

export function Planner() {
  const saved = useSyncExternalStore(
    subscribeProgress,
    progressSnapshot,
    () => emptyProgress,
  );
  const now = useSyncExternalStore(subscribeClock, clockSnapshot, () => null);
  const checks = saved.checks;
  const saturdayDuty = saved.saturdayDuty;
  const topicsDone = saved.topics;
  const formulasDone = saved.formulas;
  const sheetsRead = saved.sheets;
  const syllabusDone = officialTopics.filter((item) => topicsDone[item.id]).length;
  const formulaList = allFormulas();
  const formulaDone = formulaList.filter((item) => formulasDone[item.id]).length;
  const sheetDone = studySheets.filter((item) => sheetsRead[item.id]).length;
  const [picked, setPicked] = useState<string | null>(null);
  const [tab, setTab] = useState("today");
  const [lockNote, setLockNote] = useState<string | null>(null);
  const scrolled = useRef(false);

  const actualIso = now ? isoFromDate(now) : null;
  const inPlan =
    actualIso !== null && actualIso >= PLAN_START && actualIso <= PLAN_END;
  const todayIso = actualIso ? clampIso(actualIso) : PLAN_START;
  const selected = picked ?? todayIso;
  const ready = now !== null;

  function setCheck(id: string, value: boolean) {
    writeProgress({
      ...progressSnapshot(),
      checks: { ...progressSnapshot().checks, [id]: value },
    });
  }

  function setSaturdayDuty(value: boolean) {
    writeProgress({ ...progressSnapshot(), saturdayDuty: value });
  }

  function setTopic(id: string, value: boolean) {
    const current = progressSnapshot();
    writeProgress({
      ...current,
      topics: { ...current.topics, [id]: value },
    });
  }

  function setFormula(id: string, value: boolean) {
    const current = progressSnapshot();
    writeProgress({
      ...current,
      formulas: { ...current.formulas, [id]: value },
    });
  }

  function setSheet(id: string, value: boolean) {
    const current = progressSnapshot();
    writeProgress({
      ...current,
      sheets: { ...current.sheets, [id]: value },
    });
  }

  const visibleDays = useMemo(
    () =>
      days.map((day) => ({
        day,
        slots: slotsFor(day, saturdayDuty),
      })),
    [saturdayDuty],
  );

  const planned = useMemo(() => {
    const slots = visibleDays.flatMap((item) => item.slots);
    return {
      questions: tally(slots),
      minutes: visibleDays.reduce((sum, item) => sum + studyMinutes(item.slots), 0),
      required: visibleDays.flatMap((item) => requiredSlots(item.slots)),
    };
  }, [visibleDays]);

  const doneQuestions = useMemo(() => {
    const slots = visibleDays
      .flatMap((item) => item.slots)
      .filter((slot) => checks[slot.id]);
    return tally(slots);
  }, [checks, visibleDays]);

  const requiredDone = planned.required.filter((slot) => checks[slot.id]).length;
  const daysDone = visibleDays.filter((item) => {
    const required = requiredSlots(item.slots);
    return required.length > 0 && required.every((slot) => checks[slot.id]);
  }).length;

  const selectedDay = dayByIso(selected);
  const selectedSlots = slotsFor(selectedDay, saturdayDuty);
  const selectedRequired = requiredSlots(selectedSlots);
  const selectedDone = selectedRequired.filter((slot) => checks[slot.id]).length;
  const selectedIndex = days.findIndex((day) => day.iso === selected);

  function openDay(iso: string) {
    setPicked(iso);
    setTab("today");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const yesterday = selectedIndex > 0 ? days[selectedIndex - 1] : null;
  const yesterdayOpen =
    yesterday &&
    ready &&
    selected === todayIso &&
    requiredSlots(slotsFor(yesterday, saturdayDuty)).some((slot) => !checks[slot.id]);

  const questionTotal =
    planned.questions.tech + planned.questions.reasoning + planned.questions.ga;
  const questionDone =
    doneQuestions.tech + doneQuestions.reasoning + doneQuestions.ga;
  const slotPct = planned.required.length
    ? Math.round((requiredDone / planned.required.length) * 100)
    : 0;

  const missed = visibleDays.flatMap(({ day, slots }) =>
    requiredSlots(slots).filter((slot) =>
      isMissed(day.iso, slot, now, Boolean(checks[slot.id])),
    ),
  );
  const pdfHref = `${publicBase}${
    saturdayDuty
      ? "/ssc-je-cs-8-31-oct-saturday-duty.pdf"
      : "/ssc-je-cs-8-31-oct.pdf"
  }`;
  const todaySlots = slotsFor(dayByIso(todayIso), saturdayDuty);
  const nowMins = now ? now.getHours() * 60 + now.getMinutes() : null;
  const liveSlot =
    nowMins === null
      ? null
      : (todaySlots.find(
          (slot) =>
            toMinutes(slot.start) <= nowMins && nowMins < toMinutes(slot.end),
        ) ?? null);
  const nextStudy =
    nowMins === null
      ? null
      : (todaySlots.find(
          (slot) =>
            slot.kind !== "job" &&
            slot.kind !== "buffer" &&
            toMinutes(slot.start) > nowMins,
        ) ?? null);
  const focus =
    liveSlot && liveSlot.kind !== "job" && liveSlot.kind !== "buffer"
      ? liveSlot
      : nextStudy;

  useEffect(() => {
    if (!ready || scrolled.current) return;
    scrolled.current = true;
    document.querySelector("[data-live='true']")?.scrollIntoView({
      block: "center",
    });
  }, [ready]);

  function deny(message: string) {
    setLockNote(message);
    window.setTimeout(() => {
      setLockNote((current) => (current === message ? null : current));
    }, 2800);
  }

  function tryCheck(dayIso: string, slot: Slot, value: boolean) {
    const reason = lockFor(dayIso, slot, now);
    if (reason === "future-day") {
      deny("Aage ka din lock hai. Uska time aane do.");
      return;
    }
    if (reason === "not-yet") {
      deny(`${slot.start} se pehle yeh slot lock hai.`);
      return;
    }
    setCheck(slot.id, value);
  }

  return (
    <div className="min-h-full pb-44">
      <header className="border-b border-border/80">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                SSC JE 2026 · Part-D · Computer Science & IT
              </p>
              <h1 className="font-heading mt-2 text-3xl leading-tight font-semibold sm:text-4xl">
                8 से 31 अक्टूबर
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                24 din mein poora syllabus, practice, aur formula sheet. Office{" "}
                <span className="text-foreground">10:00–19:00</span> kaam hai, beech
                mein teen zaroori slot: lunch par formula, chai par yaad, nikalte
                hue paanch line. Baaki padhai subah 6:00 aur raat 8:00.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto">
              <a
                className={cn(buttonVariants({ size: "lg" }), "h-10 justify-center px-4")}
                href={pdfHref}
              >
                PDF download
              </a>
              <div className="no-print flex items-center gap-3 rounded-xl bg-card px-3 py-2 ring-1 ring-foreground/10">
                <Switch
                  checked={saturdayDuty}
                  onCheckedChange={setSaturdayDuty}
                  id="saturday-duty"
                />
                <label htmlFor="saturday-duty" className="text-sm leading-5">
                  Shanivar ko bhi duty hai
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat
              label="Din poore"
              value={`${daysDone}/24`}
              hint={inPlan ? "Aaj se 31 Oct tak" : "Plan ki dates 8–31 Oct hain"}
            />
            <Stat
              label="Zaroori slots"
              value={`${requiredDone}/${planned.required.length}`}
              hint={`${slotPct}% check ho chuka`}
            />
            <Stat
              label="MCQ plan"
              value={`${questionDone}/${questionTotal}`}
              hint={`${formatDuration(planned.minutes)} padhai, office alag`}
            />
            <Stat
              label="Missed"
              value={String(missed.length)}
              hint={missed.length ? "Time nikal gaya, tick baaki" : "Koi slot nahi chhuta"}
            />
          </div>
          <Progress value={slotPct} className="no-print">
            <ProgressLabel>
              Slots {slotPct}% · sheets {sheetDone}/{studySheets.length} · syllabus {syllabusDone}/{officialTopics.length} · formula {formulaDone}/{formulaList.length}
            </ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <Tabs value={tab} onValueChange={(value) => setTab(String(value))}>
          <TabsList className="no-print h-auto w-full flex-wrap justify-start gap-1 bg-card p-1 sm:w-fit">
            <TabsTrigger className="h-8 flex-none px-3" value="today">
              Aaj
            </TabsTrigger>
            <TabsTrigger className="h-8 flex-none px-3" value="week">
              Hafta
            </TabsTrigger>
            <TabsTrigger className="h-8 flex-none px-3" value="all">
              24 din
            </TabsTrigger>
            <TabsTrigger className="h-8 flex-none px-3" value="syllabus">
              Syllabus
            </TabsTrigger>
            <TabsTrigger className="h-8 flex-none px-3" value="formula">
              Formula
            </TabsTrigger>
            <TabsTrigger className="h-8 flex-none px-3" value="sheets">
              Sheets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-5 flex flex-col gap-5">
            <div className="no-print sticky top-0 z-20 -mx-4 flex gap-2 overflow-x-auto bg-background/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6">
              {days.map((day) => {
                const daySlots = slotsFor(day, saturdayDuty);
                const required = requiredSlots(daySlots);
                const complete =
                  required.length > 0 && required.every((slot) => checks[slot.id]);
                const dayMissed = required.some((slot) =>
                  isMissed(day.iso, slot, now, Boolean(checks[slot.id])),
                );
                const future = ready && day.iso > todayIso;
                const active = day.iso === selected;
                return (
                  <button
                    key={day.iso}
                    type="button"
                    onClick={() => setPicked(day.iso)}
                    className={`relative flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-lg border text-sm ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card"
                    } ${future ? "opacity-60" : ""}`}
                  >
                    <span className="text-base leading-none font-semibold">
                      {day.dateLabel.split(" ")[0]}
                    </span>
                    <span className="mt-1 text-[10px] opacity-80">
                      {shortDay[day.weekday]}
                    </span>
                    {complete ? (
                      <span
                        className={`absolute top-1 right-1 size-1.5 rounded-full ${
                          active ? "bg-primary-foreground" : "bg-[#1f6b4a]"
                        }`}
                      />
                    ) : null}
                    {dayMissed ? (
                      <span className="absolute top-1 left-1 size-1.5 rounded-full bg-[#9f1239]" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <DayHeader
              day={selectedDay}
              saturdayDuty={saturdayDuty}
              done={selectedDone}
              total={selectedRequired.length}
              isToday={ready && selected === todayIso}
              onPrev={() =>
                selectedIndex > 0 && setPicked(days[selectedIndex - 1].iso)
              }
              onNext={() =>
                selectedIndex < days.length - 1 &&
                setPicked(days[selectedIndex + 1].iso)
              }
              disablePrev={selectedIndex <= 0}
              disableNext={selectedIndex >= days.length - 1}
            />

            {ready && selected > todayIso ? (
              <p className="rounded-lg bg-muted px-3 py-2 text-sm leading-6">
                Yeh din lock hai. Slot ka checkbox uske start time par khulega.
              </p>
            ) : null}

            {lockNote ? (
              <p className="rounded-lg bg-accent px-3 py-2 text-sm leading-6 text-accent-foreground">
                {lockNote}
              </p>
            ) : null}

            {yesterdayOpen ? (
              <p className="rounded-lg bg-accent px-3 py-2 text-sm leading-6 text-accent-foreground">
                Kal ka plan adhura hai. Aaj ki technical practice poori rakho.
                Samay kam pade to pehle GA chhodo, phir reasoning.
              </p>
            ) : null}

            {(saturdayDuty && selectedDay.dutyNote) || selectedDay.note ? (
              <p className="rounded-lg bg-accent px-3 py-2 text-sm leading-6 text-accent-foreground">
                {saturdayDuty && selectedDay.dutyNote
                  ? selectedDay.dutyNote
                  : selectedDay.note}
              </p>
            ) : null}

            <DaySyllabus
              iso={selectedDay.iso}
              done={topicsDone}
              onToggle={setTopic}
            />

            <DayFormulas
              iso={selectedDay.iso}
              done={formulasDone}
              onToggle={setFormula}
              onOpenSheet={() => setTab("formula")}
            />

            <DaySheets
              iso={selectedDay.iso}
              saturdayDuty={saturdayDuty}
              read={sheetsRead}
              onToggle={setSheet}
              highlightId={
                selected === todayIso && focus
                  ? slotSheets(selectedDay.iso, focus.start, saturdayDuty)[0]?.id
                  : null
              }
            />

            <ol className="flex flex-col gap-3">
              {selectedSlots.map((slot) => (
                <TimelineRow
                  key={slot.id}
                  slot={slot}
                  sheets={slotSheets(selectedDay.iso, slot.start, saturdayDuty)}
                  checked={Boolean(checks[slot.id])}
                  locked={lockFor(selectedDay.iso, slot, now)}
                  missed={isMissed(
                    selectedDay.iso,
                    slot,
                    now,
                    Boolean(checks[slot.id]),
                  )}
                  onCheckedChange={(value) =>
                    tryCheck(selectedDay.iso, slot, value)
                  }
                  onOpenSheet={(id) => {
                    document.getElementById(`sheet-${id}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  live={liveSlot?.id === slot.id && selected === todayIso}
                />
              ))}
            </ol>

            <div className="no-print flex flex-wrap gap-2">
              <a className={buttonVariants({ variant: "outline" })} href={pdfHref}>
                Is plan ki PDF
              </a>
              <Button variant="outline" onClick={() => window.print()}>
                Is din ko print karo
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  if (window.confirm("Is device ka progress mita dun?")) {
                    writeProgress({
                      checks: {},
                      saturdayDuty,
                      topics: {},
                      formulas: {},
                      sheets: {},
                    });
                  }
                }}
              >
                Progress reset
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="week" className="mt-5 grid gap-4">
            {weeks.map((week) => {
              const weekDays = visibleDays.filter((item) => item.day.week === week.id);
              const minutes = weekDays.reduce(
                (sum, item) => sum + studyMinutes(item.slots),
                0,
              );
              const questions = tally(weekDays.flatMap((item) => item.slots));
              const required = weekDays.flatMap((item) => requiredSlots(item.slots));
              const done = required.filter((slot) => checks[slot.id]).length;
              return (
                <Card key={week.id}>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="text-xs tracking-wide text-muted-foreground uppercase">
                          Hafta {week.id} · {week.kicker}
                        </p>
                        <h2 className="font-heading text-2xl font-semibold">
                          {week.title}
                        </h2>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDuration(minutes)} ·{" "}
                        {questions.tech + questions.reasoning + questions.ga} MCQ ·{" "}
                        {done}/{required.length} slots
                      </p>
                    </div>
                    <p className="text-sm leading-6">{week.goal}</p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {week.test}
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {weekDays.map(({ day, slots }) => {
                        const req = requiredSlots(slots);
                        const finished = req.filter((slot) => checks[slot.id]).length;
                        return (
                          <li key={day.iso}>
                            <button
                              type="button"
                              onClick={() => openDay(day.iso)}
                              className="flex w-full items-center justify-between gap-3 rounded-lg bg-muted/60 px-3 py-2 text-left"
                            >
                              <span>
                                <span className="block text-sm font-medium">
                                  {day.dateLabel} · {shortDay[day.weekday]}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                  {day.title}
                                </span>
                              </span>
                              <span className="text-xs text-muted-foreground tabular-nums">
                                {finished}/{req.length}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
            <Card>
              <CardContent className="flex flex-col gap-2 text-sm leading-6">
                <h2 className="font-heading text-xl font-semibold">Roz ka ghadi</h2>
                <p>
                  Office wale din: 6:00–7:20 theory, 7:35–8:50 practice. Duty ke
                  beech 13:00 formula sheet, 16:30 band karke yaad, 18:50 paanch
                  line. Raat 8:00–8:25 GA, 8:25–9:40 technical, 9:50–10:35
                  reasoning, 10:35–10:50 error log. Kul padhai{" "}
                  {formatDuration(357)}.
                </p>
                <p>
                  Shanivar chhutti: lagbhag 7–8 ghante, beech mein 12:00 se 2:30
                  aaram. Raviwar: subah topic, dopehar ko timed test, shaam ko
                  analysis. Duty wala shanivar office wale ghadi par simat jaata
                  hai.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="mt-5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] border-separate border-spacing-y-2 text-left text-sm">
                <thead className="text-xs tracking-wide text-muted-foreground uppercase">
                  <tr>
                    <th className="px-2 font-medium">Din</th>
                    <th className="px-2 font-medium">Topic</th>
                    <th className="px-2 font-medium">Padhai</th>
                    <th className="px-2 font-medium">MCQ</th>
                    <th className="px-2 font-medium">Ho gaya</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleDays.map(({ day, slots }) => {
                    const req = requiredSlots(slots);
                    const finished = req.filter((slot) => checks[slot.id]).length;
                    const q = tally(slots);
                    return (
                      <tr key={day.iso} className="bg-card">
                        <td className="rounded-l-lg px-2 py-3 align-top">
                          <button
                            type="button"
                            className="text-left font-medium"
                            onClick={() => openDay(day.iso)}
                          >
                            {day.dateLabel}
                            <span className="block text-xs font-normal text-muted-foreground">
                              {day.weekday}
                            </span>
                          </button>
                        </td>
                        <td className="px-2 py-3 align-top">
                          {day.title}
                          {day.numerical ? (
                            <span className="mt-1 block text-xs text-muted-foreground">
                              Numerical din
                            </span>
                          ) : null}
                        </td>
                        <td className="px-2 py-3 align-top tabular-nums">
                          {formatDuration(studyMinutes(slots))}
                        </td>
                        <td className="px-2 py-3 align-top tabular-nums">
                          {q.tech + q.reasoning + q.ga}
                        </td>
                        <td className="rounded-r-lg px-2 py-3 align-top tabular-nums">
                          {finished}/{req.length}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="syllabus" className="mt-5 flex flex-col gap-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Card>
                <CardContent className="flex flex-col gap-2 text-sm leading-6">
                  <h2 className="font-heading text-xl font-semibold">Paper-I</h2>
                  <p>2 ghante · 200 marks · har galat par −0.25</p>
                  <p>Reasoning 50 · GA 50 · CS & IT 100</p>
                  <p className="text-muted-foreground">
                    Qualifying hai. Isi se Paper-II ki shortlist banti hai.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-2 text-sm leading-6">
                  <h2 className="font-heading text-xl font-semibold">Paper-II</h2>
                  <p>2 ghante · 100 sawal · 300 marks · har galat par −1</p>
                  <p>Sirf Part-D, Computer Science & IT</p>
                  <p className="text-muted-foreground">
                    Final merit normalized Paper-II se banta hai. Andaza yahan
                    mehnga padta hai.
                  </p>
                </CardContent>
              </Card>
            </div>
            <SyllabusBoard
              done={topicsDone}
              onToggle={setTopic}
              onOpenDay={openDay}
            />
            <div className="grid gap-3">
              {rules.map((rule) => (
                <Card key={rule.title}>
                  <CardContent className="flex flex-col gap-1">
                    <h2 className="font-medium">{rule.title}</h2>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {rule.detail}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="formula" className="mt-5">
            <FormulaBoard done={formulasDone} onToggle={setFormula} />
          </TabsContent>

          <TabsContent value="sheets" className="mt-5">
            <SheetLibrary
              saturdayDuty={saturdayDuty}
              todayIso={todayIso}
              read={sheetsRead}
              onToggle={setSheet}
              onOpenDay={openDay}
            />
          </TabsContent>
        </Tabs>
      </main>
      <StrictDock
        liveSlot={liveSlot}
        focus={focus}
        focusChecked={focus ? Boolean(checks[focus.id]) : false}
        focusLocked={focus ? lockFor(todayIso, focus, now) : null}
        missed={missed.length}
        pdfHref={pdfHref}
        onDone={() => {
          if (focus) tryCheck(todayIso, focus, true);
        }}
        onMissed={() => {
          const first = visibleDays.find(({ day, slots }) =>
            requiredSlots(slots).some((slot) =>
              isMissed(day.iso, slot, now, Boolean(checks[slot.id])),
            ),
          );
          if (first) openDay(first.day.iso);
        }}
      />
    </div>
  );
}

function DaySyllabus({
  iso,
  done,
  onToggle,
}: {
  iso: string;
  done: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
}) {
  const items = topicsOnDay(iso);
  if (items.length === 0) return null;
  const finished = items.filter((item) => done[item.id]).length;
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold">Is din ki syllabus lines</h3>
          <span className="text-xs tabular-nums text-muted-foreground">
            {finished}/{items.length}
          </span>
        </div>
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3 py-1.5">
              <Checkbox
                checked={Boolean(done[item.id])}
                onCheckedChange={(value) => onToggle(item.id, Boolean(value))}
                aria-label={item.text}
                className="mt-0.5 size-5"
              />
              <div>
                <p className="text-sm leading-6">{item.text}</p>
                <p className="text-xs text-muted-foreground">
                  {paperLabel(item.paper)} · {item.code} · {item.section}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card size="sm">
      <CardContent className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="font-heading text-2xl font-semibold tabular-nums">
          {value}
        </span>
        <span className="text-xs text-muted-foreground">{hint}</span>
      </CardContent>
    </Card>
  );
}

function DayHeader({
  day,
  saturdayDuty,
  done,
  total,
  isToday,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: {
  day: DayPlan;
  saturdayDuty: boolean;
  done: number;
  total: number;
  isToday: boolean;
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}) {
  const slots = slotsFor(day, saturdayDuty);
  const questions = tally(slots);
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Din {dayNumber(day.iso)} / 24 · Hafta {day.week}
          {isToday ? " · aaj" : ""}
        </p>
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
          {day.weekday}, {day.dateLabel}
        </h2>
        <p className="mt-1 text-sm">{day.title}</p>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          {day.outcome} Is din {formatDuration(studyMinutes(slots))} padhai,{" "}
          {questions.tech} technical, {questions.reasoning} reasoning, {questions.ga}{" "}
          GA.
        </p>
      </div>
      <div className="no-print flex items-center gap-2">
        <Badge variant="outline">
          {done}/{total} slots
        </Badge>
        {day.numerical ? <Badge variant="secondary">Numerical</Badge> : null}
        <Button variant="outline" size="sm" disabled={disablePrev} onClick={onPrev}>
          Pichhla
        </Button>
        <Button variant="outline" size="sm" disabled={disableNext} onClick={onNext}>
          Agla
        </Button>
      </div>
    </div>
  );
}

function TimelineRow({
  slot,
  sheets,
  checked,
  locked,
  missed,
  onCheckedChange,
  onOpenSheet,
  live,
}: {
  slot: Slot;
  sheets: StudySheet[];
  checked: boolean;
  locked: LockReason | null;
  missed: boolean;
  onCheckedChange: (value: boolean) => void;
  onOpenSheet: (id: string) => void;
  live: boolean;
}) {
  const quiet = slot.kind === "buffer" || slot.kind === "job";
  const label = countsLabel(slot);
  const duration = formatDuration(slotMinutes(slot));

  if (quiet) {
    return (
      <li
        data-live={live ? "true" : undefined}
        className={`rounded-lg px-3 py-3 text-sm ${
          slot.kind === "job" ? "bg-muted" : "text-muted-foreground"
        } ${live ? "ring-2 ring-primary/50" : ""}`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-medium text-foreground">
            <span className="mr-2 font-normal text-muted-foreground tabular-nums">
              {slot.start}–{slot.end}
            </span>
            <span className="mr-2 text-xs text-muted-foreground">{duration}</span>
            {slot.title}
          </p>
          {live ? <Badge>Abhi</Badge> : null}
        </div>
        <p className="mt-1 leading-6">{slot.detail}</p>
        <SheetLinks sheets={sheets} onOpenSheet={onOpenSheet} />
      </li>
    );
  }

  return (
    <li data-live={live ? "true" : undefined}>
      <Card
        className={`border-l-4 py-0 ${missed ? "border-l-[#9f1239]" : kindClass[slot.kind]} ${
          checked ? "opacity-70" : ""
        } ${live ? "ring-2 ring-primary/40" : ""}`}
      >
        <CardContent className="py-3">
          <div className="flex gap-3">
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => onCheckedChange(value)}
              aria-label={slot.title}
              className="mt-1 size-6"
            />
            <div
              className="min-w-0 flex-1 cursor-pointer"
              onClick={() => onCheckedChange(!checked)}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground tabular-nums">
                  {slot.start}–{slot.end}
                </span>
                <span className="text-xs font-medium text-foreground">{duration}</span>
                <Badge variant="outline" className="gap-1">
                  <KindIcon kind={slot.kind} />
                  {kindLabel[slot.kind]}
                </Badge>
                {slot.optional ? <Badge variant="secondary">Optional</Badge> : null}
                {locked ? <Badge variant="secondary">Lock</Badge> : null}
                {missed ? <Badge variant="destructive">Missed</Badge> : null}
                {live ? <Badge>Abhi</Badge> : null}
              </div>
              <p className="mt-1 text-base font-medium">{slot.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {slot.detail}
              </p>
              {label ? (
                <p className="mt-2 text-xs font-medium">{label}</p>
              ) : null}
              <SheetLinks sheets={sheets} onOpenSheet={onOpenSheet} />
            </div>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}

function SheetLinks({
  sheets,
  onOpenSheet,
}: {
  sheets: StudySheet[];
  onOpenSheet: (id: string) => void;
}) {
  if (sheets.length === 0) return null;
  return (
    <div className="mt-2 flex flex-col gap-1">
      {sheets.map((item) => (
        <button
          key={item.id}
          type="button"
          className="w-fit text-left text-sm font-medium underline"
          onClick={(event) => {
            event.stopPropagation();
            onOpenSheet(item.id);
          }}
        >
          Sheet kholo: {item.title}
        </button>
      ))}
    </div>
  );
}

function StrictDock({
  liveSlot,
  focus,
  focusChecked,
  focusLocked,
  missed,
  pdfHref,
  onDone,
  onMissed,
}: {
  liveSlot: Slot | null;
  focus: Slot | null;
  focusChecked: boolean;
  focusLocked: LockReason | null;
  missed: number;
  pdfHref: string;
  onDone: () => void;
  onMissed: () => void;
}) {
  const office = liveSlot?.kind === "job";
  const label = office
    ? focus
      ? `Office chal raha hai. Agla zaroori kaam ${focus.start} par.`
      : "Office ka aakhri hissa. Raat 8:00 desk."
    : focus
      ? focusChecked
        ? "Yeh slot ho chuka."
        : focusLocked
          ? `Agli padhai ${focus.start} par khulegi.`
          : "Abhi yeh slot."
      : "Aaj ke study slots khatam.";
  const title = focus?.title ?? liveSlot?.title ?? "Aaj ka plan";
  const time = focus
    ? `${focus.start}–${focus.end} · ${formatDuration(slotMinutes(focus))}`
    : liveSlot
      ? `${liveSlot.start}–${liveSlot.end}`
      : "";

  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3 text-xs">
          <button type="button" className="font-medium text-[#9f1239]" onClick={onMissed}>
            Missed {missed}
          </button>
          <a className="font-medium underline" href={pdfHref}>
            PDF
          </a>
        </div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-xs tabular-nums text-muted-foreground">{time}</p>
        <Button
          className="h-11"
          disabled={!focus || focusChecked || Boolean(focusLocked)}
          onClick={onDone}
        >
          {focusChecked ? "Ho chuka" : focusLocked ? `${focus?.start} tak lock` : "Yeh slot ho gaya"}
        </Button>
      </div>
    </div>
  );
}
