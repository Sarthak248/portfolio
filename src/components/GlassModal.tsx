"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { DeskCategory } from "./deskContent";

type GlassModalProps = {
  category: DeskCategory | null;
  onClose: () => void;
  onOpenItem: (payload: { title: string; description: string; thumb: string; categoryLabel: string }) => void;
};

export default function GlassModal({ category, onClose, onOpenItem }: GlassModalProps) {
  return (
    <AnimatePresence>
      {category && (
        <motion.div
          className="fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal
            aria-label={`${category.label} window`}
            className="desk-glass-window"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 130, damping: 16 }}
          >
            {/* Window chrome */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <div className="ml-3 text-xs tracking-wide uppercase opacity-80">{category.label}</div>
              </div>
              <button
                className="desk-button outline-none focus:outline-none"
                onClick={() => {
                  // blur active focus to avoid outlines sticking around
                  (document.activeElement as HTMLElement | null)?.blur?.();
                  onClose();
                }}
                aria-label="Close"
              >
                Close
              </button>
            </div>

            {/* Overview only */}
            <div className="mb-4 flex gap-2">
              <div className="desk-tab desk-tab--active">Overview</div>
            </div>

            <div className="mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.items.map((it, i) => (
                <motion.button
                  key={i}
                  className="desk-card text-left outline-none focus:outline-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => onOpenItem({ ...it, categoryLabel: category.label })}
                  aria-label={`Open ${it.title}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0">
                      <Image src={it.thumb} alt="" fill className="object-contain" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{it.title}</div>
                      <div className="text-xs opacity-80 leading-snug">{it.description}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
