# SVELORA — Motion Design Commercial

20-Sekunden-Werbespot für Instagram Reels, TikTok und YouTube Shorts.
Vollständig in Code animiert mit [Remotion](https://www.remotion.dev) (React + TypeScript).

| | |
|---|---|
| Format | 1080 × 1920 (9:16) |
| Framerate | 60 FPS, gerendert mit 180 FPS und zu echter Bewegungsunschärfe verrechnet |
| Länge | 20 s |
| Ton | 48 kHz Stereo, prozedural synthetisiert (keine Samples, keine Lizenzen) |
| Schrift | Inter Variable (lokal gebündelt, SIL Open Font License) |

## Rendern

```bash
cd commercial
npm install
npm run render        # Master mit Motion Blur → out/svelora-commercial.mp4
npm run render:fast   # schnelle Vorschau ohne Motion Blur
```

Benötigt `ffmpeg` im Pfad. `npm run studio` öffnet das Remotion Studio mit Timeline-Vorschau.

Remotion lädt beim ersten Render einen Headless-Browser. Soll ein vorhandener
Browser verwendet werden: `REMOTION_BROWSER=/pfad/zu/chrome npm run render`.

## Ablauf

1. **Licht & Marke** — Flutlicht zündet, SVELORA tritt aus den Lichtbändern
2. **Der Wunsch** — Prompt wird getippt: „Ich will eine Website, die Kunden gewinnt."
3. **Code-Rausch** — Speed-Ramp durch den Quelltext
4. **Die Website** — schwebende Glas-Karte, drei Designs im Flip
5. **Das Angebot** — „Dein erster Entwurf. 100 % kostenlos." mit Lichtimpuls und Funkenflug
6. **Call-to-Action** — Logo, „Jetzt kostenlosen Entwurf sichern", Klick auf „Jetzt anfragen"

## Aufbau

```
src/
  timeline.ts          Einsätze aller Szenen in Sekunden — gilt für Bild UND Ton
  Commercial.tsx       Komposition: Lichtbänder, Szenenfenster, Lichtblitze
  lib/motion.ts        Easing-Kurven, ramp(), Keyframes
  components/
    Light.tsx          Lichtbänder, Flare, Glow-Werte
    Type.tsx           Text-Reveal, Svelora-Zeichen, Mauszeiger
  scenes/              Open, Prompt, Code, Card, Offer, End
scripts/
  generate-assets.mts  Sound Design: Musik, Klicks, Whooshes, Impact, Markensignatur
  render.mjs           Master-Render (180 FPS → 60 FPS mit Motion Blur, Filmkorn, Ton)
```

## Anpassen

- **Timing:** `src/timeline.ts`. Bild und Ton lesen dieselben Werte.
- **Texte:** Prompt in `src/timeline.ts`, alles andere in der jeweiligen Szene.
- **Website-Designs:** Liste `designs` in `src/scenes/Card.tsx`.
- **Logo:** `Mark` in `src/components/Type.tsx` ist ein Platzhalter-Zeichen;
  dort das Original-Logo einsetzen.
- **Sound:** alle Klänge und Pegel stehen in `scripts/generate-assets.mts`.

Die gezeigten Marken (Nordlicht, Atelier Weiss, Kraftwerk) sind frei erfundene Beispielkunden.
