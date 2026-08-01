"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { Photo } from "@/components/ui/media-placeholder";

export function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-pine-900 py-32 lg:py-48">
      <Photo tone="pine" label="Sonnenterrasse zum Frühstück" ratio="" className="absolute inset-0 h-full w-full opacity-40" showTag={false} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/40 to-pine-950/10" />

      <div className="relative mx-auto max-w-[1000px] px-6 text-center lg:px-12">
        <Reveal>
          <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-300">
            Willkommen
          </p>
          <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] text-cream-50">
            Der Tisch am Fenster ist frei.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-cream-100/80">
            Schreiben Sie uns, rufen Sie an, oder prüfen Sie direkt die
            Verfügbarkeit — wir freuen uns, wenn Sie zu uns ins Hochtal finden.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Magnetic>
              <Link
                href="/kontakt"
                data-cursor="link"
                className="group inline-flex items-center gap-3 rounded-sm bg-cream-50 px-8 py-4 text-sm font-semibold text-ink-900 transition-colors duration-300 hover:bg-gold-300"
              >
                Anfrage senden
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Magnetic>
            <a
              href="tel:+43664000000"
              data-cursor="link"
              className="text-sm font-medium text-cream-100/80 underline decoration-cream-100/30 underline-offset-8 transition-colors duration-300 hover:text-cream-50 hover:decoration-gold-300"
            >
              +43 664 000 000
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
