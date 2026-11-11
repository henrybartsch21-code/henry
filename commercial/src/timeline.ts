/**
 * Zentrale Timeline (Sekunden) — einzige Quelle der Wahrheit für Bild UND Ton.
 * Die Szenen lesen ihre Einsätze hier, der Sound-Generator (scripts/generate-assets.mts)
 * setzt jeden Klick, Whoosh und Impact auf exakt dieselben Zeitpunkte.
 */
export const FPS = 60;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 20;

/** Der getippte Prompt (zwei Zeilen). */
export const PROMPT = ["Ich will eine Website,", "die Kunden gewinnt."];

export const T = {
  // 1 — Licht & Marke
  open: { flare: 0.3, logo: 0.9, out: 2.25 },
  // 2 — Der Wunsch (Prompt wird getippt)
  prompt: { in: 2.35, typeStart: 2.65, typeEnd: 4.55, send: 5.0 },
  // 3 — Code-Rausch
  code: { in: 5.0, out: 6.25 },
  // 4 — Die Website entsteht, drei Designs im Flip
  card: { in: 6.2, settled: 7.1, text1: 7.25, flip1: 8.5, text2: 8.8, flip2: 9.5, out: 10.3 },
  // 5 — Das Angebot
  offer: { in: 10.5, title: 10.8, free: 12.0, sub: 13.1, out: 14.3 },
  // 6 — Marke & Call-to-Action
  end: { in: 14.5, logo: 14.7, tagline: 15.6, cta: 16.3, button: 16.9, click: 17.8 },
  /** Lichtblitze auf den Schnitten: [Zeit, Stärke] */
  flashes: [
    [2.3, 0.3],
    [5.0, 0.75],
    [6.25, 0.6],
    [8.5, 0.45],
    [9.5, 0.45],
    [10.5, 0.55],
    [12.0, 0.95],
    [14.5, 0.6],
    [17.8, 0.16],
  ],
} as const;

/** Zeitpunkt, zu dem das n-te Zeichen des Prompts erscheint. */
export const PROMPT_LEN = PROMPT.join("").length;
export const charTime = (n: number) =>
  T.prompt.typeStart + ((T.prompt.typeEnd - T.prompt.typeStart) * n) / PROMPT_LEN + (n >= PROMPT[0].length ? 0.16 : 0);
