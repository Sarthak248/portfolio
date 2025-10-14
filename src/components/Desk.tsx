"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Folder from "./Folder";
import GlassModal from "./GlassModal";
import { deskCategories, type DeskCategory } from "./deskContent";
import ItemModal from "./ItemModal";
import SettingsModal from "./SettingsModal";
import IntroOverlay from "./IntroOverlay";

export default function Desk() {
  const [openCat, setOpenCat] = useState<DeskCategory | null>(null);
  const [openItem, setOpenItem] = useState<{
    title: string;
    description: string;
    thumb: string;
    categoryLabel: string;
  } | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [wallpaper, setWallpaper] = useState<"wall-sequoia" | "wall-sonoma" | "wall-ventura" | "wall-monterey">("wall-sequoia");
  const [previewSpeedSec, setPreviewSpeedSec] = useState<number>(10);
  const [motionMax, setMotionMax] = useState<number>(12);
  const [introOpen, setIntroOpen] = useState(false);
  const [isTouchLandscape, setIsTouchLandscape] = useState(false);

  // Initial folder positions (desktop-like scatter)
  const positions: Record<DeskCategory["id"], { x: number; y: number }> = {
    projects: { x: -240, y: -80 },
    experience: { x: 60, y: -40 },
    hobbies: { x: -120, y: 120 },
    certifications: { x: 180, y: 140 },
    settings: { x: 260, y: -120 },
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openItem) {
          e.preventDefault();
          ;(document.activeElement as HTMLElement | null)?.blur?.();
          setOpenItem(null);
          return;
        }
        if (openCat) {
          e.preventDefault();
          ;(document.activeElement as HTMLElement | null)?.blur?.();
          setOpenCat(null);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openCat, openItem]);

  // Simple sound synth
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playTone = useCallback((freq: number, ms = 80) => {
    if (!soundOn) return;
    try {
      const ctx = (audioCtxRef.current ||= new (window.AudioContext || (window as any).webkitAudioContext)());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(freq, ctx.currentTime);
      g.gain.value = 0.0001;
      g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ms / 1000);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + ms / 1000 + 0.01);
    } catch {}
  }, [soundOn]);

  const onOpenCat = useCallback((c: DeskCategory) => {
    setOpenCat(c);
    playTone(620);
  }, [playTone]);

  const onCloseCat = useCallback(() => {
    ;(document.activeElement as HTMLElement | null)?.blur?.();
    setOpenCat(null);
    playTone(420);
  }, [playTone]);

  const onOpenItem = useCallback((payload: { title: string; description: string; thumb: string; categoryLabel: string }) => {
    setOpenItem(payload);
    playTone(760);
  }, [playTone]);

  const onCloseItem = useCallback(() => {
    ;(document.activeElement as HTMLElement | null)?.blur?.();
    setOpenItem(null);
    playTone(360);
  }, [playTone]);

  // Persist settings
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("desk-settings") || "{}");
      if (saved.wallpaper) setWallpaper(saved.wallpaper);
      if (typeof saved.previewSpeedSec === "number") setPreviewSpeedSec(saved.previewSpeedSec);
      if (typeof saved.motionMax === "number") setMotionMax(saved.motionMax);
      if (typeof saved.soundOn === "boolean") setSoundOn(saved.soundOn);
    } catch {}
    try {
      const played = localStorage.getItem("portfolio-intro-played");
      if (!played) setIntroOpen(true);
    } catch {}
  }, []);

  // Detect mobile/tablet landscape (touch + landscape)
  useEffect(() => {
    const mqlLandscape = window.matchMedia('(orientation: landscape)');
    const mqlCoarse = window.matchMedia('(pointer: coarse)');
    const update = () => setIsTouchLandscape(mqlLandscape.matches && mqlCoarse.matches);
    try {
      mqlLandscape.addEventListener('change', update);
      mqlCoarse.addEventListener('change', update);
    } catch {
      // Safari fallback
      mqlLandscape.addListener(update);
      mqlCoarse.addListener(update);
    }
    update();
    return () => {
      try {
        mqlLandscape.removeEventListener('change', update);
        mqlCoarse.removeEventListener('change', update);
      } catch {
        mqlLandscape.removeListener(update);
        mqlCoarse.removeListener(update);
      }
    };
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(
        "desk-settings",
        JSON.stringify({ wallpaper, previewSpeedSec, motionMax, soundOn })
      );
    } catch {}
  }, [wallpaper, previewSpeedSec, motionMax, soundOn]);

  // Parallax background using cursor
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const onMouseMoveDesk = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width; // -0.5..0.5
    const dy = (e.clientY - cy) / rect.height;
    mx.set(dx * motionMax);
    my.set(dy * motionMax);
  }, [mx, my, motionMax]);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMoveDesk}
      className={`relative min-h-dvh w-full desk-bg ${wallpaper} text-white`}
      style={{ ["--preview-speed" as any]: `${previewSpeedSec}s` }}
    >
      {/* Intro overlay (plays once) */}
      <IntroOverlay
        open={introOpen}
        soundOn={soundOn}
        onDone={() => {
          setIntroOpen(false);
          try { localStorage.setItem("portfolio-intro-played", "1"); } catch {}
        }}
      />
      {/* subtle center vignette (hidden on touch landscape for cleaner centering) */}
      {!isTouchLandscape && (
        <motion.div style={{ x: tx, y: ty }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)]" />
      )}

      {/* Desktop scatter (sm and up), but not on touch landscape */}
      <div className={`absolute inset-0 place-items-center ${isTouchLandscape ? 'hidden' : 'hidden sm:grid'}`}>
        <motion.div style={{ x: tx, y: ty, width: 0, height: 0 }} className="relative">
          {deskCategories.map((cat) => (
            <div key={cat.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: positions[cat.id].x, top: positions[cat.id].y }}>
              <Folder category={cat} onOpen={onOpenCat} initial={positions[cat.id]} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile centered grid (xs only) + forced on touch landscape */}
      <div className={`${isTouchLandscape ? 'flex' : 'sm:hidden flex'} items-center justify-center min-h-[100svh] w-full`}>
        <div className={`${isTouchLandscape ? 'grid grid-cols-3 gap-6 px-8 py-12 max-w-3xl' : 'grid grid-cols-2 gap-5 px-6 py-14 max-w-md'} w-full`}>
          {deskCategories.map((cat) => (
            <div key={cat.id} className="flex justify-center">
              <Folder category={cat} onOpen={onOpenCat} initial={{ x: 0, y: 0 }} draggable={true} />
            </div>
          ))}
        </div>
      </div>

      {openCat && openCat.id !== "settings" && (
        <GlassModal category={openCat} onClose={onCloseCat} onOpenItem={onOpenItem} />
      )}
      {openCat && openCat.id === "settings" && (
        <SettingsModal
          open={true}
          onClose={onCloseCat}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
          previewSpeedSec={previewSpeedSec}
          setPreviewSpeedSec={setPreviewSpeedSec}
          motionMax={motionMax}
          setMotionMax={setMotionMax}
          soundOn={soundOn}
          setSoundOn={setSoundOn}
        />
      )}
      <ItemModal item={openItem} onClose={onCloseItem} />

      {/* Footer signature */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs opacity-70">
        Drag folders • Hover to preview • Click to open • Esc to close
      </div>

      <button
        type="button"
        className="desk-sound-toggle"
        onClick={() => setSoundOn((s) => !s)}
        aria-pressed={soundOn}
      >
        Sound: {soundOn ? "On" : "Off"}
      </button>
    </div>
  );
}
