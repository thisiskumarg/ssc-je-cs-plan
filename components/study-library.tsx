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
import { sheetPack } from "@/lib/sheet-links";
import { videosFor, type TopicVideo } from "@/lib/topic-videos";

export function SheetBody({
  sheet,
  points,
  onTogglePoint,
}: {
  sheet: StudySheet;
  points?: Record<string, boolean>;
  onTogglePoint?: (id: string, value: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {sheet.blocks.map((block, index) => {
        const pointId = `${sheet.id}:${index}`;
        return (
          <section key={block.h}>
            <div className="flex items-start gap-2">
              {onTogglePoint ? (
                <Checkbox
                  checked={Boolean(points?.[pointId])}
                  onCheckedChange={(value) => onTogglePoint(pointId, Boolean(value))}
                  aria-label={block.h}
                  className="mt-0.5 size-5"
                />
              ) : null}
              <h4 className="text-sm font-medium">{block.h}</h4>
            </div>
            <ul className="mt-1 flex flex-col gap-1.5">
              {block.lines.map((line) => (
                <li key={line} className="text-sm leading-6">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export function DaySheets({
  iso,
  saturdayDuty,
  read,
  onToggle,
  pyqDone,
  onTogglePyq,
  videosDone,
  onToggleVideo,
  points,
  onTogglePoint,
  highlightId,
}: {
  iso: string;
  saturdayDuty: boolean;
  read: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
  pyqDone: Record<string, boolean>;
  onTogglePyq: (id: string, value: boolean) => void;
  videosDone: Record<string, boolean>;
  onToggleVideo: (id: string, value: boolean) => void;
  points: Record<string, boolean>;
  onTogglePoint: (id: string, value: boolean) => void;
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
          pyqDone={pyqDone}
          onTogglePyq={onTogglePyq}
          videosDone={videosDone}
          onToggleVideo={onToggleVideo}
          points={points}
          onTogglePoint={onTogglePoint}
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
  pyqDone,
  onTogglePyq,
  videosDone,
  onToggleVideo,
  points,
  onTogglePoint,
  highlight,
}: {
  sheet: StudySheet;
  times: string[];
  read: boolean;
  onToggle: (id: string, value: boolean) => void;
  pyqDone: Record<string, boolean>;
  onTogglePyq: (id: string, value: boolean) => void;
  videosDone: Record<string, boolean>;
  onToggleVideo: (id: string, value: boolean) => void;
  points: Record<string, boolean>;
  onTogglePoint: (id: string, value: boolean) => void;
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
        <SheetPlayer
          sheetId={sheet.id}
          videosDone={videosDone}
          onToggleVideo={onToggleVideo}
        />
        <SheetBody sheet={sheet} points={points} onTogglePoint={onTogglePoint} />
        <SheetSources
          sheetId={sheet.id}
          pyqDone={pyqDone}
          onTogglePyq={onTogglePyq}
        />
      </CardContent>
    </Card>
  );
}

function SheetPlayer({
  sheetId,
  videosDone,
  onToggleVideo,
}: {
  sheetId: string;
  videosDone: Record<string, boolean>;
  onToggleVideo: (id: string, value: boolean) => void;
}) {
  const videos = videosFor(sheetId);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);
  if (videos.length === 0) {
    return (
      <p className="rounded-lg bg-muted px-3 py-2 text-sm leading-6">
        Is ghadi par lecture nahi. Neeche wala paper yahin se kholo aur usi time
        frame mein solve karo.
      </p>
    );
  }
  const video = videos[Math.min(active, videos.length - 1)];
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border/70 p-3">
      <h4 className="text-sm font-medium">Yahin dekho</h4>
      <p className="text-sm leading-6 text-muted-foreground">
        Video isi card mein chalegi. {video.why}
      </p>
      <div className="flex flex-col gap-2">
        {videos.map((item, index) => (
          <VideoRow
            key={item.yt}
            item={item}
            open={playing === item.yt}
            watched={Boolean(videosDone[item.yt])}
            onPlay={() => {
              setActive(index);
              setPlaying(item.yt);
            }}
            onToggle={onToggleVideo}
          />
        ))}
      </div>
    </div>
  );
}

function VideoRow({
  item,
  open,
  watched,
  onPlay,
  onToggle,
}: {
  item: TopicVideo;
  open: boolean;
  watched: boolean;
  onPlay: () => void;
  onToggle: (id: string, value: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={watched}
          onCheckedChange={(value) => onToggle(item.yt, Boolean(value))}
          aria-label={`${item.title} dekh li`}
          className="mt-1 size-5"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">
            {item.who}
            {item.minutes > 0 ? ` · ${item.minutes} min` : ""}
          </p>
          <p className="text-sm leading-6">{item.title}</p>
          <p className="text-sm leading-6 text-muted-foreground">Points: {item.covers}</p>
          <Button
            type="button"
            size="sm"
            variant={open ? "secondary" : "default"}
            className="mt-2"
            onClick={onPlay}
          >
            {open ? "Yahin chal rahi hai" : "Yahin chalao"}
          </Button>
        </div>
      </div>
      {open ? (
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${item.yt}?rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : null}
    </div>
  );
}

function SheetSources({
  sheetId,
  pyqDone,
  onTogglePyq,
}: {
  sheetId: string;
  pyqDone?: Record<string, boolean>;
  onTogglePyq?: (id: string, value: boolean) => void;
}) {
  const pack = sheetPack(sheetId);
  if (!pack) return null;
  return (
    <div className="flex flex-col gap-3 border-t border-border/70 pt-3">
      <div>
        <h4 className="text-sm font-medium">Inhe khol kar padho</h4>
        <ul className="mt-1 flex flex-col gap-1">
          {pack.refs.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-6 underline"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {pack.pyq ? (
        <div>
          <h4 className="text-sm font-medium">
            PYQ, {pack.pyq.window}
            {pack.pyq.count > 0 ? ` · ${pack.pyq.count} sawal` : ""}
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{pack.pyq.note}</p>
          <ul className="mt-2 flex flex-col gap-2">
            {pack.pyq.sets.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                {onTogglePyq ? (
                  <Checkbox
                    checked={Boolean(pyqDone?.[item.id])}
                    onCheckedChange={(value) => onTogglePyq(item.id, Boolean(value))}
                    aria-label={item.title}
                    className="mt-1 size-5"
                  />
                ) : null}
                <div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium underline"
                  >
                    {item.title}
                  </a>
                  <p className="text-sm leading-6 text-muted-foreground">{item.do}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function SheetLibrary({
  saturdayDuty,
  todayIso,
  read,
  onToggle,
  pyqDone,
  onTogglePyq,
  videosDone,
  onToggleVideo,
  points,
  onTogglePoint,
  onOpenDay,
}: {
  saturdayDuty: boolean;
  todayIso: string;
  read: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
  pyqDone: Record<string, boolean>;
  onTogglePyq: (id: string, value: boolean) => void;
  videosDone: Record<string, boolean>;
  onToggleVideo: (id: string, value: boolean) => void;
  points: Record<string, boolean>;
  onTogglePoint: (id: string, value: boolean) => void;
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
            Har sheet us ghadi par khulti hai jab slot start hota hai. Video isi
            card mein chalegi, usi se us sheet ke points cover karo. Aage ke din ki
            sheets yahin hain. Point ka tick matlab woh hissa ho gaya.
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
                pyqDone={pyqDone}
                onTogglePyq={onTogglePyq}
                videosDone={videosDone}
                onToggleVideo={onToggleVideo}
                points={points}
                onTogglePoint={onTogglePoint}
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
