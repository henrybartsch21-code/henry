"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { CurtainReveal } from "@/components/ui/curtain-reveal";
import { Photo } from "@/components/ui/media-placeholder";
import { rooms } from "@/lib/hotel-data";
import { useLanguage } from "@/lib/i18n";

export function RoomsTeaser() {
  const { t } = useLanguage();

  return (
    <section id="zimmer" className="relative bg-cream-50 py-28 lg:py-40">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-600">
                Zimmer & Suiten
              </p>
              <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
                Vier Rückzugsorte, ein gemeinsamer Blick zum Gipfel.
              </h2>
            </div>
            <Link
              href="/zimmer-suiten"
              data-cursor="link"
              className="text-sm font-medium text-ink-500 underline decoration-line-300 underline-offset-8 transition-colors duration-300 hover:text-ink-900 hover:decoration-gold-500"
            >
              {t("common", "viewAll")}
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room, i) => (
            <Link key={room.slug} href={`/zimmer-suiten#${room.slug}`} data-cursor="link" className="group block">
              <CurtainReveal delay={i * 0.08} className="rounded-sm">
                <Photo tone={room.tone} label={room.name} ratio="aspect-[3/4]" className="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              </CurtainReveal>
              <div className="mt-4">
                <h3 className="font-display text-lg text-ink-900">{room.name}</h3>
                <p className="mt-1 text-sm text-ink-500">{room.size} · {room.guests}</p>
                <p className="mt-2 text-sm text-gold-600">
                  {t("common", "from")} €{room.price} <span className="text-ink-400">/ {t("common", "perNight")}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
