"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

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

  if (!open) return null;

  const stage = (
    <div
      ref={stageRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} player`}
      className="fixed inset-0 z-[60] flex flex-col bg-zinc-950 text-white"
    >
      <div className="flex items-center gap-3 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold">{title}</p>
          <p className="truncate text-sm text-white/70">{who} · yahin chalao, YouTube app nahi</p>
        </div>
        <button
          type="button"
          className="h-12 shrink-0 rounded-lg bg-white px-4 text-base font-semibold text-black"
          onClick={onClose}
        >
          Band karo
        </button>
      </div>

      <div className={`relative mx-auto w-full max-w-5xl bg-black ${full ? "min-h-0 flex-1" : "h-[min(52dvh,640px)]"}`}>
        {fallback ? (
          <iframe
            className="h-full w-full"
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
              <div id="lecture-stage-player" className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full" />
            </div>
          </div>
        )}
        {ended && !fallback ? (
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center bg-black/75 text-xl font-semibold"
            onClick={togglePlay}
          >
            Dobara chalao
          </button>
        ) : null}
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-3 overflow-y-auto px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {fallback ? (
          <p className="text-sm leading-6 text-white/80">
            Video badi screen par hai. Play, seek, awaz, speed aur subtitle usi player ke controls se chalao.
          </p>
        ) : (
          <>
            <label className="flex items-center gap-3 text-sm tabular-nums">
              <span className="w-12">{formatClock(time)}</span>
              <input
                type="range"
                min={0}
                max={Math.max(duration, 0)}
                step={1}
                value={Math.min(time, duration || 0)}
                aria-label="Video ka time"
                disabled={!ready}
                className="h-10 w-full cursor-pointer accent-white"
                onChange={(event) => {
                  const next = Number(event.target.value);
                  playerRef.current?.seekTo(next, true);
                  setTime(next);
                  setEnded(false);
                }}
              />
              <span className="w-12 text-right">{formatClock(duration)}</span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button type="button" className="h-14 rounded-lg bg-white/15 text-base font-semibold" onClick={() => seekBy(-10)} disabled={!ready}>
                −10s
              </button>
              <button type="button" className="h-14 rounded-lg bg-white text-lg font-semibold text-black" onClick={togglePlay} disabled={!ready}>
                {ended ? "Dobara" : playing ? "Roko" : "Chalao"}
              </button>
              <button type="button" className="h-14 rounded-lg bg-white/15 text-base font-semibold" onClick={() => seekBy(10)} disabled={!ready}>
                +10s
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" className="h-12 min-w-20 rounded-lg bg-white/15 px-3 text-base font-medium" onClick={toggleMute} disabled={!ready}>
                {muted ? "Awaz" : "Mute"}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={muted ? 0 : volume}
                aria-label="Awaz"
                disabled={!ready}
                className="h-10 w-full cursor-pointer accent-white"
                onChange={(event) => {
                  const next = Number(event.target.value);
                  const player = playerRef.current;
                  if (!player) return;
                  player.setVolume(next);
                  if (next === 0) player.mute();
                  else player.unMute();
                  setVolume(next);
                  setMuted(next === 0);
                }}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {RATES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`h-12 min-w-14 rounded-lg px-3 text-base font-semibold ${rate === item ? "bg-white text-black" : "bg-white/15"}`}
                  disabled={!ready}
                  onClick={() => {
                    playerRef.current?.setPlaybackRate(item);
                    setRate(item);
                  }}
                >
                  {item}x
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="h-12 rounded-lg bg-white/15 px-4 text-base font-medium" onClick={() => setZoom((value) => !value)}>
                {zoom ? "Poora frame" : "Bada dikhao"}
              </button>
              <button type="button" className="h-12 rounded-lg bg-white/15 px-4 text-base font-medium" onClick={() => void toggleFull()}>
                {full ? "Chhoti screen" : "Badi screen"}
              </button>
              <button
                type="button"
                className={`h-12 rounded-lg px-4 text-base font-medium ${captionsOn ? "bg-white text-black" : "bg-white/15"}`}
                onClick={toggleCaptions}
                disabled={!ready}
              >
                Subtitle
              </button>
            </div>
            {captionNote ? <p className="text-sm text-white/70">{captionNote}</p> : null}
            {!ready ? <p className="text-sm text-white/70">Player khul raha hai…</p> : null}
          </>
        )}
      </div>
    </div>
  );

  return createPortal(stage, document.body);
}
