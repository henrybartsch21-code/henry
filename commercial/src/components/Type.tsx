import React from "react";
import { E, mix, ramp, useT } from "../lib/motion";

/**
 * Text-Reveal im Stil des Spots: Buchstaben stehen weit auseinander und unscharf im Licht,
 * ziehen sich zusammen und werden scharf. Ausstieg als horizontaler Lichtschmier.
 */
export const Spread: React.FC<{
  at: number;
  out?: number;
  dur?: number;
  from?: number;
  tracking?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, out, dur = 0.8, from = 0.34, tracking = -0.045, style, children }) => {
  const t = useT();
  if (t < at - 0.02) return null;
  const p = ramp(t, at, at + dur, E.out);
  const o = out === undefined ? 0 : ramp(t, out, out + 0.26, E.in);
  if (o >= 1) return null;
  const blur = (1 - p) * 26 + o * 30;
  return (
    <div
      style={{
        whiteSpace: "nowrap",
        letterSpacing: `${mix(from, tracking, p)}em`,
        marginRight: `${mix(-from, 0, p)}em`,
        opacity: ramp(t, at, at + dur * 0.5, E.linear) * (1 - o),
        filter: blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : undefined,
        transform: `scale(${mix(1.12, 1, p) + o * 0.5}, ${1 - o * 0.5})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Das Swellora-Zeichen: eine Welle im Kreis. */
export const Mark: React.FC<{ size: number; draw?: number; style?: React.CSSProperties }> = ({ size, draw = 1, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 0 14px rgba(140,185,255,0.9)) drop-shadow(0 0 44px rgba(60,110,255,0.8))", ...style }}>
    <circle cx="50" cy="50" r="42" fill="none" stroke="#fff" strokeWidth="5" strokeDasharray={264} strokeDashoffset={264 * (1 - draw)} transform="rotate(-90 50 50)" strokeLinecap="round" />
    <path d="M24 57 C 34 33, 44 33, 50 50 S 66 67, 76 43" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeDasharray={70} strokeDashoffset={70 * (1 - draw)} />
  </svg>
);

/** Mauszeiger. */
export const Cursor: React.FC<{ x: number; y: number; press?: number; opacity?: number }> = ({ x, y, press = 0, opacity = 1 }) => (
  <svg width="64" height="64" viewBox="0 0 24 24" style={{ position: "absolute", left: x, top: y, opacity, transform: `scale(${1 - press * 0.18})`, transformOrigin: "20% 10%", filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.6))" }}>
    <path d="M5 2.5 L5 19 L9.4 15 L12.3 21.5 L15 20.3 L12.1 13.9 L18 13.6 Z" fill="#fff" stroke="#0a0a0a" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
