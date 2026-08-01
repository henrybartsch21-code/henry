"use client";

import { motion } from "framer-motion";
import { Photo } from "@/components/ui/media-placeholder";
import type { RoomTone } from "@/lib/hotel-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = "pine",
  label,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone?: RoomTone;
  label: string;
}) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-pine-900 pt-28">
      <Photo tone={tone} label={label} ratio="" className="absolute inset-0 h-full w-full opacity-90" showTag={false} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-pine-950/95 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-pine-950/50 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 pb-16 lg:px-12 lg:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="mb-5 flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.22em] text-gold-300"
        >
          <span className="h-px w-8 bg-gold-300" />
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.28, ease: EASE }}
          className="max-w-2xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] text-cream-50"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
          className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream-100/85"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
