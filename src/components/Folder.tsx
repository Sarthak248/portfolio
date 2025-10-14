"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import type { DeskCategory } from "./deskContent";
import { useEffect, useRef, useState } from "react";

function iconFor(id: DeskCategory["id"]): string {
  switch (id) {
    case "projects":
      return "/project.png";
    case "experience":
      return "/work.png";
    case "hobbies":
      return "/hobbies.png";
    case "certifications":
      return "/cert.png";
    case "settings":
      return "/gear.svg";
    default:
      return "/file.svg";
  }
}

type FolderProps = {
  category: DeskCategory;
  onOpen: (c: DeskCategory) => void;
  initial: { x: number; y: number };
};

export default function Folder({ category, onOpen, initial }: FolderProps) {
  const controls = useAnimation();
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const clickHoldRef = useRef(false);
  const hoverTimerRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const showPreviewRef = useRef(false);

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };
  const clearScrollTimer = () => {
    if (scrollTimerRef.current) {
      window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
  };
  const startHoverTimer = () => {
    if (clickHoldRef.current || draggingRef.current) return;
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      setShowPreview(true);
      setScrolling(false);
      clearScrollTimer();
      // after 1s of showing preview, start scrolling if preview is still visible
      scrollTimerRef.current = window.setTimeout(() => {
        if (showPreviewRef.current) setScrolling(true);
      }, 1000);
    }, 1000);
  };

  useEffect(() => {
    // Set base animated state via controls (do not set y so that drag position is fully preserved)
    controls.start({ opacity: 1, scale: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    showPreviewRef.current = showPreview;
  }, [showPreview]);

  return (
    <motion.div
      className="desk-folder"
      drag
      dragMomentum={false}
      dragElastic={0.12}
      whileDrag={{ scale: 1.02 }}
      animate={controls}
      initial={{ x: initial.x, y: initial.y, opacity: 0, scale: 0.96 }}
      // keep position unchanged on hover; lighting effect handles feedback
      whileTap={{ scale: 0.98 }}
      onMouseMove={(e) => {
        const el = e.currentTarget as HTMLElement;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.removeProperty("--mx");
        el.style.removeProperty("--my");
        setHovered(false);
        setShowPreview(false);
        setScrolling(false);
        clearHoverTimer();
        clearScrollTimer();
      }}
      onMouseDown={() => {
        clickHoldRef.current = true;
        // If preview isn't visible yet, cancel delayed hover; otherwise keep it
        if (!showPreview) {
          setShowPreview(false);
          setScrolling(false);
          clearHoverTimer();
          clearScrollTimer();
        }
      }}
      onMouseUp={() => {
        clickHoldRef.current = false;
        if (hovered && !draggingRef.current) startHoverTimer();
      }}
      onDragStart={() => {
        draggingRef.current = true;
        movedRef.current = false;
        setShowPreview(false);
        setScrolling(false);
        clearHoverTimer();
        clearScrollTimer();
      }}
      onDrag={() => {
        movedRef.current = true;
      }}
      onDragEnd={async () => {
        // Scale-only bounce so drop position is preserved
        await controls.start({ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 18 } });
        await controls.start({ scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } });
        // Allow click again after frame
        requestAnimationFrame(() => {
          draggingRef.current = false;
          movedRef.current = false;
          // restart delayed hover if still hovered and not clicking
          if (hovered && !clickHoldRef.current) startHoverTimer();
        });
      }}
      onMouseEnter={() => { setHovered(true); if (!clickHoldRef.current && !draggingRef.current) startHoverTimer(); }}
    >
      <button
        className="w-full text-left outline-none focus-visible:outline-none"
        onClick={(e) => {
          // If we just dragged, suppress click-open
          if (draggingRef.current || movedRef.current) {
            e.preventDefault();
            return;
          }
          onOpen(category);
        }}
        aria-label={`Open ${category.label}`}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 shrink-0">
            {category.id === "settings" ? (
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: hovered ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                <Image src={iconFor(category.id)} alt="" fill className="object-contain" />
              </motion.div>
            ) : (
              <Image src={iconFor(category.id)} alt="" fill className="object-contain" />
            )}
          </div>
          <div className="font-medium tracking-wide">{category.label}</div>
        </div>

        {/* Hover Preview Strip (not for settings, with 2s delay) */}
        {showPreview && category.id !== "settings" && (
          <div className="mt-2 overflow-hidden w-[380px] sm:w-[420px]">
            <div
              className="desk-preview cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                onOpen(category);
              }}
            >
              <div className={`desk-preview-strip ${scrolling ? "animate-scroll" : ""}`}>
              {(() => {
                const items = category.items;
                const baseIdx: number[] = [];
                const n = Math.max(items.length, 1);
                for (let i = 0; i < n; i++) baseIdx.push(i % items.length);
                // Two identical halves ensure seamless -50% animation without adjacent duplicates
                const seqIdx: number[] = [...baseIdx, ...baseIdx];
                return seqIdx.map((idx, i) => {
                  const it = items[idx];
                  return (
                    <div key={`it-${i}`} className="desk-preview-item">
                      <div className="relative h-6 w-6 shrink-0">
                        <Image src={it.thumb} alt="" fill className="object-contain" />
                      </div>
                      <span className="text-[11px] opacity-80 truncate">{it.title}</span>
                    </div>
                  );
                });
              })()}
              </div>
            </div>
          </div>
        )}
      </button>
    </motion.div>
  );
}
