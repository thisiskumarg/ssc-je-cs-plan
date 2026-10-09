"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Captions,
  Check,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Settings,
  Volume2,
  VolumeX,
  X,
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

let ownsFullscreen = false;

/** Call from the same tap that opens the lecture, so the browser allows fullscreen. */
export function enterLectureFullscreen() {
  const root = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
  };
  if (document.fullscreenElement) return;
  const request = root.requestFullscreen?.bind(root) ?? root.webkitRequestFullscreen?.bind(root);
  if (!request) return;
  Promise.resolve(request())
    .then(() => {
      ownsFullscreen = true;
    })
    .catch(() => {});
}

export function leaveLectureFullscreen() {
  if (!ownsFullscreen || !document.fullscreenElement) {
    ownsFullscreen = false;
    return;
  }
  ownsFullscreen = false;
  document.exitFullscreen?.().catch(() => {});
}

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
  const [chromeOn, setChromeOn] = useState(true);
  const [speedOpen, setSpeedOpen] = useState(false);
  const hideRef = useRef(0);
  const playingRef = useRef(false);
  const speedRef = useRef(false);

  useEffect(() => {
    playingRef.current = playing;
    speedRef.current = speedOpen;
  }, [playing, speedOpen]);

  function reveal() {
    setChromeOn(true);
    window.clearTimeout(hideRef.current);
    if (playingRef.current && !speedRef.current) {
      hideRef.current = window.setTimeout(() => setChromeOn(false), 2800);
    }
  }

  useEffect(() => {
    return () => {
      window.clearTimeout(hideRef.current);
      leaveLectureFullscreen();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (document.fullscreenElement) {
        leaveLectureFullscreen();
        return;
      }
      onClose();
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
              const isPlaying = event.data === 1;
              setPlaying(isPlaying);
              setEnded(event.data === 0);
              if (isPlaying) reveal();
              else setChromeOn(true);
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
    if (document.fullscreenElement) {
      ownsFullscreen = false;
      await document.exitFullscreen();
      return;
    }
    const node = stageRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> | void }) | null;
    const request = node?.requestFullscreen?.bind(node) ?? node?.webkitRequestFullscreen?.bind(node);
    if (!request) return;
    await Promise.resolve(request());
    ownsFullscreen = true;
    reveal();
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

  function closePlayer() {
    leaveLectureFullscreen();
    onClose();
  }

  if (!open) return null;
  const showChrome = chromeOn || !playing || ended;

  const stage = (
    <div
      ref={stageRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} player`}
      className="fixed inset-0 z-[60] bg-black text-white"
      onPointerMove={() => {
        if (!playingRef.current) return;
        if (!chromeOn) setChromeOn(true);
        window.clearTimeout(hideRef.current);
        hideRef.current = window.setTimeout(() => {
          if (playingRef.current && !speedRef.current) setChromeOn(false);
        }, 2800);
      }}
    >
      <div className="absolute inset-0">
        {fallback ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&fs=1&iv_load_policy=3`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className={`h-full w-full overflow-hidden ${zoom ? "scale-[1.35]" : ""}`}>
            <div
              id="lecture-stage-player"
              className="pointer-events-none h-full w-full [&_iframe]:pointer-events-none [&_iframe]:h-full [&_iframe]:w-full"
            />
          </div>
        )}
      </div>

      {!fallback ? (
        <button
          type="button"
          className="absolute inset-0"
          aria-label={showChrome ? "Controls chhupao" : "Controls dikhao"}
          onClick={() => {
            if (showChrome && playing) setChromeOn(false);
            else reveal();
          }}
        />
      ) : (
        <button
          type="button"
          className="absolute top-[max(0.75rem,env(safe-area-inset-top))] left-3 grid size-11 place-items-center rounded-full bg-black/70"
          aria-label="Band karo"
          onClick={closePlayer}
        >
          <X className="size-6" />
        </button>
      )}

      {!fallback ? (
        <div className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${showChrome ? "opacity-100" : "opacity-0"}`}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 to-transparent" />

          <div className="pointer-events-auto absolute inset-x-0 top-0 flex items-center gap-3 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <IconHit label="Band karo" onClick={closePlayer}>
              <X className="size-6" />
            </IconHit>
            <div className="min-w-0">
              <p className="truncate text-base font-medium">{title}</p>
              <p className="truncate text-xs text-white/75">{ready ? who : "Lecture khul rahi hai"}</p>
            </div>
          </div>

          <div className="pointer-events-auto absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-6 sm:gap-10">
            <IconHit label="10 second peeche" onClick={() => { seekBy(-10); reveal(); }}>
              <span className="relative">
                <RotateCcw className="size-8" />
                <span className="absolute inset-0 grid place-items-center text-[10px] font-bold">10</span>
              </span>
            </IconHit>
            <button
              type="button"
              aria-label={ended ? "Dobara chalao" : playing ? "Roko" : "Chalao"}
              className="grid size-16 place-items-center rounded-full bg-black/45"
              onClick={() => { togglePlay(); reveal(); }}
            >
              {playing && !ended ? <Pause className="size-8 fill-current" /> : <Play className="size-8 fill-current" />}
            </button>
            <IconHit label="10 second aage" onClick={() => { seekBy(10); reveal(); }}>
              <span className="relative">
                <RotateCw className="size-8" />
                <span className="absolute inset-0 grid place-items-center text-[10px] font-bold">10</span>
              </span>
            </IconHit>
          </div>

          <div className="pointer-events-auto absolute inset-x-0 bottom-0 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <ChromeBar
              label="Video ka time"
              value={time}
              max={duration}
              tone="time"
              disabled={!ready}
              onChange={(next) => { seekTo(next); reveal(); }}
            />
            <div className="mt-1 flex items-center gap-1">
              <IconHit label={playing && !ended ? "Roko" : "Chalao"} onClick={() => { togglePlay(); reveal(); }}>
                {playing && !ended ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
              </IconHit>
              <IconHit label={muted ? "Awaz" : "Mute"} onClick={() => { toggleMute(); reveal(); }}>
                {muted || volume === 0 ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
              </IconHit>
              <div className="hidden w-24 sm:block">
                <ChromeBar
                  label="Awaz"
                  value={muted ? 0 : volume}
                  max={100}
                  tone="level"
                  disabled={!ready}
                  onChange={(next) => { setLevel(next); reveal(); }}
                />
              </div>
              <span className="ml-1 text-xs font-medium tabular-nums">
                {formatClock(time)} / {formatClock(duration)}
              </span>
              <span className="flex-1" />
              <IconHit label="Subtitle" pressed={captionsOn} onClick={() => { toggleCaptions(); reveal(); }}>
                <Captions className="size-5" />
              </IconHit>
              <IconHit label="Speed" pressed={speedOpen} onClick={() => {
                const next = !speedRef.current;
                speedRef.current = next;
                setSpeedOpen(next);
                if (next) {
                  setChromeOn(true);
                  window.clearTimeout(hideRef.current);
                } else reveal();
              }}>
                <Settings className="size-5" />
              </IconHit>
              <IconHit label={full ? "Chhoti screen" : "Poori screen"} onClick={() => void toggleFull()}>
                {full ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
              </IconHit>
            </div>
            <div className="mt-1 flex items-center gap-3 sm:hidden">
              <span className="text-xs text-white/80">Awaz</span>
              <ChromeBar
                label="Awaz"
                value={muted ? 0 : volume}
                max={100}
                tone="level"
                disabled={!ready}
                onChange={(next) => { setLevel(next); reveal(); }}
              />
            </div>
            {speedOpen ? (
              <div className="absolute right-2 bottom-full mb-2 w-44 overflow-hidden rounded-lg bg-zinc-900/95 py-1 shadow-lg">
                <p className="px-3 py-1.5 text-xs text-white/60">Speed</p>
                {RATES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex h-10 w-full items-center gap-2 px-3 text-left text-sm"
                    onClick={() => {
                      if (!ready) return;
                      playerRef.current?.setPlaybackRate(item);
                      setRate(item);
                      setSpeedOpen(false);
                      reveal();
                    }}
                  >
                    <Check className={`size-4 ${rate === item ? "opacity-100" : "opacity-0"}`} />
                    {item}x
                  </button>
                ))}
                <button
                  type="button"
                  className="flex h-10 w-full items-center gap-2 px-3 text-left text-sm"
                  onClick={() => { setZoom((value) => !value); setSpeedOpen(false); reveal(); }}
                >
                  <Check className={`size-4 ${zoom ? "opacity-100" : "opacity-0"}`} />
                  Bada dikhao
                </button>
              </div>
            ) : null}
            {captionNote ? <p className="pb-1 text-center text-xs text-white/75">{captionNote}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );

  return createPortal(stage, document.body);
}

function IconHit({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`grid size-10 place-items-center rounded-full ${pressed ? "bg-white/25" : "hover:bg-white/15"}`}
    >
      {children}
    </button>
  );
}

function ChromeBar({
  label,
  value,
  max,
  tone,
  disabled,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  tone: "time" | "level";
  disabled: boolean;
  onChange: (next: number) => void;
}) {
  const fill = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  function move(clientX: number, el: HTMLElement) {
    if (disabled || max <= 0) return;
    const rect = el.getBoundingClientRect();
    onChange(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) * max);
  }
  const ink = tone === "time" ? "bg-[#ff0000]" : "bg-white";
  return (
    <div
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={Math.round(max)}
      aria-valuenow={Math.round(value)}
      aria-disabled={disabled}
      tabIndex={0}
      className="relative flex h-6 w-full touch-none items-center"
      onPointerDown={(event) => {
        event.stopPropagation();
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
      <span className="absolute right-0 left-0 h-1 rounded-full bg-white/35" />
      <span className={`absolute left-0 h-1 rounded-full ${ink}`} style={{ width: `${fill * 100}%` }} />
      <span
        className={`absolute size-3.5 rounded-full ${ink}`}
        style={{ left: `clamp(0px, calc(${fill * 100}% - 7px), calc(100% - 14px))` }}
      />
    </div>
  );
}
