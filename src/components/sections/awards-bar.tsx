"use client";

import { Reveal } from "@/components/ui/reveal";

const STATS = [
  ["1962", "Gegründet von Familie Brandner"],
  ["5★", "Superior — Relais Alpin"],
  ["9,6/10", "Gästebewertung, 1.240 Rezensionen"],
  ["62", "Zimmer, Suiten & Chalets"],
];

const PRESS = ["Condé Nast Traveller", "Falstaff", "Alpine Living Magazine", "Merian", "Travel + Leisure"];

export function AwardsBar() {
  return (
    <section className="relative border-y border-line-200 bg-cream-100 py-10">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <Reveal>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map(([value, label]) => (
              <div key={label}>
                <div className="font-display text-2xl text-ink-900 lg:text-3xl">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-500">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 overflow-hidden border-t border-line-200 pt-8">
          <div className="flex w-max animate-marquee gap-16">
            {[...PRESS, ...PRESS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap font-display text-lg text-ink-400"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
