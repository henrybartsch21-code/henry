"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Photo } from "@/components/ui/media-placeholder";
import type { RoomTone } from "@/lib/hotel-data";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export type LightboxItem = { tone: RoomTone; label: string };

export function Lightbox({ items }: { items: LightboxItem[] }) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {items.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setIndex(i)}
            data-cursor="link"
            className="group relative overflow-hidden rounded-sm text-left"
            aria-label={`${item.label} vergrößern`}
          >
            <Photo tone={item.tone} label={item.label} ratio="aspect-square" className="transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
            <span className="absolute inset-0 bg-pine-950/0 transition-colors duration-500 group-hover:bg-pine-950/15" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-pine-950/95 p-6"
            onClick={() => setIndex(null)}
          >
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_PREMIUM }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Photo
                tone={items[index].tone}
                label={items[index].label}
                ratio="aspect-[4/3]"
                className="rounded-sm"
              />
              <p className="mt-4 text-center text-sm text-cream-100/80">{items[index].label}</p>
            </motion.div>

            <button
              onClick={() => setIndex(null)}
              className="absolute right-6 top-6 text-3xl font-light text-cream-50/80 hover:text-cream-50"
              aria-label="Schließen"
            >
              ×
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-light text-cream-50/70 hover:text-cream-50 md:left-8"
              aria-label="Vorheriges Bild"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i === null ? i : (i + 1) % items.length));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl font-light text-cream-50/70 hover:text-cream-50 md:right-8"
              aria-label="Nächstes Bild"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
