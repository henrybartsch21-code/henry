"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/hotel-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  function go(dir: 1 | -1) {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }

  return (
    <section id="stimmen" className="relative bg-cream-100 py-28 lg:py-40">
      <div className="mx-auto max-w-[900px] px-6 text-center lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-600">
            Was Gäste sagen
          </p>
        </Reveal>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="mb-4 text-gold-500" aria-hidden="true">
                {"★".repeat(current.rating)}
              </div>
              <p className="font-display text-xl leading-[1.4] text-ink-900 lg:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="mt-8">
                <div className="text-sm font-semibold text-ink-900">{current.name}</div>
                <div className="text-xs text-ink-400">{current.origin}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            data-cursor="link"
            aria-label="Vorherige Bewertung"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-300 text-ink-500 transition-colors hover:border-gold-500 hover:text-gold-600"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setIndex(i)}
                aria-label={`Bewertung ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-gold-500" : "w-1.5 bg-line-300"}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            data-cursor="link"
            aria-label="Nächste Bewertung"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-300 text-ink-500 transition-colors hover:border-gold-500 hover:text-gold-600"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
