"use client";

import { Reveal } from "@/components/ui/reveal";
import { Lightbox } from "@/components/ui/lightbox";
import { galleryImages } from "@/lib/hotel-data";

export function Gallery() {
  return (
    <section id="galerie" className="relative bg-cream-50 py-28 lg:py-40">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-600">
            Impressionen
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
            Ein Bergsommer, ein Winter — zum Anklicken.
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-500">
            Zum Vergrößern anklicken.
          </p>
        </Reveal>

        <div className="mt-16">
          <Lightbox items={galleryImages} />
        </div>
      </div>
    </section>
  );
}
