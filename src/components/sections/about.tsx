"use client";

import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";

const PILLARS = [
  {
    title: "Präzision",
    description:
      "Jede Komponente, jeder Übergang, jeder Wert ist eine Entscheidung — keine Voreinstellung eines Frameworks.",
  },
  {
    title: "Beweisbarkeit",
    description:
      "Ergebnisse drücken wir in Zahlen aus, nicht in Adjektiven. Was wir behaupten, lässt sich nachmessen.",
  },
  {
    title: "Wartbarkeit",
    description:
      "Sauberer, dokumentierter Code, der in drei Jahren noch erweiterbar ist — nicht nur am Launch-Tag.",
  },
  {
    title: "Partnerschaft",
    description:
      "Wir liefern kein Projekt ab und verschwinden. Wir übernehmen mit Ihnen Verantwortung für das Ergebnis.",
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-surface-50 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-600">
                Über uns
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink-900">
                Entstanden aus Frustration über Baukasten-Websites für Unternehmen, die es besser verdient hätten.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-500">
                <p>
                  SiteCraft entstand, weil zu viele gute Unternehmen von
                  technisch schwachen Websites vertreten wurden. Nicht aus
                  Geizigkeit — aus Unwissenheit darüber, dass es einen
                  Unterschied macht.
                </p>
                <p>
                  Heute arbeitet ein kleines, absichtlich kleines Team aus
                  Entwickler:innen an wenigen Projekten gleichzeitig — nie
                  mehr, als sich mit voller Aufmerksamkeit umsetzen und
                  betreuen lässt.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div
                aria-hidden="true"
                className="mt-10 flex aspect-[16/10] items-end overflow-hidden rounded-2xl border border-line-200 bg-gradient-to-br from-surface-100 via-surface-50 to-surface-200 p-6 shadow-[0_20px_45px_-25px_rgba(30,26,20,0.35)]"
              >
                <span className="text-xs uppercase tracking-[0.15em] text-ink-400">
                  Arbeitsplatz — Team am großen Fenster, Gegenlicht
                </span>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-line-200 bg-line-200 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <motion.div
                variants={revealItem}
                key={pillar.title}
                className="bg-surface-0 p-8"
              >
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
