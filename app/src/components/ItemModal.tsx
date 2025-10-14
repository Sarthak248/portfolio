"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

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

            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 shrink-0">
                <Image src={item.thumb} alt="" fill className="object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-wide">{item.title}</h3>
                <p className="mt-2 text-sm opacity-85 leading-relaxed">{item.description}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="desk-card h-24" />
              <div className="desk-card h-24" />
              <div className="desk-card h-24" />
              <div className="desk-card h-24" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
