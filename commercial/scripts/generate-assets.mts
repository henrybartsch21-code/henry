/**
 * SVELORA — Sound Design & Asset Generator
 *
 * Synthetisiert die komplette Tonspur (Musik + Sound-Effekte) prozedural —
 * 100 % eigene Sounds, keine Samples, keine Lizenzen. Alle Einsätze kommen
 * aus src/timeline.ts und sind damit framegenau mit der Animation synchron.
 *
 *   node scripts/generate-assets.mts
 *   → public/audio/soundtrack.wav (48 kHz, 16 Bit, Stereo)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DURATION, PROMPT_LEN, T, charTime } from "../src/timeline.ts";

const SR = 48000;
const N = Math.floor(DURATION * SR);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// ───────────────────────────── Grundlagen ─────────────────────────────

let seed = 20261111;
const rand = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};
const noise = () => rand() * 2 - 1;
const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
const TAU = Math.PI * 2;

type Bus = { l: Float64Array; r: Float64Array };
const bus = (): Bus => ({ l: new Float64Array(N), r: new Float64Array(N) });

const music = bus(); // Musik (wird beim „Freeze" kurz angehalten)
const sfx = bus(); // Sound-Effekte
const rev = bus(); // Reverb-Send
const dly = bus(); // Delay-Send

/** Mono-Signal mit Equal-Power-Panning auf einen Bus mischen. */
const place = (
  dst: Bus,
  sig: Float64Array,
  at: number,
  gain = 1,
  pan = 0,
  sendRev = 0,
  sendDly = 0,
) => {
  const start = Math.round(at * SR);
  const a = ((pan + 1) * Math.PI) / 4;
  const gl = Math.cos(a) * gain;
  const gr = Math.sin(a) * gain;
  for (let i = 0; i < sig.length; i++) {
    const j = start + i;
    if (j < 0 || j >= N) continue;
    const s = sig[i];
    dst.l[j] += s * gl;
    dst.r[j] += s * gr;
    if (sendRev) {
      rev.l[j] += s * gl * sendRev;
      rev.r[j] += s * gr * sendRev;
    }
    if (sendDly) {
      dly.l[j] += s * gl * sendDly;
      dly.r[j] += s * gr * sendDly;
    }
  }
};

/** Zustandsvariabler Filter (TPT) — stabil bei modulierter Grenzfrequenz. */
const svf = (
  input: Float64Array,
  cutoff: number | ((i: number) => number),
  q: number,
  mode: "lp" | "bp" | "hp",
) => {
  const out = new Float64Array(input.length);
  let ic1 = 0;
  let ic2 = 0;
  const k = 1 / q;
  for (let i = 0; i < input.length; i++) {
    const fc = Math.min(typeof cutoff === "number" ? cutoff : cutoff(i), SR * 0.45);
    const g = Math.tan((Math.PI * fc) / SR);
    const a1 = 1 / (1 + g * (g + k));
    const a2 = g * a1;
    const a3 = g * a2;
    const v3 = input[i] - ic2;
    const v1 = a1 * ic1 + a2 * v3;
    const v2 = ic2 + a2 * ic1 + a3 * v3;
    ic1 = 2 * v1 - ic1;
    ic2 = 2 * v2 - ic2;
    out[i] = mode === "lp" ? v2 : mode === "bp" ? v1 : input[i] - k * v1 - v2;
  }
  return out;
};

const len = (sec: number) => Math.max(1, Math.floor(sec * SR));
const smooth = (x: number) => x * x * (3 - 2 * x);

// ───────────────────────────── Klangbausteine ─────────────────────────────

/** Sauberer UI-Klick: kurzer Sinus-Blip + minimaler Rausch-Transient. */
const click = (freq = 2400, dur = 0.03) => {
  const o = new Float64Array(len(dur));
  for (let i = 0; i < o.length; i++) {
    const t = i / SR;
    const env = Math.exp(-t * 220);
    o[i] = Math.sin(TAU * freq * t) * env + noise() * Math.exp(-t * 900) * 0.35;
  }
  return svf(o, 9000, 0.7, "lp");
};

