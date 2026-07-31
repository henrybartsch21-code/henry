"use client";

import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: "Markenidentität",
    description:
      "Positionierung, visuelle Sprache und Wortmarke — entwickelt aus dem, was ein Unternehmen tatsächlich einzigartig macht, nicht aus einem Moodboard.",
    points: ["Markenstrategie", "Visuelles System", "Verbal Identity"],
  },
  {
    number: "02",
    title: "Digitales Produktdesign",
    description:
      "UX-Research, Informationsarchitektur und Interface-Design für Websites und Web-Applikationen, die Besucher tatsächlich durch den Kaufprozess führen.",
    points: ["UX-Research", "Interface-Design", "Design-System"],
  },
  {
    number: "03",
    title: "Entwicklung & Performance",
    description:
      "Sauber entwickelte, extrem schnelle Frontends — barrierefrei, SEO-fundiert und so gebaut, dass sie in drei Jahren noch skalieren, nicht nur beim Launch.",
    points: ["Next.js / React", "Core-Web-Vitals", "CMS-Integration"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-ink-900 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-400">
            Leistungen
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-bone-100">
            Drei Disziplinen. Ein durchgängiges System.
          </h2>
        </Reveal>

        <RevealGroup className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-ink-700/60 bg-ink-700/60 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <motion.article
              variants={revealItem}
              key={service.number}
              className="group relative flex flex-col justify-between bg-ink-900 p-10 transition-colors duration-500 hover:bg-ink-800"
            >
              <div>
                <span className="font-display text-sm font-semibold text-ember-500">
                  {service.number}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-bone-100">
                  {service.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-bone-400">
                  {service.description}
                </p>
              </div>

              <ul className="mt-10 flex flex-wrap gap-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-full border border-ink-700 px-3 py-1 text-xs text-bone-600 transition-colors duration-500 group-hover:border-ember-500/40 group-hover:text-ember-300"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ember-500 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
