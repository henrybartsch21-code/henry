import { Easing, useCurrentFrame, useVideoConfig } from "remotion";

export type Ease = (n: number) => number;

/** Kuratierte Easing-Kurven — wenige, dafür konsequent eingesetzt. */
export const E = {
  out: Easing.bezier(0.16, 1, 0.3, 1) as Ease, // expo out — Reveals
  soft: Easing.bezier(0.33, 1, 0.68, 1) as Ease, // cubic out — Drifts
  inOut: Easing.bezier(0.76, 0, 0.24, 1) as Ease, // quart in-out — Kamerafahrten
  smooth: Easing.bezier(0.65, 0, 0.35, 1) as Ease, // cubic in-out — Morphs
  in: Easing.bezier(0.7, 0, 0.84, 0) as Ease, // expo in — Exits
  linear: ((n: number) => n) as Ease,
};

export const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;

/** 0→1 zwischen a und b (Sekunden), geklemmt und geeased. */
export const ramp = (t: number, a: number, b: number, ease: Ease = E.out) =>
  ease(clamp((t - a) / (b - a)));

export type Key = [time: number, value: number, ease?: Ease];

/** Keyframe-Interpolation; das Easing eines Keys gilt für das Segment, das bei ihm ankommt. */
export const kf = (t: number, keys: Key[]): number => {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1, ease] = keys[i];
    if (t <= t1) {
      const [t0, v0] = keys[i - 1];
      return mix(v0, v1, (ease ?? E.inOut)(clamp((t - t0) / (t1 - t0))));
    }
  }
  return keys[keys.length - 1][1];
};

/** Aktuelle Zeit in Sekunden. */
export const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

/** Deterministischer Pseudo-Zufall (0..1). */
export const rnd = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
