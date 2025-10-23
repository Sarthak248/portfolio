"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";

type Item = {
  title: string;
  description: string;
  thumb: string;
  categoryLabel: string;
};

type ItemModalProps = {
  item: Item | null;
  onClose: () => void;
};

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [pos, setPos] = useState(0); // absolute index in tripled track
  const posRef = useRef(0);
  const [instant, setInstant] = useState(false);
  const slides = useMemo(() => {
    if (!item) return [] as Array<{ img: string; text: string }>;
    if ((item as any).slides && Array.isArray((item as any).slides) && (item as any).slides.length > 0) {
      return (item as any).slides as Array<{ img: string; text: string }>;
    }
    const lipsum = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta, velit non pharetra dictum, dolor sem volutpat nisl, id cursus purus arcu id magna. Donec interdum sapien ut gravida imperdiet. Aenean tristique mattis mi, ut laoreet quam volutpat ac.",
      "Sed vitae magna felis. Vivamus eget dapibus ex. Cras tristique iaculis tortor, at pulvinar lacus volutpat in. Morbi fermentum, sapien ut efficitur efficitur, nunc libero facilisis ex, id dapibus dui dui quis lectus. Pellentesque ac tellus in magna euismod posuere.",
      "Ut sit amet venenatis purus. Suspendisse nec leo eu sem consequat convallis. Morbi vitae faucibus mi. In non placerat ipsum. Aliquam sodales, velit tristique ornare tempor, lorem mi tristique arcu, ac condimentum leo urna eget elit.",
      "Mauris sit amet pulvinar orci. Suspendisse eget sagittis ex. Maecenas efficitur, mi sed eleifend dapibus, augue nibh hendrerit magna, vitae facilisis dolor neque id ante. Proin feugiat tincidunt justo, quis ultrices velit efficitur sit amet.",
      "Curabitur finibus, lorem id fermentum accumsan, nulla libero gravida nisi, eu bibendum lorem arcu sed nulla. Praesent bibendum aliquet ante, non suscipit lacus efficitur sed. Nunc faucibus est vitae eros pulvinar, id malesuada nibh varius.",
    ];
    const imgs = ["/cali.png", "/guitar.png", "/hobbies.png", "/project.png", "/work.png", "/msft.png", "/sf.png"];
    return lipsum.map((txt, i) => ({ img: imgs[i % imgs.length], text: txt }));
  }, [item]);

  useEffect(() => {
    const n = slides.length || 1;
    const mid = n; // start at middle copy for slide 0
    setInstant(true);
    setPos(mid);
    posRef.current = mid;
    requestAnimationFrame(() => setInstant(false));
  }, [item, slides.length]);

  // Measure container width for pixel-accurate sliding (prevents empty frames)
  useEffect(() => {
    const el = trackRef.current?.parentElement as HTMLElement | undefined;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w !== 0) setContainerW(w);
    };
    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    try { ro.observe(el); } catch {}
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      try { ro.disconnect(); } catch {}
      window.removeEventListener("resize", measure);
    };
  }, [item]);

  const onNext = useCallback(() => {
    const n = slides.length;
    if (n === 0) return;
    setInstant(true);
    setPos((p) => {
      const next = p + n; // jump one copy right so we can move left
      posRef.current = next;
      return next;
    });
    requestAnimationFrame(() => {
      setInstant(false);
      setPos((p) => {
        const next = p + 1; // move leftwards visually
        posRef.current = next;
        return next;
      });
    });
  }, [slides.length]);
  const onPrev = useCallback(() => {
    const n = slides.length;
    if (n === 0) return;
    setInstant(true);
    setPos((p) => {
      const next = p - n; // jump one copy left so we can move right
      posRef.current = next;
      return next;
    });
    requestAnimationFrame(() => {
      setInstant(false);
      setPos((p) => {
        const next = p - 1; // move rightwards visually
        posRef.current = next;
        return next;
      });
    });
  }, [slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); onPrev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); onNext(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onPrev, onNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal
            aria-label={`${item.title} details`}
            className="desk-glass-window"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <div className="ml-3 text-xs tracking-wide uppercase opacity-80">{item.categoryLabel}</div>
              </div>
              <button
                className="desk-button outline-none focus:outline-none"
                onClick={() => {
                  (document.activeElement as HTMLElement | null)?.blur?.();
                  onClose();
                }}
              >
                Close
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold tracking-wide">{item.title}</h3>
              <div className="text-xs opacity-80 mt-1">Overview</div>
            </div>

            {/* Slideshow */}
            <div className="relative overflow-hidden">
              <motion.div
                ref={trackRef}
                className="flex"
                animate={{ x: -pos * containerW }}
                transition={instant ? { type: "tween", duration: 0 } : { type: "tween", duration: 0.75, ease: "easeInOut" }}
                onUpdate={() => { /* no-op */ }}
                onAnimationComplete={() => {
                  const n = slides.length;
                  if (n === 0) return;
                  const p = posRef.current;
                  if (p < n) {
                    setInstant(true);
                    const next = p + n; // rebase to middle copy
                    setPos(next);
                    posRef.current = next;
                    requestAnimationFrame(() => setInstant(false));
                  } else if (p >= 2 * n) {
                    setInstant(true);
                    const next = p - n;
                    setPos(next);
                    posRef.current = next;
                    requestAnimationFrame(() => setInstant(false));
                  }
                }}
                drag="x"
                dragElastic={0.12}
                dragMomentum={false}
                onDragEnd={(e, info) => {
                  const threshold = 60; // px
                  if (info.offset.x > threshold) onPrev();
                  else if (info.offset.x < -threshold) onNext();
                }}
              >
                {(() => {
                  const n = slides.length;
                  const trip = [...slides, ...slides, ...slides];
                  const start = n - (pos % n + n) % n; // ensure key stability across pos changes
                  return trip.map((s, i) => (
                    <div key={`${start}-${i}`} className="shrink-0 grow-0 basis-full px-1">
                      <div className="relative">
                        <div className="relative float-left mr-4 mb-2 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-lg overflow-hidden">
                          <Image src={s.img} alt="" fill className="object-cover" />
                        </div>
                        <p className="text-sm opacity-85 leading-relaxed whitespace-pre-line max-h-[48vh] overflow-auto pr-1">
                          {s.text}
                        </p>
                        <div className="clear-both" />
                      </div>
                    </div>
                  ));
                })()}
              </motion.div>

              {/* Controls */}
              {slides.length > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <button className="desk-button" onClick={onPrev} aria-label="Previous">
                    Prev
                  </button>
                  <div className="flex items-center gap-2">
                    {slides.map((_, i) => {
                      const n = slides.length || 1;
                      const realIdx = ((pos % n) + n) % n;
                      return (
                        <span key={i} className={`inline-block h-1.5 w-4 rounded-full ${i === realIdx ? 'bg-white/90' : 'bg-white/30'}`} />
                      );
                    })}
                  </div>
                  <button className="desk-button" onClick={onNext} aria-label="Next">
                    Next
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
