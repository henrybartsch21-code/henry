"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

/**
 * Bild-Reveal wie auf klassischen Luxus-Hotel-Sites: ein Vorhang schiebt
 * sich beiseite und gibt das Bild darunter frei, statt es nur einzublenden.
 */
export function CurtainReveal({
  children,
  className,
  delay = 0,
  direction = "left",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ scale: 1.15, opacity: 0.6 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.3, delay: delay + 0.15, ease: EASE_PREMIUM }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.95, delay, ease: EASE_PREMIUM }}
        style={{ originX: direction === "left" ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 bg-pine-900"
      />
    </div>
  );
}
