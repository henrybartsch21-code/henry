"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";

const STEPS = [
  {
    number: "01",
    title: "Analyse",
    description:
      "Anforderungsaufnahme, technische Bestandsaufnahme, Zieldefinition. Wir verstehen das Geschäft, bevor die erste Zeile Code entsteht.",
  },
  {
    number: "02",
    title: "Konzeption",
    description:
      "Seitenstruktur, Informationsarchitektur und Content-Aufbau werden festgelegt — die Grundlage, auf der jede technische Entscheidung aufbaut.",
  },
  {
    number: "03",
    title: "Umsetzung",
    description:
      "Entwicklung und Content-Integration laufen in wöchentlichen Zyklen. Sie sehen Fortschritt, nicht nur ein fertiges Ergebnis nach zwei Monaten.",
  },
  {
    number: "04",
    title: "Optimierung",
    description:
      "Nach der Veröffentlichung beginnt die eigentliche Arbeit: messen, nachziehen, Performance und Funktionalität kontinuierlich verbessern.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative bg-surface-50 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-600">
            Prozess
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink-900">
            Ein Ablauf, der Überraschungen ausschließt.
          </h2>
        </Reveal>

        <div className="relative mt-24">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-line-300 lg:block" />
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
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line-300 bg-surface-50 font-display text-sm font-semibold text-ember-600 lg:h-12 lg:w-12">
                  {step.number}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
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
