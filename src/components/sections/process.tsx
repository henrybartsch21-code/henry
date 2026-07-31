"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";

const STEPS = [
  {
    number: "01",
    title: "Analyse",
    description:
      "Zielgruppen-Interviews, Wettbewerbs-Audit, technische Bestandsaufnahme. Wir verstehen das Geschäft, bevor wir ein Interface anfassen.",
  },
  {
    number: "02",
    title: "Strategie",
    description:
      "Positionierung, Informationsarchitektur und Content-Struktur werden festgelegt — die Grundlage, auf der jede Designentscheidung aufbaut.",
  },
  {
    number: "03",
    title: "Umsetzung",
    description:
      "Design und Entwicklung laufen parallel in wöchentlichen Zyklen. Sie sehen Fortschritt, nicht nur ein finales Reveal nach zwei Monaten.",
  },
  {
    number: "04",
    title: "Optimierung",
    description:
      "Nach Launch beginnt die eigentliche Arbeit: Daten auswerten, iterieren, Conversion kontinuierlich verbessern.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative bg-ink-950 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-400">
            Prozess
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-bone-100">
            Ein Ablauf, der Überraschungen ausschließt.
          </h2>
        </Reveal>

        <div className="relative mt-24">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink-700 lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-6 hidden h-px bg-ember-500 lg:block"
          />

          <RevealGroup className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step) => (
              <motion.div variants={revealItem} key={step.number} className="relative">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ink-700 bg-ink-950 font-display text-sm font-semibold text-ember-400 lg:h-12 lg:w-12">
                  {step.number}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-bone-100">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-bone-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
