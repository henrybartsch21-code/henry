"use client";

import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";

const VISUALS = [
  {
    label: "Studio-Loft, Vormittagslicht",
    span: "lg:col-span-7",
    aspect: "aspect-[16/11]",
    gradient: "from-surface-200 via-surface-100 to-surface-50",
  },
  {
    label: "Material: Travertin, Kupfer, Leinen",
    span: "lg:col-span-5",
    aspect: "aspect-[4/5]",
    gradient: "from-ember-100 via-surface-100 to-surface-200",
  },
  {
    label: "Arbeitsmoment: Skizze neben Wireframe",
    span: "lg:col-span-5",
    aspect: "aspect-[4/5]",
    gradient: "from-surface-100 via-surface-50 to-surface-200",
  },
  {
    label: "Präsentationsraum, Detailbesprechung",
    span: "lg:col-span-7",
    aspect: "aspect-[16/11]",
    gradient: "from-surface-200 via-ember-100 to-surface-50",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-surface-0 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-600">
            Studio-Einblick
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink-900">
            Wo Entscheidungen wirklich getroffen werden.
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-500">
            Kein Stockfoto-Loft. Ein Arbeitsraum, in dem Materialproben,
            Wireframes und Kaffeeflecken nebeneinander liegen — weil gute
            Entscheidungen selten am aufgeräumten Schreibtisch entstehen.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {VISUALS.map((visual) => (
            <motion.figure
              variants={revealItem}
              key={visual.label}
              className={`group relative overflow-hidden rounded-2xl border border-line-200 ${visual.aspect} ${visual.span}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} transition-transform duration-700 ease-out group-hover:scale-105`}
              />
              <div className="absolute inset-0 opacity-[0.12] mix-blend-multiply [background-image:radial-gradient(circle_at_75%_25%,black,transparent_55%)]" />
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 p-5">
                <span className="text-xs uppercase tracking-[0.1em] text-ink-700/80">
                  {visual.label}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
