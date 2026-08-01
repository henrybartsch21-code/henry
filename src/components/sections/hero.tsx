"use client";

import { motion } from "framer-motion";
import { MountainScene } from "@/components/ui/mountain-scene";
import { Magnetic } from "@/components/ui/magnetic";
import { BookingBar } from "@/components/ui/booking-bar";
import { useLanguage } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { lang } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-pine-900"
    >
      <MountainScene className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-pine-950/50 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 pb-16 pt-40 lg:px-12 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
          className="mb-6 flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-cream-100/85"
        >
          <span className="h-px w-8 bg-gold-300" />
          {lang === "de" ? "Salzburger Alpen — seit 1962" : "Salzburg Alps — since 1962"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.75, ease: EASE }}
          className="max-w-3xl font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] text-cream-50"
        >
          {lang === "de" ? (
            <>
              Wo die Luft <span className="font-script text-sage-300 text-[1.15em]">klarer</span> und
              die Zeit <span className="font-script text-sage-300 text-[1.15em]">langsamer</span> wird.
            </>
          ) : (
            <>
              Where the air runs <span className="font-script text-sage-300 text-[1.15em]">clearer</span> and
              time runs <span className="font-script text-sage-300 text-[1.15em]">slower</span>.
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.95, ease: EASE }}
          className="mt-7 max-w-lg text-lg leading-relaxed text-cream-100/85"
        >
          {lang === "de"
            ? "Hotel Bergkristall — ein familiengeführtes Refugium hoch über dem Hochtal, mit Panorama-Spa, Gourmetküche und Zimmern, die nach Zirbenholz duften."
            : "Hotel Bergkristall — a family-run refuge high above the valley, with a panoramic spa, chef's cuisine and rooms that smell of Swiss pine."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.1, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <Magnetic>
            <a
              href="/zimmer-suiten"
              data-cursor="link"
              className="group inline-flex items-center gap-3 rounded-sm bg-cream-50 px-7 py-4 text-sm font-semibold text-ink-900 transition-colors duration-300 hover:bg-gold-300"
            >
              {lang === "de" ? "Zimmer & Suiten entdecken" : "Discover rooms & suites"}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
        </motion.div>

        <div className="mt-14 max-w-2xl">
          <BookingBar />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="relative h-16 w-px overflow-hidden bg-cream-50/20">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gold-300"
          />
        </span>
      </motion.div>
    </section>
  );
}
