"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";
import { Photo } from "@/components/ui/media-placeholder";
import { offers } from "@/lib/hotel-data";
import { useLanguage } from "@/lib/i18n";

const TONES = ["pine", "gold", "stone"] as const;

export function OffersTeaser() {
  const { t } = useLanguage();

  return (
    <section id="angebote" className="relative bg-cream-50 py-28 lg:py-40">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-600">
                Angebote
              </p>
              <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
                Pauschalen für Momente, die man plant und trotzdem nicht vergisst.
              </h2>
            </div>
            <Link
              href="/angebote"
              data-cursor="link"
              className="text-sm font-medium text-ink-500 underline decoration-line-300 underline-offset-8 transition-colors duration-300 hover:text-ink-900 hover:decoration-gold-500"
            >
              {t("common", "viewAll")}
            </Link>
          </div>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <motion.div key={offer.slug} variants={revealItem}>
              <Link href={`/angebote#${offer.slug}`} data-cursor="link" className="group block">
                <div className="overflow-hidden rounded-sm">
                  <Photo
                    tone={TONES[i % TONES.length]}
                    label={offer.name}
                    ratio="aspect-[4/3]"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4">
                  <span className="text-xs uppercase tracking-[0.08em] text-gold-600">
                    {offer.season} · {offer.nights} Nächte
                  </span>
                  <h3 className="mt-2 font-display text-lg text-ink-900">{offer.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{offer.description}</p>
                  <p className="mt-3 text-sm text-ink-900">
                    {t("common", "from")} <span className="text-gold-600">€{offer.price}</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
