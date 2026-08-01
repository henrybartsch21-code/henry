import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { FacilityGrid } from "@/components/sections/facility-grid";
import { PriceList } from "@/components/sections/price-list";
import { Gallery } from "@/components/sections/gallery";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Wellness & Spa",
  description:
    "1.200 m² Panorama-Spa im Hotel Bergkristall: Infinity-Pool, Saunahaus im Wald, private Spa-Suiten und Behandlungen mit alpinen Kräutern.",
};

const FACILITIES = [
  { name: "Infinity-Pool", description: "32°C, beheizt, mit freiem Blick zur Gipfelkette — innen und außen verbunden." },
  { name: "Saunahaus im Wald", description: "Finnische Sauna, Bio-Kräutersauna und Dampfbad, 80 m abseits im Lärchenwald." },
  { name: "Private Spa-Suiten", description: "Zwei Suiten für Paare, mit eigener Wanne, Ruheliege und Kaminfeuer." },
  { name: "Ruheräume", description: "Vier Rückzugsräume mit Panoramafenstern, Tee-Lounge und Bibliothek." },
  { name: "Fitnessraum", description: "Freie Gewichte und Ausdauergeräte mit Blick zum Hochtal, 6–20 Uhr geöffnet." },
  { name: "Yoga-Deck", description: "Freiluft-Deck für Morgen-Yoga, Matten und Decken vor Ort." },
  { name: "Kräutergarten", description: "Eigener Anbau für die Behandlungen — auf Wunsch mit Führung durch unsere Kräuterfrau." },
  { name: "Kids Spa Hour", description: "Täglich 16–17 Uhr reserviert für kleine Gäste, danach wieder Ruhezone." },
];

const TREATMENTS = [
  { name: "Alpenkräuter-Ganzkörpermassage", meta: "80 Min.", price: "€145", description: "Mit Heublumen und Latschenkiefer aus dem eigenen Anbau." },
  { name: "Bergkristall-Gesichtsritual", meta: "60 Min.", price: "€120" },
  { name: "Heuwickel", meta: "45 Min.", price: "€85", description: "Traditionelle Wärmebehandlung mit Bergheu aus dem Hochtal." },
  { name: "Paar-Ritual in der Spa-Suite", meta: "90 Min.", price: "€320", description: "Massage zu zweit, anschließend Zeit in der privaten Wanne." },
  { name: "Sport-Tiefenmassage", meta: "50 Min.", price: "€110" },
  { name: "Kinder-Wellness (6–12 J.)", meta: "30 Min.", price: "€55" },
];

export default function WellnessPage() {
  return (
    <main>
      <PageHero
        eyebrow="Wellness & Spa"
        title="Baden zwischen Wolken und Gipfeln."
        subtitle="1.200 m² Panorama-Spa, das sich nach draußen öffnet — Pool, Saunalandschaft und Ruheräume, alle auf die Gipfelkette ausgerichtet."
        tone="gold"
        label="Infinity-Pool zur Gipfelkette"
      />
      <FacilityGrid
        eyebrow="Ausstattung"
        title="Ein Ort zum Verschwinden, nicht zum Programm abarbeiten."
        intro="Acht Räume, ein Gedanke: Ruhe braucht Weite, kein Prospekt voller Angebote."
        items={FACILITIES}
      />
      <PriceList eyebrow="Behandlungen" title="Rituale mit Kräutern aus dem eigenen Garten" items={TREATMENTS} tone="dark" />
      <Gallery />
      <CTASection />
    </main>
  );
}
