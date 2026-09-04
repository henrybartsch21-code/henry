"use client";

import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";
import { motion } from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: "Technische Konzeption",
    description:
      "Anforderungsanalyse, Informationsarchitektur und technische Planung — bevor die erste Zeile Code entsteht, steht die Struktur der Website fest.",
    points: ["Anforderungsanalyse", "Seitenstruktur", "Technische Planung"],
  },
  {
    number: "02",
    title: "Website-Entwicklung",
    description:
      "Vorhandene Vorgaben, Inhalte und Branding werden in eine responsive, wartbare Website überführt — sauber implementiert statt aus dem Baukasten zusammengesetzt.",
    points: ["Next.js / React", "Responsive Umsetzung", "CMS-Integration"],
  },
  {
    number: "03",
    title: "Performance & Betrieb",
    description:
      "Extrem schnelle Frontends — barrierefrei, technisch SEO-fundiert und so gebaut, dass sie in drei Jahren noch skalieren, nicht nur beim Launch.",
    points: ["Core Web Vitals", "Technisches SEO", "Deployment"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-surface-0 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-600">
            Leistungen
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink-900">
            Drei Leistungsbereiche. Eine durchgängige Umsetzung.
          </h2>
        </Reveal>

        <RevealGroup className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line-200 bg-line-200 shadow-[0_1px_2px_rgba(30,26,20,0.04)] lg:grid-cols-3">
          {SERVICES.map((service) => (
            <motion.article
              variants={revealItem}
              key={service.number}
              className="group relative flex flex-col justify-between bg-surface-0 p-10 transition-colors duration-500 hover:bg-surface-50"
            >
              <div>
                <span className="font-display text-sm font-semibold text-ember-600">
                  {service.number}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink-900">
                  {service.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
                  {service.description}
                </p>
              </div>

              <ul className="mt-10 flex flex-wrap gap-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-full border border-line-300 px-3 py-1 text-xs text-ink-500 transition-colors duration-500 group-hover:border-ember-500/50 group-hover:text-ember-600"
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
