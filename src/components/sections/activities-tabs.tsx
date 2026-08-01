"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { Photo } from "@/components/ui/media-placeholder";
import { winterActivities, summerActivities } from "@/lib/hotel-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ActivitiesTabs() {
  const [season, setSeason] = useState<"winter" | "sommer">("winter");
  const items = season === "winter" ? winterActivities : summerActivities;

  return (
    <section className="relative bg-cream-50 py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-600">
                Aktivitäten
              </p>
              <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
                Der Berg hat zu jeder Jahreszeit etwas zu sagen.
              </h2>
            </div>
            <div className="inline-flex rounded-sm border border-line-300 p-1">
              <button
                onClick={() => setSeason("winter")}
                className={`rounded-sm px-5 py-2 text-sm font-medium uppercase tracking-[0.05em] transition-colors ${
                  season === "winter" ? "bg-pine-900 text-cream-50" : "text-ink-500"
                }`}
              >
                Winter
              </button>
              <button
                onClick={() => setSeason("sommer")}
                className={`rounded-sm px-5 py-2 text-sm font-medium uppercase tracking-[0.05em] transition-colors ${
                  season === "sommer" ? "bg-pine-900 text-cream-50" : "text-ink-500"
                }`}
              >
                Sommer
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Photo
            tone={season === "winter" ? "mist" : "gold"}
            label={season === "winter" ? "Skitour zur Rotwand" : "Almwanderung im Sommer"}
            ratio="aspect-[4/5]"
            className="rounded-sm"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={season}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="divide-y divide-line-200 border-y border-line-200"
            >
              {items.map((activity) => (
                <div key={activity.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                  <div className="flex-1 min-w-[220px]">
                    <h3 className="font-display text-lg text-ink-900">{activity.name}</h3>
                    <p className="mt-1 text-sm text-ink-500">{activity.description}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.06em] text-ink-400">{activity.duration}</span>
                  <span className="text-xs uppercase tracking-[0.06em] text-gold-600">{activity.level}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
