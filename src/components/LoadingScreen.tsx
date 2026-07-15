"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// scale=1 → initial load (1.5s), scale=0.7 → page transitions (~1.05s)
const BASE_MS = 1500;
const ORIGINAL_BASE_MS = 3300; // internal animation timings below were tuned against this

export function LoadingOverlay({ scale = 1, onHide }: { scale?: number; onHide?: () => void }) {
  const [visible, setVisible] = useState(true);

  // rescale so the pathLength/bar/logo animations still resolve within the new base duration
  const s = scale * (BASE_MS / ORIGINAL_BASE_MS);
  const timeout = Math.round(BASE_MS * scale);
  const exitDuration = 0.9 * s;

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onHide?.();
    }, timeout);
    return () => clearTimeout(t);
  }, [timeout, onHide]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] bg-brand-bg flex flex-col items-center justify-center overflow-hidden"
          exit={{ y: "-100%" }}
          transition={{ duration: exitDuration, ease: [0.76, 0, 0.24, 1] }}
        >
          <AnimatedLogo s={s} />

          <motion.p
            className="mt-10 font-servus font-light text-[11px] tracking-[0.25em] text-brand-cream/40 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 * s, duration: 1.0 * s }}
          >
            REUNION
          </motion.p>

          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-brand-cream/20"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.1 * s, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnimatedLogo({ s }: { s: number }) {
  const size = 200;
  const radius = 96;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="relative flex items-center justify-center w-[200px] h-[200px]">
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${size} ${size}`} fill="none">
        <motion.circle
          cx={cx} cy={cy} r={radius}
          stroke="#EDEDE0" strokeWidth="0.75"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.45 }}
          transition={{
            pathLength: { duration: 1.8 * s, ease: "easeInOut", delay: 0.5 * s },
            opacity: { duration: 0.3 * s, delay: 0.5 * s },
          }}
        />
        <motion.circle
          cx={cx} cy={cy} r={radius + 6}
          stroke="#EDEDE0" strokeWidth="0.5" strokeDasharray="3 10"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.2, rotate: 360 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          transition={{
            opacity: { delay: 1.2 * s, duration: 0.6 * s },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 * s, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 * s }}
        className="w-[110px] h-[110px] relative"
      >
        <Image src="/logo.png" alt="Reunion" fill className="object-contain" priority />
      </motion.div>
    </div>
  );
}

// Initial page load — full duration
export default function LoadingScreen() {
  return <LoadingOverlay scale={1} />;
}
