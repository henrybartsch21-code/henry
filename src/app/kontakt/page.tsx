import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { FAQ } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie das Hotel Bergkristall in Hochwiesen, Salzburger Land — für Zimmeranfragen, Angebote oder allgemeine Fragen.",
};

export default function KontaktPage() {
  return (
    <main>
      <PageHero
        eyebrow="Kontakt"
        title="Wir freuen uns auf Ihre Anfrage."
        subtitle="Ob Zimmerreservierung, Pauschalangebot oder eine Frage zur Anreise — schreiben oder rufen Sie uns direkt an."
        tone="mist"
        label="Empfang im Abendlicht"
      />
      <ContactForm />
      <FAQ />
    </main>
  );
}
