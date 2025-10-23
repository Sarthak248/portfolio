"use client";

import { AnimatePresence, motion } from "framer-motion";

type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
  wallpaper: "wall-sequoia" | "wall-sonoma" | "wall-ventura" | "wall-monterey";
  setWallpaper: (v: SettingsModalProps["wallpaper"]) => void;
  previewSpeedSec: number;
  setPreviewSpeedSec: (n: number) => void;
  motionMax: number;
  setMotionMax: (n: number) => void;
  soundOn: boolean;
  setSoundOn: (b: boolean) => void;
};

const wallpapers: Array<{ id: SettingsModalProps["wallpaper"]; label: string }> = [
  { id: "wall-sequoia", label: "Sequoia" },
  { id: "wall-sonoma", label: "Sonoma" },
  { id: "wall-ventura", label: "Ventura" },
  { id: "wall-monterey", label: "Monterey" },
];

export default function SettingsModal(props: SettingsModalProps) {
  const {
    open,
    onClose,
    wallpaper,
    setWallpaper,
    previewSpeedSec,
    setPreviewSpeedSec,
    motionMax,
    setMotionMax,
    soundOn,
    setSoundOn,
  } = props;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal
            aria-label="Settings"
            className="desk-glass-window w-[92vw] sm:w-auto max-w-[min(92vw,720px)] max-h-[82svh] overflow-auto"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
          >
            <div className="flex items-center justify-between mb-3 sticky top-0 z-10 bg-black/30 backdrop-blur-[2px] rounded-lg px-3 py-2 -mx-3">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <div className="ml-3 text-xs tracking-wide uppercase opacity-80">Settings</div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
              <section className="desk-card">
                <div className="text-sm font-medium mb-2">Wallpaper</div>
                <div className="grid grid-cols-2 gap-3">
                  {wallpapers.map((w) => (
                    <button
                      key={w.id}
                      className={`rounded-xl p-3 border text-left outline-none focus:outline-none ${
                        wallpaper === w.id ? "border-white/40" : "border-white/10"
                      }`}
                      onClick={() => setWallpaper(w.id)}
                    >
                      <div className={`h-20 rounded-lg ${w.id}`} />
                      <div className="mt-2 text-xs opacity-80">{w.label}</div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="desk-card">
                <div className="text-sm font-medium mb-2">Motion</div>
                <div className="text-xs opacity-80 mb-2">Parallax strength</div>
                <input
                  type="range"
                  min={0}
                  max={24}
                  step={1}
                  value={motionMax}
                  onChange={(e) => setMotionMax(Number(e.target.value))}
                  className="w-full"
                  aria-label="Parallax motion strength"
                />

                <div className="mt-4 text-xs opacity-80 mb-2">Preview scroll speed (seconds per loop)</div>
                <input
                  type="range"
                  min={4}
                  max={20}
                  step={1}
                  value={previewSpeedSec}
                  onChange={(e) => setPreviewSpeedSec(Number(e.target.value))}
                  className="w-full"
                  aria-label="Preview scroll speed"
                />
              </section>

              <section className="desk-card">
                <div className="text-sm font-medium mb-2">Sound</div>
                <div className="flex items-center gap-3">
                  <button
                    className="desk-button outline-none focus:outline-none"
                    onClick={() => setSoundOn(!soundOn)}
                    aria-pressed={soundOn}
                  >
                    {soundOn ? "Disable UI sounds" : "Enable UI sounds"}
                  </button>
                  <div className="text-xs opacity-70">Subtle tones for open/close</div>
                </div>
              </section>

              <section className="desk-card">
                <div className="text-sm font-medium mb-2">Other personalization ideas</div>
                <ul className="text-xs opacity-80 list-disc pl-4 space-y-1">
                  <li>Toggle dot-grid overlay on the desk</li>
                  <li>Reduce animations (accessibility)</li>
                  <li>High-contrast labels</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
