# SWELLORA — Motion Design Commercial

30-Sekunden-Werbespot für Instagram Reels, TikTok und YouTube Shorts.
Vollständig in Code animiert mit [Remotion](https://www.remotion.dev) (React + TypeScript).

| | |
|---|---|
| Format | 1080 × 1920 (9:16) |
| Framerate | 60 FPS (1800 Frames) |
| Länge | 30 s |
| Ton | 48 kHz Stereo, prozedural synthetisiert (keine Samples, keine Lizenzen) |
| Schrift | Inter Variable (lokal gebündelt, SIL Open Font License) |

## Rendern

```bash
cd commercial
npm install
npm run render        # → out/swellora-commercial.mp4
```

`npm run studio` öffnet das Remotion Studio mit Timeline-Vorschau.
`npm run assets` erzeugt nur Tonspur und Filmkorn neu.

Remotion lädt beim ersten Render einen Headless-Browser. Soll ein vorhandener
Browser verwendet werden: `REMOTION_BROWSER=/pfad/zu/chrome npm run render`.

## Aufbau

```
src/
  timeline.ts            Einsätze aller Szenen in Sekunden — gilt für Bild UND Ton
  Commercial.tsx         Komposition: Szenenfenster, Filmkorn, Tonspur
  lib/motion.ts          Easing-Kurven, ramp(), Keyframes
  components/
    Reveal.tsx           Masked Text Reveal mit Bewegungsunschärfe
    Browser.tsx          Browserfenster
    MotionBlur.tsx       gerichtete Bewegungsunschärfe für Kamerafahrten
    art.tsx              Vektor-Stills (Uhr, Sideboard, Architektur …)
    sites.tsx            drei Website-Designs für Szene 3
    ShowcasePage.tsx     lange Hero-Website + Mobile-Ansicht (Szene 4/5)
  scenes/                Szene 1–6 gemäß Storyboard
scripts/
  generate-assets.mts    Sound Design: Musik, Klicks, Whooshes, Impact, Markensignatur
```

## Anpassen

- **Timing:** `src/timeline.ts`. Bild und Ton lesen dieselben Werte; nach einer
  Änderung bleibt alles synchron.
- **Texte:** direkt in der jeweiligen Szene unter `src/scenes/`.
- **Logo:** Szene 6 nutzt einen typografischen SWELLORA-Schriftzug als Platzhalter.
  Für das Original-Logo die Buchstaben-Spans in `Scene6Reveal.tsx` durch ein
  `<Img src={staticFile("logo.svg")} />` ersetzen.
- **Sound:** alle Klänge und Pegel stehen in `scripts/generate-assets.mts`.

Die gezeigten Marken (Brandt, Aurèle, Nordwerk, Studio Marén, Halden) sind
frei erfundene Beispielkunden.
