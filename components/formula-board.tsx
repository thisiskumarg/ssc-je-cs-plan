"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  formulaSheets,
  sheetsForDay,
  type Formula,
  type FormulaSheet,
} from "@/lib/formulas";

export function FormulaBoard({
  done,
  onToggle,
}: {
  done: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [sheetId, setSheetId] = useState("all");
  const [leftOnly, setLeftOnly] = useState(false);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return formulaSheets
      .filter((sheet) => sheetId === "all" || sheet.id === sheetId)
      .map((sheet) => ({
        ...sheet,
        formulas: sheet.formulas.filter((item) => {
          if (leftOnly && done[item.id]) return false;
          if (!needle) return true;
          return `${item.title} ${item.expr} ${item.kaam} ${sheet.subject}`
            .toLowerCase()
            .includes(needle);
        }),
      }))
      .filter((sheet) => sheet.formulas.length > 0);
  }, [done, leftOnly, query, sheetId]);

  const total = formulaSheets.reduce((sum, sheet) => sum + sheet.formulas.length, 0);
  const finished = formulaSheets.reduce(
    (sum, sheet) => sum + sheet.formulas.filter((item) => done[item.id]).length,
    0,
  );

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-heading text-xl font-semibold">Formula sheet</h2>
            <span className="text-sm tabular-nums text-muted-foreground">
              {finished}/{total} yaad
            </span>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Office lunch par aaj ki sheet kholo. Har formula ek baar bol ke tick karo.
            Chai par sheet band karke wahi lines yaad karo. Tick isi phone par rehta hai.
          </p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search: Bayes, AMAT, 2's complement..."
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="Search formulas"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={sheetId === "all" && !leftOnly ? "default" : "outline"}
              onClick={() => {
                setSheetId("all");
                setLeftOnly(false);
              }}
            >
              Sab
            </Button>
            <Button
              size="sm"
              variant={leftOnly ? "default" : "outline"}
              onClick={() => setLeftOnly((value) => !value)}
            >
              Baaki
            </Button>
            {formulaSheets.map((sheet) => (
              <Button
                key={sheet.id}
                size="sm"
                variant={sheetId === sheet.id ? "default" : "outline"}
                onClick={() => {
                  setSheetId(sheet.id);
                  setLeftOnly(false);
                }}
              >
                {shortSubject(sheet.subject)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      {visible.length === 0 ? (
        <p className="rounded-lg bg-muted px-3 py-2 text-sm">Is filter par koi formula nahi.</p>
      ) : (
        visible.map((sheet) => (
          <FormulaGroup key={sheet.id} sheet={sheet} done={done} onToggle={onToggle} />
        ))
      )}
    </div>
  );
}

export function DayFormulas({
  iso,
  done,
  onToggle,
  onOpenSheet,
}: {
  iso: string;
  done: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
  onOpenSheet: () => void;
}) {
  const sheets = sheetsForDay(iso);
  if (sheets.length === 0) return null;
  const items = sheets.flatMap((sheet) => sheet.formulas);
  const finished = items.filter((item) => done[item.id]).length;
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold">Aaj ki formula sheet</h3>
          <span className="text-xs tabular-nums text-muted-foreground">
            {finished}/{items.length}
          </span>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          Office ho to yahi lines: lunch 13:00, chai 16:30, nikalte hue 18:50. Chhutti ke din subah ke slot se pehle ek baar.
        </p>
        {sheets.map((sheet) => (
          <FormulaGroup key={sheet.id} sheet={sheet} done={done} onToggle={onToggle} />
        ))}
        <Button variant="outline" size="sm" className="self-start" onClick={onOpenSheet}>
          Saari sheets
        </Button>
      </CardContent>
    </Card>
  );
}

function FormulaGroup({
  sheet,
  done,
  onToggle,
}: {
  sheet: FormulaSheet;
  done: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
}) {
  const finished = sheet.formulas.filter((item) => done[item.id]).length;
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-medium">{sheet.subject}</h3>
          <Badge variant="outline">
            {finished}/{sheet.formulas.length}
          </Badge>
        </div>
        <ul className="flex flex-col">
          {sheet.formulas.map((item) => (
            <FormulaRow key={item.id} item={item} done={done} onToggle={onToggle} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function FormulaRow({
  item,
  done,
  onToggle,
}: {
  item: Formula;
  done: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
}) {
  const checked = Boolean(done[item.id]);
  return (
    <li className="flex items-start gap-3 border-t border-border/70 py-3 first:border-t-0">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onToggle(item.id, Boolean(value))}
        aria-label={item.title}
        className="mt-1 size-5"
      />
      <div className={checked ? "opacity-70" : ""}>
        <p className="text-sm font-medium">{item.title}</p>
        <p className="mt-1 font-mono text-sm leading-6">{item.expr}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.kaam}</p>
      </div>
    </li>
  );
}

function shortSubject(subject: string) {
  if (subject.startsWith("High-yield")) return "Mock";
  if (subject.startsWith("C, arrays")) return "DS";
  if (subject.startsWith("Trees")) return "Trees";
  if (subject.startsWith("Searching")) return "Sort";
  if (subject.startsWith("Greedy")) return "DP";
  if (subject.startsWith("Graph")) return "Graphs";
  if (subject.startsWith("Processes")) return "OS sync";
  if (subject.startsWith("Memory")) return "OS mem";
  if (subject.startsWith("ER")) return "DBMS";
  if (subject.startsWith("Indexing")) return "Txn";
  if (subject.startsWith("Delay")) return "Delay";
  if (subject.startsWith("Routing")) return "IP";
  if (subject.startsWith("TCP")) return "TCP";
  if (subject.startsWith("Theory")) return "TOC";
  if (subject.startsWith("Compiler")) return "Compiler";
  if (subject.startsWith("Discrete")) return "Discrete";
  if (subject.startsWith("Linear")) return "LA";
  if (subject.startsWith("Calculus")) return "Calculus";
  if (subject.startsWith("Probability")) return "Prob";
  if (subject.startsWith("Reasoning")) return "Reasoning";
  if (subject.startsWith("Digital")) return "DL";
  if (subject.startsWith("Computer")) return "COA";
  return subject.split(" ")[0];
}
