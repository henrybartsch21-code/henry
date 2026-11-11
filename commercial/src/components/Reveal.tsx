import React from "react";
import { E, ramp, useT } from "../lib/motion";

type RevealProps = {
  /** Einsatz in Sekunden */
  at: number;
  /** optionaler Ausstieg in Sekunden */
  out?: number;
  dur?: number;
  outDur?: number;
  /** Richtung des Ausstiegs: nach oben (-1) oder unten (1) */
  outDir?: 1 | -1;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * Masked Text Reveal: Die Zeile fährt aus einer unsichtbaren Kante nach oben.
 * Beim Ausstieg beschleunigt sie mit vertikaler Bewegungsunschärfe aus der Maske.
 */
export const Reveal: React.FC<RevealProps> = ({ at, out, dur = 0.9, outDur = 0.32, outDir = -1, style, children }) => {
  const t = useT();
  const pin = ramp(t, at, at + dur, E.out);
  const pout = out === undefined ? 0 : ramp(t, out, out + outDur, E.in);
  const y = (1 - pin) * 108 + pout * 108 * outDir;
  // Geschwindigkeit → Unschärfe (nur während schneller Phasen)
  const speed = Math.abs(ramp(t + 1 / 120, at, at + dur, E.out) - ramp(t - 1 / 120, at, at + dur, E.out)) * 60;
  const blur = Math.min(10, speed * 1.4 + pout * 8);
  if (t < at - 0.02 || (out !== undefined && t > out + outDur + 0.02)) {
    return <span style={{ display: "block", visibility: "hidden", ...style }}>{children}</span>;
  }
  return (
    <span
      style={{
        display: "block",
        overflow: "hidden",
        padding: "0.1em 0.08em 0.18em",
        margin: "-0.1em -0.08em -0.18em",
        ...style,
      }}
    >
      <span
        style={{
          display: "block",
          transform: `translateY(${y}%)`,
          filter: blur > 0.3 ? `blur(${blur.toFixed(2)}px)` : undefined,
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </span>
  );
};

type LinesProps = Omit<RevealProps, "children"> & { lines: React.ReactNode[]; stagger?: number };

/** Mehrzeiliger Reveal mit Versatz. */
export const Lines: React.FC<LinesProps> = ({ lines, stagger = 0.09, at, out, ...rest }) => (
  <>
    {lines.map((line, i) => (
      <Reveal key={i} at={at + i * stagger} out={out === undefined ? undefined : out + i * 0.04} {...rest}>
        {line}
      </Reveal>
    ))}
  </>
);
