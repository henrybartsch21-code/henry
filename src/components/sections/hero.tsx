"use client";

import { motion } from "framer-motion";
import { MeshCanvas } from "@/components/ui/mesh-canvas";
import { Magnetic } from "@/components/ui/magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-surface-0 pt-28"
    >
      <MeshCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-0/10 via-transparent to-surface-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-surface-0 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="mb-8 flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.18em] text-ink-500"
        >
          <span className="h-px w-8 bg-ember-500" />
          Digitalagentur für Marken mit Anspruch
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="max-w-4xl text-[clamp(2.75rem,6.5vw,6rem)] font-semibold leading-[0.98] tracking-tight text-ink-900"
        >
          Es gibt einen Unterschied zwischen einer Website, die{" "}
          <span className="text-ink-400">existiert</span>, und einer, die{" "}
          <span className="text-ember-600 italic">verkauft</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink-500"
        >
          SiteCraft entwirft digitale Flaggschiffe für Unternehmen, deren
          Qualität online bisher nicht sichtbar war. Kein Template. Keine
          Abkürzung. Jedes Projekt ein Unikat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <Magnetic>
            <a
              href="#cta"
              data-cursor="link"
              className="group inline-flex items-center gap-3 rounded-full bg-ink-900 px-7 py-4 text-sm font-semibold text-surface-0 transition-colors duration-300 hover:bg-ember-600"
            >
              Projekt besprechen
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <a
            href="#work"
            data-cursor="link"
            className="text-sm font-medium text-ink-500 underline decoration-line-300 underline-offset-8 transition-colors duration-300 hover:text-ink-900 hover:decoration-ember-500"
          >
            Ausgewählte Arbeiten ansehen
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-24 grid max-w-2xl grid-cols-3 gap-8 border-t border-line-200 pt-8"
        >
          {[
            ["48", "Flaggschiff-Projekte"],
            ["8,4 J.", "Ø Zusammenarbeit"],
            ["12", "Design-Auszeichnungen"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="font-display text-2xl font-semibold text-ink-900 lg:text-3xl">
                {value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-400">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
          Scrollen
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-line-300">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-ember-500"
          />
        </span>
      </motion.div>
    </section>
  );
}
