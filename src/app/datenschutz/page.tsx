import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz — SiteCraft",
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-32 lg:px-12">
      <h1 className="font-display text-3xl font-semibold text-bone-100">Datenschutzerklärung</h1>
      <p className="mt-6 text-sm leading-relaxed text-bone-400">
        Diese Seite ist ein Platzhalter für die Datenschutzerklärung gemäß
        DSGVO (Verantwortlicher, Zwecke der Datenverarbeitung, eingesetzte
        Dienste/Cookies, Betroffenenrechte). Vor dem Live-Gang muss dieser
        Inhalt durch eine rechtsgeprüfte, unternehmensspezifische
        Datenschutzerklärung ersetzt werden.
      </p>
      <Link href="/" className="mt-10 inline-block text-sm text-ember-400 hover:text-ember-300">
        ← Zurück zur Startseite
      </Link>
    </main>
  );
}
