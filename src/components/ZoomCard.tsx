"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { NodeContent } from "./content";

type ZoomCardProps = {
  node: NodeContent;
  onClose: () => void;
};

export default function ZoomCard({ node, onClose }: ZoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="fixed inset-x-4 bottom-6 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[680px] rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl p-5 shadow-xl text-white"
      role="dialog"
      aria-labelledby={`card-${node.id}-title`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id={`card-${node.id}-title`} className="text-lg font-semibold tracking-wide">
            {node.title}
          </h2>
          <p className="mt-2 text-sm text-white/80 leading-relaxed">
            {node.blurb}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white text-sm px-2 py-1 rounded border border-white/10"
          aria-label="Close panel"
        >
          Esc
        </button>
      </div>

      {node.items && node.items.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {node.items.map((it, idx) => (
            <div key={idx} className="rounded-lg border border-white/10 p-3 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0">
                  <Image src={it.image} alt="" fill className="object-contain" />
                </div>
                <div>
                  <div className="text-sm font-medium">{it.title}</div>
                  <div className="text-xs text-white/70 leading-snug">{it.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
