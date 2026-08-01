"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/**
 * Öffnungs-Animation der Website: ein Vorhang in Tannengrün mit dem
 * Wortmarken-Emblem, der sich nach kurzer Zeit nach oben zurückzieht —
 * das "wie die Website aufgeht"-Moment, wie bei klassischen Hotel-Sites.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyVisited = window.sessionStorage.getItem("bergkristall-visited");
    window.sessionStorage.setItem("bergkristall-visited", "1");

    const delay = reducedMotion || alreadyVisited ? 0 : 1500;
    const timer = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-pine-900"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_PREMIUM }}
            className="flex flex-col items-center gap-4"
          >
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden="true">
              <path
                d="M23 4 L38 34 L30 34 L23 20 L16 34 L8 34 Z"
                stroke="#d9bd82"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <circle cx="23" cy="14" r="2.2" fill="#d9bd82" />
            </svg>
            <span className="font-display text-2xl tracking-[0.08em] text-cream-50">
              Bergkristall
            </span>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE_PREMIUM }}
            className="mt-6 h-px w-24 origin-left bg-gold-300/50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