/** Dezenter digitaler Whoosh: Rauschen durch wanderndes Bandpassfilter. */
const whoosh = (dur: number, f0: number, f1: number, peak = 0.5, q = 1.4) => {
  const n = len(dur);
  const src = new Float64Array(n);
  for (let i = 0; i < n; i++) src[i] = noise();
  const out = svf(src, (i) => f0 * Math.pow(f1 / f0, i / n), q, "bp");
  for (let i = 0; i < n; i++) {
    const p = i / n;
    const env = p < peak ? smooth(p / peak) : smooth((1 - p) / (1 - peak));
    out[i] *= env * env;
  }
  return out;
};

/** Tiefer, kontrollierter Impuls: Sinus mit Pitch-Drop. */
const subHit = (f0: number, f1: number, dur: number, drop = 0.08, attack = 0.004) => {
  const n = len(dur);
  const o = new Float64Array(n);
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = f1 + (f0 - f1) * Math.exp(-t / drop);
    ph += (TAU * f) / SR;
    const env = Math.min(1, t / attack) * Math.exp((-t * 4.2) / dur) * smooth(Math.min(1, (dur - t) / 0.05));
    o[i] = Math.tanh(Math.sin(ph) * 1.6) * env;
  }
  return o;
};

/** Weicher Schwell-Ton (für den ersten Impuls und den Lichtimpuls). */
const swell = (freq: number, dur: number, peak = 0.4) => {
  const n = len(dur);
  const o = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = i / n;
    const env = p < peak ? smooth(p / peak) : smooth((1 - p) / (1 - peak));
    o[i] = (Math.sin(TAU * freq * t) + 0.25 * Math.sin(TAU * freq * 2 * t)) * env * env;
  }
  return o;
};

/** Glasiger FM-Glockenton — Basis der Markensignatur und der „Settle"-Chimes. */
const bell = (freq: number, dur: number, bright = 1) => {
  const n = len(dur);
  const o = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.003) * Math.exp((-t * 5) / dur);
    const mod = Math.sin(TAU * freq * 3.01 * t) * bright * Math.exp(-t * 9);
    o[i] =
      (Math.sin(TAU * freq * t + mod) + 0.3 * Math.sin(TAU * freq * 2.0 * t) * Math.exp(-t * 6)) * env;
  }
  return o;
};

/** Pluck für das Arpeggio. */
const pluck = (freq: number, dur = 0.32, bright = 1) => {
  const n = len(dur);
  const o = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.002) * Math.exp(-t * (14 / (dur / 0.32)));
    const tri = (2 / Math.PI) * Math.asin(Math.sin(TAU * freq * t));
    o[i] = (Math.sin(TAU * freq * t) * 0.7 + tri * 0.3 * bright + Math.sin(TAU * freq * 2 * t) * 0.12 * bright) * env;
  }
  return o;
};

/** Cinematic Riser: Rauschen + Ton, beide steigend. */
const riser = (dur: number, f0 = 300, f1 = 5000) => {
  const n = len(dur);
  const src = new Float64Array(n);
  for (let i = 0; i < n; i++) src[i] = noise();
  const out = svf(src, (i) => f0 * Math.pow(f1 / f0, Math.pow(i / n, 1.6)), 2.2, "bp");
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const p = i / n;
    ph += (TAU * (110 * Math.pow(4, p * p))) / SR;
    const env = Math.pow(p, 2.2) * smooth(Math.min(1, (1 - p) / 0.02));
    out[i] = (out[i] * 0.9 + Math.sin(ph) * 0.18) * env;
  }
  return out;
};

/** Hi-Hat-Tick. */
const hat = (dur = 0.04) => {
  const n = len(dur);
  const src = new Float64Array(n);
  for (let i = 0; i < n; i++) src[i] = noise() * Math.exp((-i / SR) * (4 / dur));
  return svf(src, 8500, 1.2, "hp");
};

/** Weicher, runder Kick — bewusst kein EDM-Punch. */
const kick = () => subHit(120, 44, 0.34, 0.035, 0.002);

// ───────────────────────────── Musik ─────────────────────────────

