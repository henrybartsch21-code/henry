# Medien-Guide — Platzhalter ersetzen

Diese Seite wurde ohne Zugriff auf externe Bild-/Video-Dienste gebaut. Jede
Foto- und Videofläche ist ein **generativer Platzhalter** (siehe
`src/components/ui/media-placeholder.tsx` und
`src/components/ui/mountain-scene.tsx`), keine echte Aufnahme. Diese Datei
listet jede Stelle auf, an der eigenes 4K-Material eingesetzt werden sollte,
inklusive empfohlenem Format.

## So ersetzt man einen Platzhalter

`<Photo tone="..." label="..." ratio="..." />` durch ein echtes Bild ersetzen,
z. B. mit `next/image`:

```tsx
<Image src="/media/zimmer/edelweiss-1.jpg" alt="Chalet-Suite Edelweiss" fill className="object-cover" />
```

Für Video-Flächen (aktuell `MountainScene`/CSS-Animation) ein `<video autoPlay muted loop playsInline poster="...">` mit `.mp4` (H.264) + `.webm`-Fallback einsetzen, `prefers-reduced-motion` respektieren (siehe bestehende Reduced-Motion-Guards in `mountain-scene.tsx`/`preloader.tsx`).

## Video

| Stelle | Datei | Empfehlung |
|---|---|---|
| Hero (Startseite) | `src/components/sections/hero.tsx` (`<MountainScene />`) | 4K-Loop, 15–30 s, Alpenpanorama bei Morgenlicht, Kamera-Dolly sehr langsam |

## Fotos — Zimmer & Suiten

| Raum | Format | Verwendet in |
|---|---|---|
| Chalet-Suite Edelweiss | Querformat 5:4, mind. 4K | Homepage-Teaser, `/zimmer-suiten` |
| Juniorsuite Latschenkiefer | Querformat 5:4 | `/zimmer-suiten` |
| Doppelzimmer Almrausch | Querformat 5:4 | `/zimmer-suiten` |
| Familienchalet Steinbock | Querformat 5:4 | `/zimmer-suiten` |

Datenquelle: `src/lib/hotel-data.ts` → `rooms`.

## Fotos — Wellness, Kulinarik, Angebote

- Infinity-Pool zur Gipfelkette (Wellness-Hero, Homepage-Teaser)
- Saunahaus am Waldrand (Wellness-Teaser)
- Gewölbekeller-Restaurant (Kulinarik-Hero, Homepage-Teaser)
- Je ein Bild pro Angebot: Winterzauber, Almsommer, Romantik Gipfelglück (`src/lib/hotel-data.ts` → `offers`)

## Galerie (8 Bilder, Lightbox)

Liste in `src/lib/hotel-data.ts` → `galleryImages`: Fassade, Pool, Restaurant,
Suite, Saunahaus, Skitour, Almwanderung, Sonnenterrasse. Quadratisches Format
(1:1) für die Grid-Ansicht.

## Seiten-Header (PageHero)

Jede Unterseite (`/zimmer-suiten`, `/wellness`, `/kulinarik`, `/aktivitaeten`,
`/angebote`, `/kontakt`) hat ein großformatiges Headerbild (16:9 oder breiter,
mind. 2560 px breit) — Komponente `src/components/ui/page-hero.tsx`.

## Aktivitäten

Ein Bild je Saison (Winter/Sommer) in `src/components/sections/activities-tabs.tsx`.

## Empfohlene technische Specs für echtes Material

- Fotos: mind. 3840×2160 px, JPEG/WebP komprimiert für Web (< 400 KB pro Bild empfohlen)
- Video: H.264 MP4 + WebM/AV1-Fallback, < 8 MB für 15–20 s Loop, stummgeschaltet, `playsinline`
- Alle Medien über `next/image` bzw. optimierte Video-Encodes einbinden, nicht die Rohdateien direkt aus einer Kamera
