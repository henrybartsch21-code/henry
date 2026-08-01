"use client";

import { Reveal } from "@/components/ui/reveal";

export function PriceList({
  eyebrow,
  title,
  items,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  items: { name: string; meta: string; price: string; description?: string }[];
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <section className={`relative py-24 lg:py-32 ${isDark ? "bg-pine-900" : "bg-cream-100"}`}>
      <div className="mx-auto max-w-[900px] px-6 lg:px-12">
        <Reveal>
          <p className={`mb-4 text-[13px] font-medium uppercase tracking-[0.18em] ${isDark ? "text-gold-300" : "text-gold-600"}`}>
            {eyebrow}
          </p>
          <h2 className={`font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] ${isDark ? "text-cream-50" : "text-ink-900"}`}>
            {title}
          </h2>
        </Reveal>

        <div className={`mt-14 divide-y ${isDark ? "divide-cream-50/15 border-y border-cream-50/15" : "divide-line-200 border-y border-line-200"}`}>
          {items.map((item) => (
            <div key={item.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
              <div className="flex-1 min-w-[200px]">
                <h3 className={`font-display text-lg ${isDark ? "text-cream-50" : "text-ink-900"}`}>
                  {item.name}
                </h3>
                {item.description && (
                  <p className={`mt-1 text-sm ${isDark ? "text-cream-100/70" : "text-ink-500"}`}>
                    {item.description}
                  </p>
                )}
              </div>
              <span className={`text-xs uppercase tracking-[0.06em] ${isDark ? "text-cream-100/60" : "text-ink-400"}`}>
                {item.meta}
              </span>
              <span className={`font-display text-base ${isDark ? "text-gold-300" : "text-gold-600"}`}>
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
