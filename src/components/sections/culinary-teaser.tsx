"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { CurtainReveal } from "@/components/ui/curtain-reveal";
import { Photo } from "@/components/ui/media-placeholder";
import { Magnetic } from "@/components/ui/magnetic";

export function CulinaryTeaser() {
  return (
    <section id="kulinarik" className="relative bg-cream-100 py-28 lg:py-40">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-24">
          <CurtainReveal direction="right" className="order-2 rounded-sm lg:order-1">
            <Photo tone="stone" label="Gewölbekeller-Restaurant" ratio="aspect-[4/5]" className="rounded-sm" />
          </CurtainReveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-600">
                Kulinarik
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
                Der Gewölbekeller erzählt vom Tal, nicht vom Trend.
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-500">
                Unser Küchenchef kocht mit dem, was das Tal hergibt — Wild aus
                dem eigenen Revier, Kräuter aus dem Klostergarten, Käse vom
                Senner nebenan. Zwei Restaurants, eine Haltung.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-ink-400">Gewölbekeller</dt>
                  <dd className="mt-1 text-sm text-ink-700">Feine, regionale Küche, 5-Gänge-Menü</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-ink-400">Sonnenterrasse</dt>
                  <dd className="mt-1 text-sm text-ink-700">Almfrühstück & leichte Alpenküche</dd>
                </div>
              </dl>

              <Magnetic className="mt-10 block">
                <Link
                  href="/kulinarik"
                  data-cursor="link"
                  className="group inline-flex items-center gap-3 rounded-sm bg-ink-900 px-6 py-3.5 text-sm font-medium uppercase tracking-[0.05em] text-cream-50 transition-colors duration-300 hover:bg-gold-600"
                >
                  Restaurants entdecken
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