type Chord = { from: number; to: number; root: number; notes: number[]; open: number; gain: number };
// a-Moll, offene Voicings; Auflösung auf Asus2 (Markensignatur).
const chords: Chord[] = [
  { from: 0.1, to: 2.5, root: 33, notes: [45, 52, 57, 64], open: 1100, gain: 0.8 }, // A-Drone
  { from: 2.4, to: 5.05, root: 29, notes: [41, 48, 57, 64], open: 600, gain: 0.6 }, // F (Spannung beim Tippen)
  { from: 5.0, to: 7.05, root: 33, notes: [45, 52, 60, 67, 71], open: 2000, gain: 1.0 }, // Am9
  { from: 7.0, to: 9.05, root: 29, notes: [41, 48, 57, 64, 67], open: 2300, gain: 1.0 }, // Fmaj9
  { from: 9.0, to: 10.5, root: 31, notes: [43, 50, 59, 64, 69], open: 2800, gain: 1.05 }, // G6/9
  { from: 10.5, to: 12.05, root: 26, notes: [38, 45, 57], open: 360, gain: 0.55 }, // D-Drone
  { from: 12.0, to: 13.3, root: 29, notes: [41, 48, 57, 64, 67, 72], open: 2800, gain: 1.15 }, // Fmaj9 (Impact)
  { from: 13.25, to: 14.5, root: 31, notes: [43, 50, 59, 62, 69, 74], open: 3300, gain: 1.15 }, // Gsus
  { from: 14.6, to: 19.8, root: 33, notes: [45, 52, 59, 64, 69], open: 1700, gain: 0.95 }, // Asus2
];

for (const c of chords) {
  const dur = c.to - c.from + 0.9;
  const n = len(dur);
  for (const side of [-1, 1]) {
    const raw = new Float64Array(n);
    for (const note of c.notes) {
      const f = midi(note) * Math.pow(2, (side * 5 + (note % 3) - 1) / 1200);
      const phase0 = rand();
      for (let i = 0; i < n; i++) {
        const ph = (phase0 + (f * i) / SR) % 1;
        raw[i] += (2 * ph - 1) * 0.5 + Math.sin(TAU * f * 0.5 * (i / SR)) * 0.2;
      }
    }
    const attack = c.from > 14 ? 1.2 : c.from < 1 ? 1.0 : 0.35;
    const out = svf(raw, (i) => {
      const t = i / SR;
      return 180 + c.open * smooth(Math.min(1, t / (attack * 1.4))) * (0.85 + 0.15 * Math.sin(t * 1.3));
    }, 0.8, "lp");
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      out[i] *= smooth(Math.min(1, t / attack)) * smooth(Math.min(1, Math.max(0, dur - t) / 0.9));
    }
    place(music, out, c.from, 0.05 * c.gain, side * 0.75, 0.6);
  }
}

// Rhythmus: 120 BPM, zwei treibende Abschnitte (Website-Teil und Angebot).
const sidechain = new Float64Array(N).fill(1);
const duckAt = (at: number, depth: number) => {
  const s = Math.round(at * SR);
  for (let i = 0; i < len(0.3); i++) {
    if (s + i >= N) break;
    sidechain[s + i] = Math.min(sidechain[s + i], 1 - depth * (1 - smooth(i / len(0.3))));
  }
};
const sections: [number, number, number][] = [
  [T.code.in, T.offer.in - 0.05, 1],
  [T.offer.free, T.end.in - 0.1, 1.15],
];
const drums = (t: number) => sections.find(([a, b]) => t >= a - 1e-6 && t < b);
for (const [a, b, g] of sections) {
  for (let bar = 0; a + bar * 2 < b; bar++) {
    const b0 = a + bar * 2;
    for (const [off, kg] of [[0, 1], [0.75, 0.7], [1.0, 0.9], [1.75, 0.55]] as const) {
      const t = b0 + off;
      if (t >= b) continue;
      place(music, kick(), t, 0.62 * kg * g, 0, 0.04);
      duckAt(t, 0.45 * kg);
    }
    for (const off of [0.5, 1.5]) {
      const t = b0 + off;
      if (t >= b) continue;
      place(music, click(1700, 0.06), t, 0.15 * g, 0.15, 0.55, 0.2);
      place(music, hat(0.09), t, 0.05 * g, -0.1, 0.4);
    }
    for (let s = 0; s < 16; s++) {
      const t = b0 + s * 0.125;
      if (t >= b) continue;
      const accent = s % 4 === 2 ? 1 : s % 2 === 0 ? 0.5 : 0.25;
      place(music, hat(s % 4 === 2 ? 0.06 : 0.03), t, 0.04 * accent * g, s % 2 ? 0.5 : -0.5, 0.1);
    }
  }
}

