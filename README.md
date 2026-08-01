# Hotel Bergkristall

Next.js/TypeScript/Tailwind-Website für **Bergkristall**, ein fiktives
5-Sterne-Alpenhotel im Salzburger Land. Gebaut nach dem Vorbild klassischer
Luxus-Alpenhotel-Websites: dunkles Tannengrün/Creme/Gold-Farbschema,
Vollbild-Hero, Zimmer-Galerie mit Lightbox, Wellness/Spa, Sprachumschalter
(DE/EN), Scroll-Reveal- & Bild-Vorhang-Animationen, saisonale Aktivitäten-Tabs.

## Warum ein fiktives Hotel?

Diese Website ist als eigenständiger Nachbau im Stil einer bestehenden
Referenzseite entstanden, nicht als 1:1-Kopie eines echten Betriebs — Name,
Adresse, Familiengeschichte, Zimmerkategorien, Preise und Texte sind frei
erfunden.

## Platzhalter-Medien — wichtig vor dem Launch

In dieser Umgebung ist kein Zugriff auf externe Bild-/Video-Hosts möglich.
Alle Fotos und das Hero-„Video" sind deshalb **generative Platzhalter**
(CSS/Canvas-Alpengrafiken in `src/components/ui/media-placeholder.tsx` und
`src/components/ui/mountain-scene.tsx`) — keine echten Aufnahmen. Eine
vollständige Liste aller Platzhalter-Stellen mit empfohlenem Bildformat
steht in [`MEDIA.md`](./MEDIA.md). Vor dem Live-Gang dort die eigenen 4K-Fotos
und -Videos einsetzen.

## Stack

- **Next.js 16** (App Router, mehrere Seiten statt Single-Page-Scroll)
- **Tailwind CSS v4** (CSS-first Konfiguration, Design-Tokens in `src/app/globals.css`)
- **Framer Motion** für Scroll-Reveal, Bild-Vorhang-Reveals und magnetische Buttons
- **Lenis** für Smooth Scrolling
- **Fontsource** (`@fontsource-variable/fraunces`, `@fontsource-variable/inter`) — selbstgehostete Schriften

## Entwicklung

```bash
npm install
npm run dev      # Entwicklungsserver auf http://localhost:3000
npm run lint      # ESLint
npm run build     # Produktions-Build
npm run start     # Produktions-Server
```

## Struktur

```
src/
├─ app/                  Next.js App Router — eine Route je Hauptseite
│  ├─ page.tsx            Startseite
│  ├─ zimmer-suiten/       Zimmer & Suiten
│  ├─ wellness/            Wellness & Spa
│  ├─ kulinarik/           Restaurants & Küche
│  ├─ aktivitaeten/        Sommer/Winter-Aktivitäten (Tabs)
│  ├─ angebote/            Pauschalangebote
│  ├─ kontakt/             Kontaktformular & Anfahrt
│  ├─ impressum/, datenschutz/  Rechtliche Platzhalterseiten
├─ components/sections/  Seiten-Abschnitte (Hero, Navigation, Footer, …)
├─ components/ui/        Wiederverwendbare Bausteine (Lightbox, Curtain-Reveal,
│                         Preloader, Booking-Bar, Mountain-Scene, …)
└─ lib/                  Hotel-Inhalte (Zimmer, Angebote, Aktivitäten) & i18n
```

## Sprachumschalter

Der DE/EN-Umschalter in der Navigation ist funktional (Client-seitiger
Kontext in `src/lib/i18n.tsx`) und deckt Navigation, Footer, Hero und die
Buchungsleiste ab. Die redaktionellen Fließtexte der Unterseiten sind aktuell
nur auf Deutsch verfasst — für eine vollständige zweisprachige Seite müssten
diese Texte nach demselben Muster ergänzt werden.

## Bekannte Platzhalter

- Alle Zimmer, Angebote, Bewertungen und Aktivitäten sind redaktionell
  erstellte Beispielinhalte — vor einem echten Launch durch reale Daten
  ersetzen.
- `/impressum` und `/datenschutz` enthalten Hinweistexte statt echter
  rechtlicher Angaben.
- Kontakt-E-Mail/-Telefon/-Adresse und das Buchungsformular sind
  Platzhalter ohne angebundenes Reservierungssystem.
