import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-32 lg:px-12">
      <h1 className="font-display text-3xl text-ink-900">Impressum</h1>
      <p className="mt-6 text-sm leading-relaxed text-ink-500">
        Diese Seite ist ein Platzhalter für die gesetzlich vorgeschriebenen
        Angaben nach § 5 ECG / § 25 Mediengesetz (Unternehmensname,
        ladungsfähige Anschrift, Vertretungsberechtigte, Firmenbuchnummer,
        UID-Nummer, Kontaktdaten, gewerberechtliche Angaben). Vor dem
        Live-Gang muss dieser Inhalt durch die realen Angaben des
        Unternehmens ersetzt werden.
      </p>
      <Link href="/" className="mt-10 inline-block text-sm text-gold-600 hover:text-gold-500">
        ← Zurück zur Startseite
      </Link>
    </main>
  );
}
