import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { OfferDetail } from "@/components/sections/offer-detail";
import { offers } from "@/lib/hotel-data";
import type { RoomTone } from "@/lib/hotel-data";

export const metadata: Metadata = {
  title: "Angebote",
  description:
    "Pauschalangebote im Hotel Bergkristall: Winterzauber in den Alpen, Almsommer Auszeit und Romantik Gipfelglück.",
};

const TONES: RoomTone[] = ["pine", "gold", "stone"];

export default function AngebotePage() {
  return (
    <main>
      <PageHero
        eyebrow="Angebote"
        title="Pauschalen für Momente, die man plant."
        subtitle="Drei Wege, das Hochtal kennenzulernen — jede Pauschale kuratiert von unserem Team, jederzeit auch individuell kombinierbar."
        tone="gold"
        label="Sonnenaufgang über dem Hochtal"
      />
      {offers.map((offer, i) => (
        <OfferDetail key={offer.slug} offer={offer} tone={TONES[i % TONES.length]} reverse={i % 2 === 1} />
      ))}
    </main>
  );
}
