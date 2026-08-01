"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { CurtainReveal } from "@/components/ui/curtain-reveal";
import { Photo } from "@/components/ui/media-placeholder";
import { Magnetic } from "@/components/ui/magnetic";
import type { Offer, RoomTone } from "@/lib/hotel-data";

export function OfferDetail({ offer, tone, reverse }: { offer: Offer; tone: RoomTone; reverse: boolean }) {
  return (
    <section id={offer.slug} className="border-t border-line-200 py-20 first:border-t-0 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className={`grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <CurtainReveal direction={reverse ? "right" : "left"} className="rounded-sm">
            <Photo tone={tone} label={offer.name} ratio="aspect-[5/4]" className="rounded-sm" />
          </CurtainReveal>

          <div>
            <Reveal>
              <span className="text-xs uppercase tracking-[0.1em] text-gold-600">
                {offer.season} · {offer.nights} Nächte
              </span>
              <h2 className="mt-3 font-display text-3xl text-ink-900 lg:text-4xl">{offer.name}</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-500">{offer.description}</p>

              <ul className="mt-8 space-y-2.5 border-y border-line-200 py-6">
                {offer.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <span className="font-display text-2xl text-ink-900">
                  ab €{offer.price}
                  <span className="ml-2 text-sm font-sans text-ink-400">pro Person</span>
                </span>
                <Magnetic>
                  <Link
                    href={`/kontakt?angebot=${offer.slug}`}
                    data-cursor="link"
                    className="inline-flex items-center gap-2 rounded-sm bg-pine-900 px-6 py-3 text-sm font-medium uppercase tracking-[0.05em] text-cream-50 transition-colors duration-300 hover:bg-gold-600"
                  >
                    Anfragen
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
