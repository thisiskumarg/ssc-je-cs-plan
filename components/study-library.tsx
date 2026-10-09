"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { days } from "@/lib/plan";
import {
  sheetModeLabel,
  sheetsForSlot,
  sheetsOnDay,
  studySheets,
  type StudySheet,
} from "@/lib/study-sheets";

export function SheetBody({ sheet }: { sheet: StudySheet }) {
  return (
    <div className="flex flex-col gap-4">
      {sheet.blocks.map((block) => (
        <section key={block.h}>
          <h4 className="text-sm font-medium">{block.h}</h4>
          <ul className="mt-1 flex flex-col gap-1.5">
            {block.lines.map((line) => (
              <li key={line} className="text-sm leading-6">
                {line}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function DaySheets({
  iso,
  saturdayDuty,
  read,
  onToggle,
  highlightId,
}: {
  iso: string;
  saturdayDuty: boolean;
  read: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
  highlightId?: string | null;
}) {
  const rows = sheetsOnDay(iso, saturdayDuty);
  if (rows.length === 0) return null;
  const done = rows.filter((row) => read[row.sheet.id]).length;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-heading text-lg font-semibold">Is din ki sheets</h3>
        <span className="text-xs tabular-nums text-muted-foreground">
          {done}/{rows.length} padh li
        </span>
      </div>
      {rows.map(({ sheet, times }) => (
        <SheetCard
          key={sheet.id}
          sheet={sheet}
          times={times}
          read={Boolean(read[sheet.id])}
          onToggle={onToggle}
          highlight={highlightId === sheet.id}
        />
      ))}
    </div>
  );
}

export function SheetCard({
  sheet,
  times,
  read,
  onToggle,
  highlight,
}: {
  sheet: StudySheet;
  times: string[];
  read: boolean;
  onToggle: (id: string, value: boolean) => void;
  highlight?: boolean;
}) {
  return (
    <Card
      id={`sheet-${sheet.id}`}
      className={`scroll-mt-24 ${highlight ? "ring-2 ring-primary/50" : ""}`}
    >
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={read}
            onCheckedChange={(value) => onToggle(sheet.id, Boolean(value))}
            aria-label={`${sheet.title} padh li`}
            className="mt-1 size-5"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{sheetModeLabel[sheet.mode]}</Badge>
              <span className="text-xs tabular-nums text-muted-foreground">
                {times.join(" · ")}
              </span>
            </div>
            <h3 className="mt-1 text-base font-medium">{sheet.title}</h3>
          </div>
        </div>
        <SheetBody sheet={sheet} />
      </CardContent>
    </Card>
  );
}

export function SheetLibrary({
  saturdayDuty,
  todayIso,
  read,
  onToggle,
  onOpenDay,
}: {
  saturdayDuty: boolean;
  todayIso: string;
  read: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
  onOpenDay: (iso: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "today" | "ahead" | "left">("all");
  const needle = query.trim().toLowerCase();
  const groups = useMemo(() => {
    return days
      .map((day) => {
        const rows = sheetsOnDay(day.iso, saturdayDuty).filter(({ sheet }) => {
          if (filter === "today" && day.iso !== todayIso) return false;
          if (filter === "ahead" && day.iso <= todayIso) return false;
          if (filter === "left" && read[sheet.id]) return false;
          if (!needle) return true;
          const blob = `${sheet.title} ${sheet.blocks.map((block) => `${block.h} ${block.lines.join(" ")}`).join(" ")}`;
          return blob.toLowerCase().includes(needle);
        });
        return { day, rows };
      })
      .filter((group) => group.rows.length > 0);
  }, [filter, needle, read, saturdayDuty, todayIso]);
  const readCount = studySheets.filter((item) => read[item.id]).length;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-heading text-xl font-semibold">Saari sheets</h2>
            <span className="text-sm tabular-nums text-muted-foreground">
              {readCount}/{studySheets.length} padh li
            </span>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Har sheet us ghadi par khulti hai jab slot start hota hai. Aage ke din
            ki sheets yahin hain, padh sakte ho. Tick ka matlab hai sheet band karke
            yaad aa gayi.
          </p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search: subnet, Bayes, deadlock..."
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="Search sheets"
          />
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["all", "Sab"],
                ["today", "Aaj"],
                ["ahead", "Aage"],
                ["left", "Baaki"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                size="sm"
                variant={filter === value ? "default" : "outline"}
                onClick={() => setFilter(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      {groups.length === 0 ? (
        <p className="rounded-lg bg-muted px-3 py-2 text-sm">Is filter par koi sheet nahi.</p>
      ) : (
        groups.map(({ day, rows }) => (
          <section key={day.iso} className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-medium">
                {day.dateLabel} · {day.title}
              </h3>
              <Button variant="outline" size="sm" onClick={() => onOpenDay(day.iso)}>
                Din kholo
              </Button>
            </div>
            {rows.map(({ sheet, times }) => (
              <SheetCard
                key={sheet.id}
                sheet={sheet}
                times={times}
                read={Boolean(read[sheet.id])}
                onToggle={onToggle}
              />
            ))}
          </section>
        ))
      )}
    </div>
  );
}

export function slotSheets(iso: string, start: string, saturdayDuty: boolean) {
  return sheetsForSlot(iso, start, saturdayDuty);
}
