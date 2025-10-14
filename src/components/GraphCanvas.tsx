"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { nodes as contentNodes, type NodeContent } from "./content";

type GraphCanvasProps = {
  onSelect: (id: string) => void;
  activeId?: string | null;
};

const COLORS = {
  dot: "#88e0ff",
  dotActive: "#ffffff",
  edge: "rgba(136, 224, 255, 0.25)",
};

export default function GraphCanvas({ onSelect, activeId }: GraphCanvasProps) {
  // Arrange nodes in a circle for simplicity/minimalism
  const positions = useMemo(() => {
    const R = 160; // radius in px
    const cx = 0;
    const cy = 0;
    const angleStep = (2 * Math.PI) / contentNodes.length;
    return contentNodes.map((n, i) => {
      const a = i * angleStep - Math.PI / 2; // start at top
      return { id: n.id, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), label: n.title };
    });
  }, []);

  // Star background
  const starRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!starRef.current) return;
    const el = starRef.current;
    const count = 120;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      const size = Math.random() * 2 + 0.5;
      s.style.position = "absolute";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.borderRadius = "50%";
      s.style.background = "rgba(255,255,255,0.6)";
      s.style.opacity = String(Math.random());
      s.style.filter = "blur(0.5px)";
      fragment.appendChild(s);
    }
    el.appendChild(fragment);
    return () => {
      el.innerHTML = "";
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={starRef} className="absolute inset-0" aria-hidden />

      {/* Center origin container */}
      <div className="absolute inset-0 grid place-items-center">
        {/* Edges using SVG */}
        <svg className="absolute" width="100%" height="100%" viewBox="-250 -250 500 500" aria-hidden>
          {positions.map((p, i) => {
            const next = positions[(i + 1) % positions.length];
            return (
              <line
                key={p.id + "-edge"}
                x1={p.x}
                y1={p.y}
                x2={next.x}
                y2={next.y}
                stroke={COLORS.edge}
                strokeWidth={1}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="relative" style={{ width: 0, height: 0 }}>
          {positions.map((p) => {
            const isActive = p.id === activeId;
            return (
              <motion.button
                key={p.id}
                onClick={() => onSelect(p.id)}
                initial={{ opacity: 0, scale: 0.8, x: p.x, y: p.y }}
                animate={{ opacity: 1, scale: isActive ? 1.2 : 1, x: p.x, y: p.y }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                aria-label={`Open ${p.label}`}
              >
                <span
                  className="block rounded-full shadow"
                  style={{
                    width: isActive ? 14 : 10,
                    height: isActive ? 14 : 10,
                    background: isActive ? COLORS.dotActive : COLORS.dot,
                    boxShadow: isActive
                      ? "0 0 16px rgba(255,255,255,0.85)"
                      : "0 0 12px rgba(136,224,255,0.5)",
                  }}
                />
                <motion.span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs tracking-wide select-none"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 0.9, x: 0 }}
                >
                  {p.label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-70">
        Click a node • Arrow keys navigate • Esc to close
      </div>
    </div>
  );
}
