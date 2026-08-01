"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { Photo } from "@/components/ui/media-placeholder";
import { Magnetic } from "@/components/ui/magnetic";

const FEATURES = [
  "1.200 m² Panorama-Spa mit Infinity-Pool",
  "Finnische & Bio-Kräutersauna im Wald",
  "Private Spa-Suiten für Paare",
  "Behandlungen mit alpinen Kräutern aus eigenem Anbau",
];

export function WellnessTeaser() {
  return (
    <section id="wellness" className="relative overflow-hidden bg-pine-900 py-28 lg:py-40">
      <Photo tone="gold" label="Infinity-Pool zur Gipfelkette" ratio="" className="absolute inset-0 h-full w-full opacity-30" showTag={false} />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ x: ["-10%", "10%", "-10%"], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute h-64 w-64 rounded-full bg-cream-50/30 blur-[80px]"
          style={{ top: `${20 + i * 25}%`, left: `${10 + i * 30}%` }}
        />
      ))}

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-24">
          <Reveal>
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-300">
              Wellness & Spa
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-cream-50">
              Baden zwischen <span className="font-script text-sage-300 text-[1.2em]">Wolken</span> und Gipfeln.
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream-100/80">
              Unser Panorama-Spa öffnet sich zur Gipfelkette — drinnen wie
              draußen. Kein Ort für Programm, ein Ort zum Verschwinden.
            </p>

            <ul className="mt-8 space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-cream-100/85">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold-300" />
                  {f}
                </li>
              ))}
            </ul>

            <Magnetic className="mt-10 block">
              <Link
                href="/wellness"
                data-cursor="link"
                className="group inline-flex items-center gap-3 rounded-sm border border-gold-300 px-6 py-3.5 text-sm font-medium uppercase tracking-[0.05em] text-gold-300 transition-colors duration-300 hover:bg-gold-300 hover:text-pine-900"
              >
                Spa entdecken
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.15}>
            <Photo tone="mist" label="Saunahaus am Waldrand" ratio="aspect-[4/5]" className="rounded-sm" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
