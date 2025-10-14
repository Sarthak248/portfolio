"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Folder from "./Folder";
import GlassModal from "./GlassModal";
import { deskCategories, type DeskCategory } from "./deskContent";
import ItemModal from "./ItemModal";
import SettingsModal from "./SettingsModal";

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
      {/* subtle center vignette */}
      <motion.div style={{ x: tx, y: ty }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="absolute inset-0 grid place-items-center">
        <motion.div style={{ x: tx, y: ty, width: 0, height: 0 }} className="relative">
          {deskCategories.map((cat) => (
            <div key={cat.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: positions[cat.id].x, top: positions[cat.id].y }}>
              <Folder category={cat} onOpen={onOpenCat} initial={positions[cat.id]} />
            </div>
          ))}
        </motion.div>
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
