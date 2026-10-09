"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Captions,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

type CaptionTrack = { languageCode?: string; languageName?: string };

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  setPlaybackRate: (rate: number) => void;
  getPlaybackRate: () => number;
  destroy: () => void;
  loadModule?: (name: string) => void;
  unloadModule?: (name: string) => void;
  getOption?: (module: string, option: string) => unknown;
  setOption?: (module: string, option: string, value: unknown) => void;
};

type YTNamespace = {
  Player: new (id: string, options: Record<string, unknown>) => YTPlayer;
};

const RATES = [0.75, 1, 1.25, 1.5, 2];

let apiPromise: Promise<void> | null = null;

function youtubeWindow() {
  return window as Window & {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  };
}

function loadYouTubeApi() {
  const host = youtubeWindow();
  if (host.YT?.Player) return Promise.resolve();
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previous = host.onYouTubeIframeAPIReady;
      host.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve();
      };
      if (!document.querySelector("script[data-lecture-api='1']")) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.dataset.lectureApi = "1";
        document.head.appendChild(script);
      }
      const started = Date.now();
      const timer = window.setInterval(() => {
        if (host.YT?.Player) {
          window.clearInterval(timer);
          resolve();
        } else if (Date.now() - started > 8000) {
          window.clearInterval(timer);
          reject(new Error("youtube"));
        }
      }, 200);
    });
  }
  return apiPromise;
}

function formatClock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const minute = Math.floor(whole / 60);
  const second = whole % 60;
  return `${minute}:${second.toString().padStart(2, "0")}`;
}

const mounted = {
  subscribe: () => () => {},
  get: () => true,
  server: () => false,
};

