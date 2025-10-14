"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type IntroOverlayProps = {
  open: boolean;
  onDone: () => void;
  soundOn?: boolean;
};

export default function IntroOverlay({ open, onDone, soundOn }: IntroOverlayProps) {
  const startedRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!open || startedRef.current) return;
    startedRef.current = true;

    const totalMs = 2200;
    const t1 = setTimeout(() => onDone(), totalMs);

    if (soundOn) {
      try {
        const ctx = (audioCtxRef.current ||= new (window.AudioContext || (window as any).webkitAudioContext)());
        const g = ctx.createGain();
        g.gain.value = 0.0001;
        g.connect(ctx.destination);

        const o1 = ctx.createOscillator();
        o1.type = "sine";
        o1.frequency.setValueAtTime(65.41, ctx.currentTime); // C2
        o1.connect(g);
        g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
        o1.start();
        o1.stop(ctx.currentTime + 0.95);

        const o2 = ctx.createOscillator();
        o2.type = "triangle";
        o2.frequency.setValueAtTime(261.63, ctx.currentTime + 0.35); // C4 hit
        const g2 = ctx.createGain();
        g2.gain.value = 0.0001;
        o2.connect(g2).connect(ctx.destination);
        g2.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.4);
        g2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        o2.start(ctx.currentTime + 0.35);
        o2.stop(ctx.currentTime + 1.25);
      } catch {}
    }

    return () => clearTimeout(t1);
  }, [open, onDone, soundOn]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="intro-logo"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: [0.9, 1.08, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 1.2, times: [0, 0.5, 1], ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="intro-mark">SJ</div>
            <div className="intro-sub">Portfolio</div>
          </motion.div>

          <motion.div
            className="intro-fade"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 2.2, times: [0, 0.6, 1], ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
