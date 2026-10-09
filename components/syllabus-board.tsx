"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SubtopicUnit } from "@/components/subtopic-unit";
import { dayByIso } from "@/lib/plan";
import {
  officialTopics,
  paperLabel,
  syllabusSectionOrder,
  type OfficialTopic,
} from "@/lib/official-syllabus";

type Filter = "all" | "left" | "I" | "II";

export function SyllabusBoard({
  done,
  onToggle,
  pyqDone,
  onTogglePyq,
  onOpenDay,
}: {
  done: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
  pyqDone: Record<string, boolean>;
  onTogglePyq: (id: string, value: boolean) => void;
  onOpenDay: (iso: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [section, setSection] = useState("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return officialTopics.filter((item) => {
      if (filter === "left" && done[item.id]) return false;
      if (filter === "I" && item.paper === "II") return false;
      if (filter === "II" && item.paper === "I") return false;
      if (section !== "all" && item.section !== section) return false;
      if (!needle) return true;
      return `${item.text} ${item.section} ${item.code}`.toLowerCase().includes(needle);
    });
  }, [done, filter, query, section]);

  const finished = officialTopics.filter((item) => done[item.id]).length;
  const groups = syllabusSectionOrder
    .map((name) => ({
      name,
      items: visible.filter((item) => item.section === name),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-heading text-xl font-semibold">Official lines</h2>
            <span className="text-sm tabular-nums text-muted-foreground">
              {finished}/{officialTopics.length} tick
            </span>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Har line ka window us din ke diye hue slot ke andar hai. Line kholo:
            lecture bade player mein, page, aur utne PYQ. Tick tab jab woh window ho
            chuki ho. Tick isi phone par rehta hai.
          </p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search: Bayes, deadlock, analogy..."
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="Search syllabus"
          />
          <div className="flex flex-wrap gap-2">
            <FilterButton current={filter} value="all" onSelect={setFilter}>
              Sab
            </FilterButton>
            <FilterButton current={filter} value="I" onSelect={setFilter}>
              Paper-I
            </FilterButton>
            <FilterButton current={filter} value="II" onSelect={setFilter}>
              Paper-II
            </FilterButton>
            <FilterButton current={filter} value="left" onSelect={setFilter}>
              Baaki
            </FilterButton>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Button
              size="sm"
              variant={section === "all" ? "default" : "outline"}
              onClick={() => setSection("all")}
            >
              Saare subjects
            </Button>
            {syllabusSectionOrder.map((name) => (
              <Button
                key={name}
                size="sm"
                variant={section === name ? "default" : "outline"}
                onClick={() => setSection(name)}
              >
                {shortSection(name)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {groups.length === 0 ? (
        <p className="rounded-lg bg-muted px-3 py-3 text-sm">
          Is filter mein koi line nahi. Search ya subject hatao.
        </p>
      ) : (
        groups.map((group) => (
          <Card key={group.name}>
            <CardContent className="flex flex-col gap-3">
              <h3 className="font-heading text-lg font-semibold">{group.name}</h3>
              <ul className="flex flex-col">
                {group.items.map((item) => (
                  <TopicRow
                    key={item.id}
                    item={item}
                    checked={Boolean(done[item.id])}
                    onToggle={onToggle}
                    pyqDone={pyqDone}
                    onTogglePyq={onTogglePyq}
                    onOpenDay={onOpenDay}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

function TopicRow({
  item,
  checked,
  onToggle,
  pyqDone,
  onTogglePyq,
  onOpenDay,
}: {
  item: OfficialTopic;
  checked: boolean;
  onToggle: (id: string, value: boolean) => void;
  pyqDone: Record<string, boolean>;
  onTogglePyq: (id: string, value: boolean) => void;
  onOpenDay: (iso: string) => void;
}) {
  const day = dayByIso(item.day);
  return (
    <li className="border-b border-border/70 py-2 last:border-b-0">
      <details>
        <summary className="flex cursor-pointer list-none items-start gap-3">
          <Checkbox
            checked={checked}
            onCheckedChange={(value) => onToggle(item.id, Boolean(value))}
            onClick={(event) => event.stopPropagation()}
            aria-label={item.text}
            className="mt-1 size-5"
          />
          <div className="min-w-0 flex-1">
            <p className={`text-sm leading-6 ${checked ? "text-muted-foreground line-through" : ""}`}>
              {item.text}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant="outline">{paperLabel(item.paper)}</Badge>
              <span className="text-xs text-muted-foreground">{item.code}</span>
              <button
                type="button"
                className="text-xs font-medium underline"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onOpenDay(item.day);
                }}
              >
                {day.dateLabel}
              </button>
              <span className="text-xs text-muted-foreground">Kholo: video, page, PYQ</span>
            </div>
          </div>
        </summary>
        <div className="pt-3">
          <SubtopicUnit
            item={item}
            done={checked}
            onToggle={onToggle}
            pyqDone={pyqDone}
            onTogglePyq={onTogglePyq}
          />
        </div>
      </details>
    </li>
  );
}

function FilterButton({
  current,
  value,
  onSelect,
  children,
}: {
  current: Filter;
  value: Filter;
  onSelect: (value: Filter) => void;
  children: string;
}) {
  return (
    <Button
      size="sm"
      variant={current === value ? "default" : "outline"}
      onClick={() => onSelect(value)}
    >
      {children}
    </Button>
  );
}

function shortSection(name: string) {
  if (name === "Computer Organization and Architecture") return "COA";
  if (name === "Programming and Data Structures") return "DS";
  if (name === "General Intelligence & Reasoning") return "Reasoning";
  if (name === "Theory of Computation") return "TOC";
  if (name === "Engineering Mathematics") return "Maths";
  if (name === "Computer Networks") return "Networks";
  return name;
}