// Bass: pulsierende Achtel auf dem Grundton — der Antrieb des Spots.
for (let t = 0; t < DURATION; t += 0.25) {
  const sec = drums(t);
  const c = chords.find((ch) => t >= ch.from - 1e-6 && t < ch.to - 0.1);
  if (!sec || !c) continue;
  const step = Math.round((t - sec[0]) / 0.25);
  const g = step % 4 === 0 ? 1 : step % 2 === 0 ? 0.7 : 0.5;
  const f = midi(c.root + (step % 8 === 7 ? 12 : 0));
  const n = len(0.24);
  const o = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const tt = i / SR;
    const env = Math.min(1, tt / 0.008) * Math.exp(-tt * 7) * smooth(Math.min(1, (0.24 - tt) / 0.03));
    o[i] = Math.tanh((Math.sin(TAU * f * tt) + 0.4 * Math.sin(TAU * f * 2 * tt) + 0.15 * Math.sin(TAU * f * 3 * tt)) * 1.5) * env;
  }
  place(music, o, t + 0.008, 0.27 * g * sec[2], 0);
}

// Arpeggio mit Ping-Pong-Delay.
{
  const pattern = [0, 2, 1, 3, 2, 4, 1, 3];
  let step = 0;
  for (let t = T.code.in; t < T.end.in; t += 0.25) {
    step++;
    const c = chords.find((ch) => t >= ch.from - 1e-6 && t < ch.to - 0.12);
    if (!c || !drums(t)) continue;
    const tones = c.notes.slice(-4);
    let note = tones[pattern[step % 8] % tones.length] + 12;
    if (step % 4 === 3) note += 12;
    place(music, pluck(midi(note), 0.3, 1.2), t, 0.07 * (0.75 + (0.25 * ((step * 7) % 3)) / 2), step % 2 ? 0.5 : -0.5, 0.35, 0.5);
  }
}

for (let i = 0; i < N; i++) {
  const g = 0.5 + 0.5 * sidechain[i];
  music.l[i] *= g;
  music.r[i] *= g;
}

// ───────────────────────────── Sound-Effekte ─────────────────────────────

// 1 — Flutlicht zündet, Marke erscheint
place(sfx, riser(0.5, 500, 4500), 0, 0.14, 0, 0.4);
place(sfx, subHit(90, 38, 1.6, 0.1, 0.004), T.open.flare, 0.75, 0, 0.12);
place(sfx, whoosh(1.1, 5200, 700, 0.12, 0.9), T.open.flare, 0.16, 0, 0.6);
[69, 76, 83].forEach((note, i) => place(sfx, bell(midi(note), 2.2, 0.7), T.open.logo + i * 0.14, 0.11 - i * 0.02, [-0.35, 0.35, 0][i], 0.95, 0.25));
place(sfx, whoosh(0.5, 600, 6000, 0.6, 1.5), T.open.out - 0.12, 0.28, 0, 0.3);

// 2 — Prompt: jede Taste ein feiner Klick
place(sfx, click(1900, 0.04), T.prompt.in + 0.1, 0.16, 0, 0.4);
for (let i = 0; i < PROMPT_LEN; i++) {
  place(sfx, click(2500 + rand() * 1400, 0.014), charTime(i), 0.05 + rand() * 0.035, rand() * 0.8 - 0.4, 0.3);
}
place(sfx, riser(T.prompt.send - T.prompt.typeEnd + 0.25, 300, 5200), T.prompt.typeEnd - 0.25, 0.3, 0, 0.35);

