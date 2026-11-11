/**
 * Zentrale Timeline (Sekunden) — einzige Quelle der Wahrheit für Bild UND Ton.
 * Die Szenen lesen ihre Einsätze hier, der Sound-Generator (scripts/generate-assets.mts)
 * setzt jeden Klick, Whoosh und Impact auf exakt dieselben Zeitpunkte.
 */
export const FPS = 60;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 30;

export const T = {
  // SZENE 1 — THE PROBLEM
  s1: { line: 0.35, title: 0.95, titleOut: 2.25, seconds: 2.6, out: 3.72 },
  // SZENE 2 — THE DIFFERENCE
  s2: { in: 4.0, freeze: 5.5, shatter: 5.65, assemble: 6.25, settled: 7.1, text: 7.4, out: 8.62 },
  // SZENE 3 — THE SWELLORA EXPERIENCE
  s3: { in: 9.0, move1: 10.9, move2: 12.8, text1: 10.0, text1Out: 12.05, text2: 12.4, text2Out: 14.45, out: 14.7 },
  // SZENE 4 — THE OFFER
  s4: { title: 15.3, riser: 16.0, free: 16.8, sub: 17.9, preview: 18.8, previewSettled: 20.2, out: 20.7 },
  // SZENE 5 — THE EMOTIONAL PAYOFF
  s5: { in: 21.0, shots: [21.8, 22.35, 22.9, 23.45, 24.0], text1: 24.45, text2: 25.15, out: 25.72 },
  // SZENE 6 — THE FINAL REVEAL
  s6: { in: 26.0, pulse: 26.2, logo: 26.5, tagline: 27.5, cta: 28.1, button: 28.6 },
} as const;