export function LectureStage({
  yt,
  title,
  who,
  onClose,
}: {
  yt: string;
  title: string;
  who: string;
  onClose: () => void;
}) {
  const open = useSyncExternalStore(mounted.subscribe, mounted.get, mounted.server);
  const playerRef = useRef<YTPlayer | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [rate, setRate] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [full, setFull] = useState(false);
  const [captionNote, setCaptionNote] = useState("");
  const [captionsOn, setCaptionsOn] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  useEffect(() => {
    const onChange = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    let dead = false;
    let timer = 0;
    let player: YTPlayer | null = null;
    loadYouTubeApi()
      .then(() => {
        const YT = youtubeWindow().YT;
        if (dead || !YT) return;
        player = new YT.Player("lecture-stage-player", {
          videoId: yt,
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            controls: 0,
            fs: 0,
            disablekb: 1,
            iv_load_policy: 3,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: { target: YTPlayer }) => {
              if (dead) return;
              playerRef.current = event.target;
              setReady(true);
              event.target.playVideo();
              setPlaying(true);
              const nextVolume = event.target.getVolume();
              if (Number.isFinite(nextVolume)) setVolume(nextVolume);
              setMuted(event.target.isMuted());
            },
            onStateChange: (event: { data: number }) => {
              if (dead) return;
              setPlaying(event.data === 1);
              setEnded(event.data === 0);
            },
          },
        });
        timer = window.setInterval(() => {
          if (!playerRef.current) return;
          try {
            const nextDuration = playerRef.current.getDuration();
            const nextTime = playerRef.current.getCurrentTime();
            if (Number.isFinite(nextDuration)) setDuration(nextDuration);
            if (Number.isFinite(nextTime)) setTime(nextTime);
          } catch {
            /* player is not ready yet */
          }
        }, 400);
      })
      .catch(() => {
        if (!dead) setFallback(true);
      });
    return () => {
      dead = true;
      window.clearInterval(timer);
      playerRef.current = null;
      try {
        player?.destroy();
      } catch {
        /* already removed */
      }
    };
  }, [yt]);

  function togglePlay() {
    const player = playerRef.current;
    if (!player) return;
    if (ended) {
      player.seekTo(0, true);
      player.playVideo();
      setEnded(false);
      setPlaying(true);
      return;
    }
    if (playing) player.pauseVideo();
    else player.playVideo();
  }

  function seekBy(delta: number) {
    const player = playerRef.current;
    if (!player) return;
    const next = Math.min(Math.max(0, player.getCurrentTime() + delta), duration || 0);
    player.seekTo(next, true);
    setTime(next);
    setEnded(false);
  }

  function toggleMute() {
    const player = playerRef.current;
    if (!player) return;
    if (player.isMuted() || player.getVolume() === 0) {
      player.unMute();
      if (player.getVolume() === 0) player.setVolume(80);
      setMuted(false);
      setVolume(player.getVolume());
    } else {
      player.mute();
      setMuted(true);
    }
  }

  async function toggleFull() {
    const node = stageRef.current;
    if (!node) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await node.requestFullscreen();
  }

  function toggleCaptions() {
    const player = playerRef.current;
    if (!player?.loadModule || !player.getOption || !player.setOption) {
      setCaptionNote("Subtitle yahan se nahi khula");
      return;
    }
    try {
      if (captionsOn) {
        player.unloadModule?.("captions");
        setCaptionsOn(false);
        setCaptionNote("");
        return;
      }
      player.loadModule("captions");
      const list = player.getOption("captions", "tracklist");
      if (!Array.isArray(list) || list.length === 0) {
        setCaptionNote("Is video par subtitle nahi");
        return;
      }
      const tracks = list as CaptionTrack[];
      const track =
        tracks.find((item) => item.languageCode === "hi") ??
        tracks.find((item) => item.languageCode === "en") ??
        tracks[0];
      player.setOption("captions", "track", { languageCode: track.languageCode });
      setCaptionsOn(true);
      setCaptionNote(track.languageName || track.languageCode || "On");
    } catch {
      setCaptionNote("Subtitle nahi khula");
    }
  }

  function seekTo(next: number) {
    const player = playerRef.current;
    if (!player) return;
    const clamped = Math.min(Math.max(0, next), duration || 0);
    player.seekTo(clamped, true);
    setTime(clamped);
    setEnded(false);
  }

  function setLevel(next: number) {
    const player = playerRef.current;
    if (!player) return;
    player.setVolume(next);
    if (next === 0) player.mute();
    else player.unMute();
    setVolume(next);
    setMuted(next === 0);
  }

  if (!open) return null;

  const stage = (
    <div
      ref={stageRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} player`}
      className="fixed inset-0 z-[60] flex flex-col bg-background text-foreground"
    >
      <header className="flex items-center gap-3 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-card"
          onClick={onClose}
          aria-label="Band karo"
        >
          <X className="size-5" />
        </button>
        <div className="min-w-0">
          <p className="truncate font-heading text-lg leading-tight font-semibold">{title}</p>
          <p className="truncate text-sm text-muted-foreground">{who}</p>
        </div>
      </header>

      <div className="bg-black">
        <div className="relative mx-auto aspect-video w-[min(100%,calc(42dvh*16/9))] max-w-5xl">
          {fallback ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&fs=1&iv_load_policy=3`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={
                  zoom
                    ? "absolute top-1/2 left-1/2 h-[145%] w-[145%] -translate-x-1/2 -translate-y-1/2"
                    : "absolute inset-0"
                }
              >
                <div
                  id="lecture-stage-player"
                  className="pointer-events-none h-full w-full [&_iframe]:pointer-events-none [&_iframe]:h-full [&_iframe]:w-full"
                />
              </div>
            </div>
          )}
          {!fallback && !ready ? (
            <p className="absolute inset-0 grid place-items-center text-sm text-white/80">Lecture khul rahi hai</p>
          ) : null}
          {!fallback && ended ? (
            <button
              type="button"
              className="absolute inset-0 grid place-items-center bg-black/55"
              onClick={togglePlay}
              aria-label="Dobara chalao"
            >
              <span className="grid size-16 place-items-center rounded-full bg-card text-foreground">
                <RotateCw className="size-7" />
              </span>
            </button>
          ) : null}
          {!fallback && ready && !ended ? (
            <button
              type="button"
              className="absolute inset-0 grid place-items-center"
              onClick={togglePlay}
              aria-label={playing ? "Roko" : "Chalao"}
            >
              {playing ? null : (
                <span className="grid size-16 place-items-center rounded-full bg-card/95 text-foreground shadow-sm">
                  <Play className="size-7 fill-current" />
                </span>
              )}
            </button>
          ) : null}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 overflow-y-auto px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {fallback ? (
          <p className="text-sm leading-6 text-muted-foreground">
            Video isi frame mein hai. Play, seek, awaz aur speed usi frame ke controls se chalao.
          </p>
        ) : (
          <>
            <SeekBar time={time} duration={duration} disabled={!ready} onSeek={seekTo} />

            <div className="grid grid-cols-3 items-start">
              <RoundAction label="10s peeche" disabled={!ready} onClick={() => seekBy(-10)}>
                <RotateCcw className="size-5" />
              </RoundAction>
              <RoundAction label={ended ? "Dobara" : playing ? "Roko" : "Chalao"} primary disabled={!ready} onClick={togglePlay}>
                {playing && !ended ? <Pause className="size-7 fill-current" /> : <Play className="size-7 fill-current" />}
              </RoundAction>
              <RoundAction label="10s aage" disabled={!ready} onClick={() => seekBy(10)}>
                <RotateCw className="size-5" />
              </RoundAction>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Speed</p>
              <div className="flex rounded-full bg-muted p-1" role="group" aria-label="Speed">
                {RATES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-disabled={!ready}
                    className={`h-10 flex-1 rounded-full text-sm font-semibold ${rate === item ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                    onClick={() => {
                      if (!ready) return;
                      playerRef.current?.setPlaybackRate(item);
                      setRate(item);
                    }}
                  >
                    {item}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-10 text-xs font-medium text-muted-foreground">Awaz</span>
              <LevelBar
                label="Awaz"
                value={muted ? 0 : volume}
                max={100}
                disabled={!ready}
                onChange={setLevel}
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <DeckButton label={muted ? "Awaz" : "Mute"} disabled={!ready} onClick={toggleMute} active={muted}>
                {muted || volume === 0 ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
              </DeckButton>
              <DeckButton label="Subtitle" disabled={!ready} onClick={toggleCaptions} active={captionsOn}>
                <Captions className="size-5" />
              </DeckButton>
              <DeckButton label={zoom ? "Poora" : "Bada"} onClick={() => setZoom((value) => !value)} active={zoom}>
                {zoom ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
              </DeckButton>
              <DeckButton label={full ? "Chhoti" : "Badi"} onClick={() => void toggleFull()} active={full}>
                {full ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
              </DeckButton>
            </div>
            {captionNote ? <p className="text-center text-sm text-muted-foreground">{captionNote}</p> : null}
          </>
        )}
      </div>
    </div>
  );

  return createPortal(stage, document.body);
}

function SeekBar({
  time,
  duration,
  disabled,
  onSeek,
}: {
  time: number;
  duration: number;
  disabled: boolean;
  onSeek: (next: number) => void;
}) {
  const ratio = duration > 0 ? Math.min(1, time / duration) : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs font-medium tabular-nums text-muted-foreground">
        <span>{formatClock(time)}</span>
        <span>{formatClock(duration)}</span>
      </div>
      <LevelBar label="Video ka time" value={time} max={duration} disabled={disabled} onChange={onSeek} strong ratio={ratio} />
    </div>
  );
}

function LevelBar({
  label,
  value,
  max,
  disabled,
  onChange,
  strong,
  ratio,
}: {
  label: string;
  value: number;
  max: number;
  disabled: boolean;
  onChange: (next: number) => void;
  strong?: boolean;
  ratio?: number;
}) {
  const fill = ratio ?? (max > 0 ? Math.min(1, value / max) : 0);
  function move(clientX: number, el: HTMLElement) {
    if (disabled || max <= 0) return;
    const rect = el.getBoundingClientRect();
    const next = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) * max;
    onChange(next);
  }
  return (
    <div
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={Math.round(max)}
      aria-valuenow={Math.round(value)}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className="relative flex h-10 w-full touch-none items-center"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        move(event.clientX, event.currentTarget);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event.clientX, event.currentTarget);
      }}
      onKeyDown={(event) => {
        if (disabled) return;
        const step = max > 20 ? 5 : 1;
        if (event.key === "ArrowRight") onChange(Math.min(max, value + step));
        if (event.key === "ArrowLeft") onChange(Math.max(0, value - step));
      }}
    >
      <span className={`absolute right-0 left-0 rounded-full bg-muted ${strong ? "h-1.5" : "h-1"}`} />
      <span
        className={`absolute left-0 rounded-full bg-primary ${strong ? "h-1.5" : "h-1"}`}
        style={{ width: `${fill * 100}%` }}
      />
      <span
        className="absolute size-4 rounded-full border-2 border-primary bg-card shadow-sm"
        style={{ left: `clamp(0px, calc(${fill * 100}% - 8px), calc(100% - 16px))` }}
      />
    </div>
  );
}

function RoundAction({
  label,
  primary,
  disabled,
  onClick,
  children,
}: {
  label: string;
  primary?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled) onClick();
      }}
      className="flex flex-col items-center gap-2"
    >
      <span
        className={
          primary
            ? "grid size-[4.5rem] place-items-center rounded-full bg-primary text-primary-foreground shadow-sm"
            : "grid size-12 place-items-center rounded-full bg-secondary text-foreground"
        }
      >
        {children}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function DeckButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled) onClick();
      }}
      className={`flex h-16 flex-col items-center justify-center gap-1.5 rounded-2xl border text-xs font-medium ${
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
      }`}
    >
      {children}
      {label}
    </button>
  );
}
