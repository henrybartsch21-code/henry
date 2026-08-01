"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";

export function FacilityGrid({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: { name: string; description: string }[];
}) {
  return (
    <section className="relative bg-cream-50 py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-600">
            {eyebrow}
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-500">{intro}</p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line-200 bg-line-200 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <motion.div key={item.name} variants={revealItem} className="bg-cream-50 p-7">
              <h3 className="font-display text-base text-ink-900">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.description}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
