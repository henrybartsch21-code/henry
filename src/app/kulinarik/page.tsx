import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { FacilityGrid } from "@/components/sections/facility-grid";
import { PriceList } from "@/components/sections/price-list";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Kulinarik",
  description:
    "Gewölbekeller-Restaurant und Sonnenterrasse im Hotel Bergkristall: regionale Alpenküche aus dem eigenen Tal, dazu ein Weinkeller mit über 400 Positionen.",
};

const RESTAURANTS = [
  { name: "Gewölbekeller", description: "5-Gänge-Menü, 300 Jahre alte Natursteinmauern, 32 Plätze, täglich ab 19 Uhr." },
  { name: "Sonnenterrasse", description: "Almfrühstück und leichte Küche mit Panoramablick, 7–14 Uhr geöffnet." },
  { name: "Weinkeller", description: "Über 400 Positionen, Schwerpunkt auf österreichischen Kleinwinzern." },
  { name: "Alm-Jause am Nachmittag", description: "Hausgemachter Kuchen und Speck auf der Terrasse, 14–17 Uhr." },
];

const MENU = [
  { name: "Saiblingsfilet aus dem Hochtalbach", meta: "Hauptgang", price: "€38" },
  { name: "Wild aus dem eigenen Revier", meta: "Saisonal", price: "€44", description: "Je nach Jagdzeit, dazu Preiselbeer-Jus und Serviettenknödel." },
  { name: "Kürbis-Kartoffel-Suppe mit Bergkäse", meta: "Vorspeise", price: "€14" },
  { name: "Kaiserschmarrn mit Zwetschkenröster", meta: "Dessert / Hauptgang", price: "€18" },
  { name: "5-Gänge Verkostungsmenü", meta: "Gewölbekeller", price: "€98" },
];

export default function KulinarikPage() {
  return (
    <main>
      <PageHero
        eyebrow="Kulinarik"
        title="Der Gewölbekeller erzählt vom Tal, nicht vom Trend."
        subtitle="Zwei Restaurants, ein Küchenchef, eine Haltung: kochen mit dem, was das Tal in dieser Saison hergibt."
        tone="stone"
        label="Gewölbekeller-Restaurant"
      />
      <FacilityGrid
        eyebrow="Unsere Häuser"
        title="Vom Almfrühstück bis zum Fünf-Gänge-Menü"
        intro="Jeder Ort im Haus hat seinen eigenen Rhythmus — und seine eigene Karte."
        items={RESTAURANTS}
      />
      <PriceList eyebrow="Auszug aus der Karte" title="Was gerade Saison hat" items={MENU} />
      <CTASection />
    </main>
  );
}
