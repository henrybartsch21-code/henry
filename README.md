# SiteCraft — Website für Webentwicklung

Next.js/TypeScript/Tailwind-Website für SiteCraft, einen fiktiven Anbieter
für Webentwicklung und technische Website-Umsetzung. Die vollständige
Positionierungs- und Umsetzungsstrategie, Sitemap sowie Video-/Bild-
Produktionsbriefings stehen in
[`DESIGN-STRATEGY.md`](./DESIGN-STRATEGY.md).

## Stack

- **Next.js 16** (App Router, statisch exportierbare Seiten)
- **Tailwind CSS v4** (CSS-first Konfiguration, Design-Tokens in `src/app/globals.css`)
- **Framer Motion** für Scroll-Reveal-Animationen und magnetische Buttons
- **Lenis** für Smooth Scrolling
- **Fontsource** (`@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/inter`) — selbstgehostete Schriften, keine Drittanbieter-Requests

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
├─ app/                  Next.js App Router (Seiten, Layout, SEO/Sitemap/Robots)
├─ components/sections/  Die 11 Website-Sektionen (Hero, Services, FAQ, …)
├─ components/ui/        Wiederverwendbare Motion-/Interaktions-Bausteine
└─ lib/                  Utilities
```

## Bekannte Platzhalter

- `#work`-Case-Studies, Testimonials, Kundenlogos und Kennzahlen sind
  redaktionell erstellte Beispielinhalte für einen fiktiven Anbieter — vor
  einem echten Launch durch reale Kundendaten ersetzen.
- `/impressum` und `/datenschutz` enthalten Hinweistexte statt echter
  rechtlicher Angaben (siehe Seiteninhalt).
- Kontakt-E-Mail/-Telefon/-Adresse im Footer und in der CTA-Sektion sind
  Platzhalter.
