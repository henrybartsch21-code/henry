import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — SiteCraft",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-32 lg:px-12">
      <h1 className="font-display text-3xl font-semibold text-bone-100">Impressum</h1>
      <p className="mt-6 text-sm leading-relaxed text-bone-400">
        Diese Seite ist ein Platzhalter für die gesetzlich vorgeschriebenen
        Angaben nach § 5 TMG (Unternehmensname, ladungsfähige Anschrift,
        Vertretungsberechtigte, Handelsregister, USt-IdNr., Kontaktdaten).
        Vor dem Live-Gang muss dieser Inhalt durch die realen Angaben des
        Unternehmens ersetzt werden.
      </p>
      <Link href="/" className="mt-10 inline-block text-sm text-ember-400 hover:text-ember-300">
        ← Zurück zur Startseite
      </Link>
    </main>
  );
}
