"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { subtopicPack } from "@/lib/subtopic-learn";
import { paperLabel, type OfficialTopic } from "@/lib/official-syllabus";

export function SubtopicUnit({
  item,
  done,
  onToggle,
  pyqDone,
  onTogglePyq,
}: {
  item: OfficialTopic;
  done: boolean;
  onToggle: (id: string, value: boolean) => void;
  pyqDone: Record<string, boolean>;
  onTogglePyq: (id: string, value: boolean) => void;
}) {
  const pack = subtopicPack(item.id);
  const [playing, setPlaying] = useState<string | null>(null);
  if (!pack) return null;
  const pyqId = `sub-${item.id}`;
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/70 p-3">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={done}
          onCheckedChange={(value) => onToggle(item.id, Boolean(value))}
          aria-label={item.text}
          className="mt-1 size-5"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-6">{item.text}</p>
          <p className="text-xs text-muted-foreground">
            {paperLabel(item.paper)} · {item.code} · {item.section}
          </p>
          <p className="mt-1 text-sm font-medium tabular-nums">{pack.window}</p>
          <p className="text-sm leading-6 text-muted-foreground">{pack.how}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Suno, isi card mein</h4>
        {pack.listen.map((video) => (
          <div key={video.yt} className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm leading-6">
                {video.who} · {video.title}
              </p>
              <Button
                type="button"
                size="sm"
                variant={playing === video.yt ? "secondary" : "default"}
                onClick={() => setPlaying(video.yt)}
              >
                {playing === video.yt ? "Yahin chal rahi hai" : "Yahin chalao"}
              </Button>
            </div>
            {playing === video.yt ? (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.yt}?rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-sm font-medium">Padho</h4>
        <ul className="mt-1 flex flex-col gap-1">
          {pack.read.map((item) => (
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

      <div className="flex items-start gap-3">
        <Checkbox
          checked={Boolean(pyqDone[pyqId])}
          onCheckedChange={(value) => onTogglePyq(pyqId, Boolean(value))}
          aria-label={`${item.text} PYQ`}
          className="mt-1 size-5"
        />
        <div>
          <a
            href={pack.pyq.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline"
          >
            PYQ {pack.pyq.count} · {pack.pyq.title}
          </a>
          <p className="text-sm leading-6 text-muted-foreground">{pack.pyq.do}</p>
        </div>
      </div>
    </div>
  );
}