// 3 — Senden: Impact, Code-Rausch
place(sfx, subHit(96, 36, 1.5, 0.09, 0.003), T.code.in, 0.95, 0, 0.12);
place(sfx, click(1500, 0.05), T.code.in, 0.32, 0, 0.5);
place(sfx, whoosh(0.5, 5000, 500, 0.1, 1.2), T.code.in, 0.3, -0.3, 0.3);
for (let i = 0; i < 22; i++) {
  place(sfx, click(2000 + rand() * 5000, 0.012), T.code.in + 0.1 + i * 0.045 + rand() * 0.02, 0.035 + rand() * 0.035, rand() * 1.6 - 0.8, 0.4, 0.2);
}
place(sfx, whoosh(0.55, 500, 7000, 0.75, 1.8), T.code.out - 0.42, 0.36, 0.3, 0.3);

// 4 — Karte landet, Flips
place(sfx, subHit(80, 42, 0.9, 0.06), T.card.in + 0.05, 0.5, 0, 0.1);
place(sfx, bell(midi(81), 1.4, 0.6), T.card.settled, 0.06, 0, 0.9, 0.3);
for (const [at, dir] of [[T.card.flip1, 1], [T.card.flip2, -1]] as const) {
  place(sfx, whoosh(0.5, 700, 6200, 0.5, 1.6), at - 0.26, 0.36, dir * 0.5, 0.3);
  place(sfx, subHit(84, 44, 0.6, 0.05), at, 0.4, 0, 0.1);
  place(sfx, click(2300, 0.03), at + 0.2, 0.14, -dir * 0.3, 0.5);
}
for (const at of [T.card.text1, T.card.text2]) place(sfx, bell(midi(88), 0.9, 0.5), at, 0.04, 0, 0.9, 0.4);
place(sfx, riser(0.7, 400, 7000), T.card.out - 0.45, 0.32, 0, 0.35);
place(sfx, whoosh(0.5, 3000, 250, 0.2), T.offer.in - 0.05, 0.3, 0, 0.5);

// 5 — Angebot: Ruhe, Riser, kontrollierter Impact
place(sfx, click(2300), T.offer.title, 0.16, 0, 0.6);
place(sfx, bell(midi(76), 1.6, 0.4), T.offer.title, 0.05, 0, 0.9);
place(sfx, riser(T.offer.free - T.offer.title - 0.1, 250, 6000), T.offer.title + 0.1, 0.34, 0, 0.4);
place(sfx, subHit(100, 33, 2.2, 0.12, 0.003), T.offer.free, 1.0, 0, 0.14);
place(sfx, svf(whoosh(0.6, 900, 110, 0.04, 0.8), 600, 0.7, "lp"), T.offer.free, 0.8, 0, 0.3);
place(sfx, click(1400, 0.06), T.offer.free, 0.36, 0, 0.6);
place(sfx, whoosh(1.4, 7000, 1500, 0.08, 0.8), T.offer.free, 0.12, 0, 0.7); // Funkenflug
place(sfx, bell(midi(69), 2.4, 0.5), T.offer.free + 0.02, 0.07, -0.3, 1);
place(sfx, bell(midi(76), 2.4, 0.5), T.offer.free + 0.02, 0.06, 0.3, 1);
place(sfx, click(2700), T.offer.sub, 0.12, 0, 0.5);
place(sfx, riser(0.6, 500, 7000), T.offer.out - 0.4, 0.3, 0, 0.35);

// 6 — Markensignatur und Klick
place(sfx, subHit(88, 55, 1.8, 0.09, 0.004), T.end.in, 0.7, 0, 0.14);
place(sfx, whoosh(1.2, 5200, 700, 0.1, 0.9), T.end.in, 0.14, 0, 0.6);
[69, 76, 83].forEach((note, i) => {
  const t = T.end.logo + i * 0.16;
  place(sfx, bell(midi(note), 2.8, 0.75), t, 0.15 - i * 0.02, [-0.35, 0.35, 0][i], 0.95, 0.25);
  place(sfx, bell(midi(note - 12), 2.0, 0.3), t, 0.05, 0, 0.6);
});
place(sfx, click(2600), T.end.tagline, 0.09, 0, 0.5);
place(sfx, click(2600), T.end.cta, 0.11, 0, 0.5);
place(sfx, click(2100, 0.03), T.end.button, 0.12, 0, 0.5);
place(sfx, click(1800, 0.045), T.end.click, 0.3, 0, 0.5);
place(sfx, subHit(70, 55, 1.3, 0.06, 0.004), T.end.click, 0.55, 0, 0.15);
place(sfx, bell(midi(93), 1.2, 0.4), T.end.click + 0.01, 0.045, 0, 0.9);

