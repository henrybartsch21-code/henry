import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ActivitiesTabs } from "@/components/sections/activities-tabs";
import { Gallery } from "@/components/sections/gallery";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Aktivitäten",
  description:
    "Skitouren, Nachtrodelbahn und Eisklettern im Winter, Almwanderungen, Klettersteig und E-Bike-Touren im Sommer — Aktivitäten direkt ab dem Hotel Bergkristall.",
};

export default function AktivitaetenPage() {
  return (
    <main>
      <PageHero
        eyebrow="Aktivitäten"
        title="Zwischen Firn und Alm — je nach Jahreszeit."
        subtitle="Ob Skitour im Morgengrauen oder Almwanderung am Abend: unser Guide-Team nimmt Sie mit, wohin die Karte allein nicht reicht."
        tone="pine"
        label="Skitour zur Rotwand"
      />
      <ActivitiesTabs />
      <Gallery />
      <CTASection />
    </main>
  );
}
