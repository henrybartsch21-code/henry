"use client";

import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";

const PILLARS = [
  {
    title: "Präzision",
    description:
      "Jedes Pixel, jeder Übergang, jeder Satz ist eine Entscheidung — keine Voreinstellung eines Frameworks.",
  },
  {
    title: "Beweisbarkeit",
    description:
      "Ergebnisse drücken wir in Zahlen aus, nicht in Adjektiven. Was wir behaupten, lässt sich nachmessen.",
  },
  {
    title: "Zurückhaltung",
    description:
      "Premium zeigt sich durch Ruhe und Klarheit — nicht durch visuellen Lärm oder Effekthascherei.",
  },
  {
    title: "Partnerschaft",
    description:
      "Wir liefern kein Projekt ab und verschwinden. Wir übernehmen mit Ihnen Verantwortung für das Ergebnis.",
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-ink-950 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-400">
                Das Studio
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-bone-100">
                Gegründet aus Frustration über Baukasten-Websites für Unternehmen, die es besser verdient hätten.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-bone-400">
                <p>
                  SiteCraft entstand, weil zu viele gute Unternehmen von
                  austauschbaren Websites vertreten wurden. Nicht aus
                  Geizigkeit — aus Unwissenheit darüber, dass es einen
                  Unterschied macht.
                </p>
                <p>
                  Heute arbeitet ein kleines, absichtlich kleines Team aus
                  Strategen, Designer:innen und Entwickler:innen an wenigen
                  Projekten gleichzeitig — nie mehr, als sich mit voller
                  Aufmerksamkeit betreuen lässt.
                </p>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-ink-700/60 bg-ink-700/60 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <motion.div
                variants={revealItem}
                key={pillar.title}
                className="bg-ink-900 p-8"
              >
                <h3 className="font-display text-lg font-semibold text-bone-100">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-400">
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
