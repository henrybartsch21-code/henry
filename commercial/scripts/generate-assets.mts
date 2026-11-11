/**
 * SWELLORA — Sound Design & Asset Generator
 *
 * Synthetisiert die komplette Tonspur (Musik + Sound-Effekte) prozedural —
 * 100 % eigene Sounds, keine Samples, keine Lizenzen. Alle Einsätze kommen
 * aus src/timeline.ts und sind damit framegenau mit der Animation synchron.
 *
 *   node scripts/generate-assets.mts
 *   → public/audio/soundtrack.wav (48 kHz, 16 Bit, Stereo)
 *   → public/grain.png            (Filmkorn-Kachel gegen Banding)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { crc32, deflateSync } from "node:zlib";
import { DURATION, T } from "../src/timeline.ts";

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
// Tonart: C-Dur / a-Moll, offene Voicings, Auflösung auf Asus2 (Markensignatur).
const chords: Chord[] = [
  { from: 0.2, to: 4.2, root: 33, notes: [45, 52, 57], open: 500, gain: 0.5 }, // A-Drone
  { from: 4.0, to: 7.1, root: 29, notes: [41, 48, 57, 64, 67], open: 900, gain: 0.8 }, // Fmaj9
  { from: 7.0, to: 9.1, root: 36, notes: [48, 55, 64, 71, 74], open: 1500, gain: 0.9 }, // Cmaj9
  { from: 9.0, to: 12.1, root: 33, notes: [45, 52, 60, 67, 71], open: 1500, gain: 0.9 }, // Am9
  { from: 12.0, to: 15.0, root: 29, notes: [41, 48, 57, 64, 67], open: 1700, gain: 0.9 }, // Fmaj9
  { from: 15.0, to: 16.9, root: 26, notes: [38, 45, 57], open: 380, gain: 0.55 }, // D-Drone (Spannung)
  { from: 16.8, to: 19.1, root: 29, notes: [41, 48, 57, 64, 67, 72], open: 1900, gain: 1.0 }, // Fmaj9 (Impact)
  { from: 19.0, to: 21.1, root: 31, notes: [43, 50, 59, 64, 69], open: 1700, gain: 0.9 }, // G6/9
  { from: 21.0, to: 23.1, root: 36, notes: [48, 55, 64, 71, 74], open: 2300, gain: 1.0 }, // Cmaj9
  { from: 23.0, to: 24.5, root: 33, notes: [45, 52, 60, 67, 71], open: 2300, gain: 1.0 }, // Am9
  { from: 24.45, to: 25.2, root: 29, notes: [41, 48, 57, 64, 67, 72], open: 2700, gain: 1.05 }, // Fmaj9
  { from: 25.15, to: 26.0, root: 31, notes: [43, 50, 59, 62, 69, 74], open: 3200, gain: 1.1 }, // Gsus
  { from: 26.5, to: 29.9, root: 33, notes: [45, 52, 59, 64, 69], open: 1600, gain: 0.85 }, // Asus2
];

// Pad: verstimmte Sägezähne, Tiefpass mit langsamem Öffnen, breites Stereo.
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
    const attack = c.from > 26 ? 1.4 : 0.7;
    const out = svf(
      raw,
      (i) => {
        const t = i / SR;
        return 180 + c.open * smooth(Math.min(1, t / (attack * 1.4))) * (0.85 + 0.15 * Math.sin(t * 1.3));
      },
      0.8,
      "lp",
    );
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      out[i] *= smooth(Math.min(1, t / attack)) * smooth(Math.min(1, Math.max(0, dur - t) / 0.9));
    }
    place(music, out, c.from, 0.05 * c.gain, side * 0.75, 0.6);
  }
}

// Rhythmus-Raster: 120 BPM. Abschnitte mit unterschiedlicher Dichte.
const BEAT = 0.5;
const sidechain = new Float64Array(N).fill(1);
const duckAt = (at: number, depth: number) => {
  const s = Math.round(at * SR);
  for (let i = 0; i < len(0.32); i++) {
    if (s + i >= N) break;
    const p = i / len(0.32);
    sidechain[s + i] = Math.min(sidechain[s + i], 1 - depth * (1 - smooth(p)));
  }
};

const inRange = (t: number, a: number, b: number) => t >= a - 1e-6 && t < b - 1e-6;
const drumGain = (t: number) =>
  inRange(t, 4, 5.5) ? 0.55 :
  inRange(t, 7.1, 9) ? 0.7 :
  inRange(t, 9, 14.75) ? 1 :
  inRange(t, 16.8, 21) ? 0.75 :
  inRange(t, 21, 25.95) ? 1.1 : 0;

for (let bar = 0; bar * 2 < DURATION; bar++) {
  const b0 = bar * 2;
  // Kick: 1 · 2-und · (3-und leise) — halbzeitig, ruhig
  for (const [off, g] of [[0, 1], [0.75, 0.7], [1.25, 0.5]] as const) {
    const t = b0 + off;
    const dg = drumGain(t);
    if (!dg) continue;
    place(music, kick(), t, 0.5 * g * dg, 0, 0.04);
    duckAt(t, 0.35 * g);
  }
  // Rim-Klick auf 2 und 4
  for (const off of [0.5, 1.5]) {
    const t = b0 + off;
    const dg = drumGain(t);
    if (!dg || t < 7.1) continue;
    place(music, click(1750, 0.05), t, 0.12 * dg, 0.15, 0.5, 0.15);
  }
  // Hats: Sechzehntel mit Akzentmuster
  for (let s = 0; s < 16; s++) {
    const t = b0 + s * 0.125;
    const dg = drumGain(t);
    if (!dg || t < 7.1 || (t >= 16.8 && t < 19)) continue;
    const accent = s % 4 === 2 ? 1 : s % 2 === 0 ? 0.45 : 0.22;
    place(music, hat(s % 4 === 2 ? 0.06 : 0.03), t, 0.035 * accent * dg, s % 2 ? 0.45 : -0.45, 0.1);
  }
}

// Sub-Bass folgt dem Grundton, pulsiert auf dem Kick-Muster.
for (const c of chords) {
  if (c.from < 4 || (c.from >= 15 && c.from < 16.8) || c.from >= 26) continue;
  for (let t = Math.ceil(c.from / BEAT - 1e-6) * BEAT; t < c.to - 0.15; t += BEAT) {
    const inBar = ((t % 2) + 2) % 2;
    const g = inBar < 0.01 ? 1 : Math.abs(inBar - 1) < 0.01 ? 0.75 : 0.5;
    if (inRange(t, 5.5, 7.05)) continue;
    const f = midi(c.root);
    const n = len(0.46);
    const o = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const tt = i / SR;
      const env = Math.min(1, tt / 0.012) * Math.exp(-tt * 5) * smooth(Math.min(1, (0.46 - tt) / 0.04));
      o[i] = Math.tanh((Math.sin(TAU * f * tt) + 0.3 * Math.sin(TAU * f * 2 * tt)) * 1.3) * env;
    }
    place(music, o, t + 0.01, 0.26 * g, 0);
  }
}

// Arpeggio: Achtel über Akkordtöne, Ping-Pong-Delay.
{
  const pattern = [0, 2, 1, 3, 2, 4, 1, 3];
  let step = 0;
  for (let t = 4; t < 26; t += 0.25) {
    step++;
    const c = chords.find((ch) => t >= ch.from - 1e-6 && t < ch.to - 0.12 && ch.from >= 4);
    if (!c || inRange(t, 5.5, 7.05) || inRange(t, 15, 16.8)) continue;
    const sparse = t < 9 || inRange(t, 16.8, 19);
    if (sparse && step % 2 === 0) continue;
    const tones = c.notes.slice(-4);
    let note = tones[pattern[step % 8] % tones.length] + 12;
    const lift = t >= 21;
    if (lift && step % 4 === 3) note += 12;
    const level = (sparse ? 0.05 : 0.065) * (lift ? 1.2 : 1) * (0.75 + 0.25 * ((step * 7) % 3) / 2);
    place(music, pluck(midi(note), 0.3, lift ? 1.3 : 0.8), t, level, step % 2 ? 0.5 : -0.5, 0.35, 0.5);
  }
}

// Sidechain + „Freeze": Die Musik hält an, wenn das Browserfenster einfriert.
for (let i = 0; i < N; i++) {
  const t = i / SR;
  let g = 0.55 + 0.45 * sidechain[i];
  if (t > T.s2.freeze - 0.02 && t < T.s2.settled) {
    g *= t < T.s2.shatter ? 0.05 : 0.05 + 0.95 * Math.pow((t - T.s2.shatter) / (T.s2.settled - T.s2.shatter), 3);
  }
  if (t > T.s6.in - 0.04 && t < T.s6.logo) g *= Math.max(0, 1 - (t - (T.s6.in - 0.04)) / 0.04); // harter Schnitt in die Stille
  music.l[i] *= g;
  music.r[i] *= g;
}

// ───────────────────────────── Sound-Effekte ─────────────────────────────

// SZENE 1 — Linie, Reveal, „In Sekunden."
place(sfx, swell(49, 1.5, 0.3), T.s1.line - 0.25, 0.5, 0, 0.1);
place(sfx, bell(midi(81), 1.2, 0.4), T.s1.line, 0.035, 0, 0.9);
place(sfx, whoosh(0.7, 500, 3200, 0.7), T.s1.title - 0.3, 0.16, 0, 0.3);
place(sfx, click(2600), T.s1.title, 0.22, 0, 0.35);
place(sfx, click(2900), T.s1.title + 0.09, 0.14, 0.1, 0.35);
place(sfx, whoosh(0.34, 900, 6500, 0.45), T.s1.titleOut, 0.3, -0.2, 0.25);
place(sfx, subHit(82, 41, 1.0, 0.07), T.s1.seconds, 0.6, 0, 0.08);
place(sfx, click(2200), T.s1.seconds, 0.24, 0, 0.4);
place(sfx, riser(1.1, 400, 3000), T.s1.out - 0.82, 0.2, 0, 0.3);
place(sfx, whoosh(0.5, 700, 5200, 0.6), T.s1.out - 0.05, 0.26, 0.2, 0.3);

// SZENE 2 — Browser, Freeze, Zerfall, Neuaufbau
place(sfx, click(1900, 0.04), T.s2.in + 0.12, 0.22, 0, 0.4);
place(sfx, subHit(64, 36, 0.9, 0.05), T.s2.freeze, 0.75, 0, 0.1);
place(sfx, click(1400, 0.05), T.s2.freeze, 0.3, 0, 0.5);
place(sfx, whoosh(0.7, 4200, 500, 0.25), T.s2.shatter, 0.3, -0.3, 0.35);
for (let i = 0; i < 9; i++) {
  place(sfx, click(1800 + rand() * 4200, 0.02), T.s2.shatter + 0.02 + i * 0.045 + rand() * 0.02, 0.07 + rand() * 0.06, rand() * 1.6 - 0.8, 0.5, 0.3);
}
place(sfx, whoosh(0.95, 350, 4800, 0.8, 1.8), T.s2.assemble - 0.05, 0.32, 0.3, 0.35);
for (let i = 0; i < 8; i++) {
  const t = T.s2.assemble + 0.4 + i * 0.055;
  place(sfx, click(2200 + i * 260, 0.02), t, 0.07, (i % 2 ? 1 : -1) * (0.2 + i * 0.07), 0.5, 0.25);
}
place(sfx, subHit(70, 43, 0.7, 0.05), T.s2.settled, 0.42, 0, 0.1);
place(sfx, bell(midi(76), 1.6, 0.6), T.s2.settled, 0.07, -0.25, 0.9, 0.3);
place(sfx, bell(midi(83), 1.6, 0.6), T.s2.settled + 0.06, 0.05, 0.25, 0.9, 0.3);
place(sfx, click(2500), T.s2.text, 0.18, 0, 0.4);
place(sfx, riser(0.95, 300, 4200), T.s2.out - 0.55, 0.3, 0, 0.35);
place(sfx, whoosh(0.8, 300, 6000, 0.6), T.s2.out, 0.36, 0, 0.35);

// SZENE 3 — Kamerafahrten zwischen den Websites, rhythmische Typo
place(sfx, subHit(78, 41, 0.9, 0.06), T.s3.in, 0.4, 0, 0.1);
for (const [t, dir] of [[T.s3.move1, 1], [T.s3.move2, 1]] as const) {
  const w = whoosh(1.0, 500, 2600, 0.5, 1.2);
  // Stereo-Fahrt: der Whoosh wandert mit der Kamera
  const half = Math.floor(w.length / 2);
  place(sfx, w.subarray(0, half), t - 0.05, 0.24, -0.6 * dir, 0.3);
  place(sfx, w.subarray(half), t - 0.05 + half / SR, 0.24, 0.6 * dir, 0.3);
}
for (const t of [T.s3.text1, T.s3.text2]) {
  place(sfx, click(2400), t, 0.2, 0, 0.4);
  place(sfx, bell(midi(88), 0.9, 0.5), t, 0.04, 0, 0.9, 0.4);
}
place(sfx, whoosh(0.4, 800, 5000, 0.4), T.s3.text1Out, 0.14, 0.2, 0.3);
place(sfx, whoosh(0.4, 800, 5000, 0.4), T.s3.text2Out, 0.14, -0.2, 0.3);
place(sfx, whoosh(0.75, 2800, 260, 0.3), T.s3.out, 0.34, 0, 0.4);

// SZENE 4 — Das Angebot. Ruhe, dann der kontrollierte Impact.
place(sfx, click(2300), T.s4.title, 0.2, 0, 0.5);
place(sfx, riser(T.s4.free - T.s4.riser, 250, 3600), T.s4.riser, 0.26, 0, 0.35);
place(sfx, subHit(92, 34, 2.0, 0.11, 0.003), T.s4.free, 0.95, 0, 0.12); // „100 % kostenlos."
{
  const thump = svf(whoosh(0.5, 900, 120, 0.04, 0.8), 600, 0.7, "lp");
  place(sfx, thump, T.s4.free, 0.7, 0, 0.3);
}
place(sfx, click(1500, 0.05), T.s4.free, 0.3, 0, 0.6);
place(sfx, bell(midi(69), 2.4, 0.5), T.s4.free + 0.02, 0.06, -0.3, 1);
place(sfx, bell(midi(76), 2.4, 0.5), T.s4.free + 0.02, 0.05, 0.3, 1);
place(sfx, click(2700), T.s4.sub, 0.14, 0, 0.45);
place(sfx, whoosh(0.5, 600, 3400, 0.6), T.s4.preview - 0.1, 0.16, 0, 0.3);
for (let i = 0; i < 8; i++) {
  place(sfx, click(1900 + i * 230, 0.02), T.s4.preview + 0.22 + i * 0.13, 0.085, (i % 2 ? 0.5 : -0.5), 0.5, 0.3);
}
place(sfx, bell(midi(81), 1.2, 0.5), T.s4.previewSettled, 0.05, 0, 0.9, 0.3);
place(sfx, riser(1.0, 350, 5200), T.s4.out - 0.7, 0.3, 0, 0.35);
place(sfx, whoosh(0.6, 400, 5600, 0.55), T.s4.out, 0.32, 0, 0.35);

// SZENE 5 — Detailaufnahmen (Whip-Moves) und Höhepunkt
place(sfx, subHit(84, 42, 0.9, 0.06), T.s5.in, 0.5, 0, 0.1);
T.s5.shots.forEach((t, i) => {
  const dir = i % 2 ? 1 : -1;
  place(sfx, whoosh(0.3, 900, 5200, 0.5, 1.6), t - 0.02, 0.22, dir * 0.55, 0.25);
  place(sfx, click(2300 + i * 150, 0.02), t + 0.27, 0.1, -dir * 0.3, 0.45);
});
for (const [t, g] of [[T.s5.text1, 0.6], [T.s5.text2, 0.8]] as const) {
  place(sfx, subHit(86, 40, 1.0, 0.07), t, g, 0, 0.1);
  place(sfx, click(2400), t, 0.2, 0, 0.45);
}
place(sfx, riser(T.s6.in - T.s5.text1 - 0.02, 300, 7000), T.s5.text1, 0.3, 0, 0.4);

// SZENE 6 — Lichtimpuls, Markensignatur, Abschluss
place(sfx, swell(55, 1.3, 0.35), T.s6.pulse - 0.15, 0.42, 0, 0.2);
place(sfx, whoosh(0.9, 1200, 5200, 0.4, 0.9), T.s6.pulse - 0.1, 0.07, 0, 0.6);
// Signatur: drei aufsteigende Quinten (A – E – H) → offener Asus2-Klang
[69, 76, 83].forEach((note, i) => {
  const t = T.s6.logo + i * 0.17;
  place(sfx, bell(midi(note), 2.6, 0.75), t, 0.15 - i * 0.02, [-0.35, 0.35, 0][i], 0.95, 0.25);
  place(sfx, bell(midi(note - 12), 2.0, 0.3), t, 0.05, 0, 0.6);
});
place(sfx, subHit(72, 55, 1.6, 0.08, 0.01), T.s6.logo, 0.4, 0, 0.12);
place(sfx, click(2600), T.s6.tagline, 0.1, 0, 0.5);
place(sfx, click(2600), T.s6.cta, 0.12, 0, 0.5);
place(sfx, click(1900, 0.04), T.s6.button, 0.24, 0, 0.5);
place(sfx, subHit(66, 55, 1.2, 0.06, 0.004), T.s6.button, 0.5, 0, 0.15);
place(sfx, bell(midi(93), 1.0, 0.4), T.s6.button + 0.01, 0.035, 0, 0.9);

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

// ───────────────────────────── Filmkorn-Kachel ─────────────────────────────
{
  const S = 256;
  const raw = Buffer.alloc(S * (S * 2 + 1));
  for (let y = 0; y < S; y++) {
    raw[y * (S * 2 + 1)] = 0;
    for (let x = 0; x < S; x++) {
      const v = rand();
      const o = y * (S * 2 + 1) + 1 + x * 2;
      raw[o] = v > 0.5 ? 255 : 0; // Grauwert
      raw[o + 1] = Math.round(Math.abs(v - 0.5) * 2 * 255); // Alpha
    }
  }
  const chunk = (type: string, data: Buffer) => {
    const body = Buffer.concat([Buffer.from(type), data]);
    const out = Buffer.alloc(body.length + 8);
    out.writeUInt32BE(data.length, 0);
    body.copy(out, 4);
    out.writeUInt32BE(crc32(body), body.length + 4);
    return out;
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(S, 0);
  ihdr.writeUInt32BE(S, 4);
  ihdr[8] = 8;
  ihdr[9] = 4; // Graustufen + Alpha
  writeFileSync(
    join(root, "public/grain.png"),
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk("IHDR", ihdr),
      chunk("IDAT", deflateSync(raw)),
      chunk("IEND", Buffer.alloc(0)),
    ]),
  );
}

console.log(`✓ soundtrack.wav (${DURATION}s, 48 kHz Stereo) · grain.png`);