// ───────────────────────────── Raum: Delay + Reverb ─────────────────────────────

// Ping-Pong-Delay (punktierte Achtel)
{
  const d = Math.round(0.375 * SR);
  const fb = 0.38;
  const wetL = new Float64Array(N);
  const wetR = new Float64Array(N);
  let lpL = 0;
  let lpR = 0;
  for (let i = 0; i < N; i++) {
    const inL = dly.l[i] + dly.r[i];
    const tapL = i >= d ? wetR[i - d] : 0;
    const tapR = i >= d ? wetL[i - d] : 0;
    lpL += 0.35 * (inL * 0.5 + tapL * fb - lpL);
    lpR += 0.35 * (tapR * fb + (i >= d ? (dly.l[i - d] + dly.r[i - d]) * 0.25 : 0) - lpR);
    wetL[i] = lpL;
    wetR[i] = lpR;
  }
  for (let i = 0; i < N; i++) {
    music.l[i] += wetL[i] * 0.7;
    music.r[i] += wetR[i] * 0.7;
    rev.l[i] += wetL[i] * 0.25;
    rev.r[i] += wetR[i] * 0.25;
  }
}

// Freeverb-artiger Hall: 8 Kammfilter + 4 Allpässe je Kanal, leicht versetzt für Stereobreite.
const reverb = (input: Float64Array, spread: number) => {
  const scale = SR / 44100;
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((l) => Math.round((l + spread) * scale));
  const alls = [556, 441, 341, 225].map((l) => Math.round((l + spread) * scale));
  const feedback = 0.86;
  const damp = 0.28;
  const out = new Float64Array(N);
  for (const L of combs) {
    const buf = new Float64Array(L);
    let idx = 0;
    let store = 0;
    for (let i = 0; i < N; i++) {
      const y = buf[idx];
      store = y * (1 - damp) + store * damp;
      buf[idx] = input[i] * 0.03 + store * feedback;
      idx = idx + 1 === L ? 0 : idx + 1;
      out[i] += y;
    }
  }
  for (const L of alls) {
    const buf = new Float64Array(L);
    let idx = 0;
    for (let i = 0; i < N; i++) {
      const b = buf[idx];
      const x = out[i];
      out[i] = b - x;
      buf[idx] = x + b * 0.5;
      idx = idx + 1 === L ? 0 : idx + 1;
    }
  }
  return svf(out, 180, 0.7, "hp");
};
const wetL = reverb(rev.l, 0);
const wetR = reverb(rev.r, 23);

// ───────────────────────────── Master ─────────────────────────────

const outL = new Float64Array(N);
const outR = new Float64Array(N);
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const fade = Math.min(1, t / 0.02) * smooth(Math.min(1, (DURATION - t) / 0.35));
  const l = (music.l[i] + sfx.l[i] + wetL[i] * 0.9) * fade;
  const r = (music.r[i] + sfx.r[i] + wetR[i] * 0.9) * fade;
  // sanfte Sättigung als Limiter
  outL[i] = Math.tanh(l * 1.5);
  outR[i] = Math.tanh(r * 1.5);
  peak = Math.max(peak, Math.abs(outL[i]), Math.abs(outR[i]));
}
const norm = 0.89 / peak; // ≈ −1 dBFS

const pcm = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  // TPDF-Dither
  const d = () => (rand() - rand()) / 65536;
  pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, outL[i] * norm + d())) * 32767), i * 4);
  pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, outR[i] * norm + d())) * 32767), i * 4 + 2);
}
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + pcm.length, 4);
header.write("WAVEfmt ", 8);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(SR, 24);
header.writeUInt32LE(SR * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(pcm.length, 40);
mkdirSync(join(root, "public/audio"), { recursive: true });
writeFileSync(join(root, "public/audio/soundtrack.wav"), Buffer.concat([header, pcm]));

console.log(`✓ soundtrack.wav (${DURATION}s, 48 kHz Stereo)`);
