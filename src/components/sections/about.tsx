"use client";

import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { CurtainReveal } from "@/components/ui/curtain-reveal";
import { Photo } from "@/components/ui/media-placeholder";

const PILLARS = [
  {
    title: "Handwerk",
    description:
      "Altholz aus dem eigenen Wald, von Tischlern aus dem Tal verarbeitet — kein Zimmer gleicht dem anderen.",
  },
  {
    title: "Herzlichkeit",
    description:
      "Dritte Generation am Empfang: Wir kennen unsere Stammgäste beim Namen, nicht bei der Zimmernummer.",
  },
  {
    title: "Weitblick",
    description:
      "Jedes Zimmer, jede Terrasse ist auf die Gipfelkette ausgerichtet — Aussicht ist bei uns kein Zufall.",
  },
  {
    title: "Nachhaltigkeit",
    description:
      "Eigene Quellwasserversorgung, Holz aus dem eigenen Forst, Küche nach Saison und Herkunft.",
  },
];

export function About() {
  return (
    <section id="philosophie" className="relative bg-cream-50 py-28 lg:py-40">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-600">
                Familie Brandner
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
                Drei Generationen, ein Versprechen: Gastfreundschaft, die nicht
                aufgesetzt wirkt.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-500">
                <p>
                  1962 hat mein Großvater ein kleines Gasthaus mit acht Betten
                  eröffnet, weil er fand, dass sein Tal zu schön ist, um es nur
                  für sich zu behalten. Aus dem Gasthaus wurde ein Haus mit 62
                  Zimmern — die Haltung ist geblieben.
                </p>
                <p>
                  Heute führt meine Familie das Bergkristall in dritter
                  Generation. Wir bauen keine Anlagen, wir pflegen ein Haus —
                  jeder Raum erzählt, wo er steht.
                </p>
              </div>
            </Reveal>

            <CurtainReveal delay={0.15} className="mt-10 rounded-sm">
              <Photo
                tone="mist"
                label="Fassade im Morgenlicht"
                ratio="aspect-[16/10]"
                className="rounded-sm border border-line-200"
              />
            </CurtainReveal>
          </div>

          <RevealGroup className="grid gap-px overflow-hidden rounded-sm border border-line-200 bg-line-200 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <motion.div
                variants={revealItem}
                key={pillar.title}
                className="bg-cream-50 p-8"
              >
                <h3 className="font-display text-lg text-ink-900">{pillar.title}</h3>
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
