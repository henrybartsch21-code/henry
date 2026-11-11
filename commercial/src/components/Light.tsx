import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Volumetrische Lichtbänder — die visuelle Signatur des Spots.
 * Gerendert in Viertelauflösung und hochskaliert: butterweich und günstig.
 */
export const Ribbons: React.FC<{
  t: number;
  energy?: number;
  /** Variante der Komposition (0 = aufsteigend nach rechts, 1 = gespiegelt) */
  flip?: boolean;
  drift?: number;
}> = ({ t, energy = 1, flip = false, drift = 0 }) => {
  if (energy <= 0.005) return null;
  const s = (f: number, p: number, a: number) => Math.sin(t * f + p) * a;
  const ribbon = (o: number, ph: number) =>
    `M ${-60 + o} ${540} C ${90 + o + s(0.7, ph, 34)} ${400 + s(0.5, ph + 1, 26)}, ${10 + o + s(0.6, ph + 2, 30)} ${250 + s(0.8, ph, 22)}, ${150 + o + s(0.5, ph + 3, 22)} ${190} S ${290 + o + s(0.6, ph + 4, 26)} ${40 + s(0.7, ph, 20)}, ${350 + o} ${-70}`;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, energy), transform: `${flip ? "scaleX(-1) " : ""}translateY(${drift}px)` }}>
      <div style={{ width: 270, height: 480, transform: "scale(4)", transformOrigin: "0 0" }}>
        <svg width="270" height="480" viewBox="0 0 270 480" style={{ position: "absolute", filter: "blur(20px)" }}>
          <path d={ribbon(0, 0)} stroke="#1232ff" strokeWidth="96" fill="none" opacity="0.55" strokeLinecap="round" />
          <path d={ribbon(64, 1.7)} stroke="#0b1fb8" strokeWidth="70" fill="none" opacity="0.5" strokeLinecap="round" />
        </svg>
        <svg width="270" height="480" viewBox="0 0 270 480" style={{ position: "absolute", filter: "blur(9px)", mixBlendMode: "screen" }}>
          <path d={ribbon(10, 0)} stroke="#4f8dff" strokeWidth="38" fill="none" opacity="0.75" strokeLinecap="round" />
          <path d={ribbon(70, 1.7)} stroke="#3a6cf5" strokeWidth="22" fill="none" opacity="0.6" strokeLinecap="round" />
        </svg>
        <svg width="270" height="480" viewBox="0 0 270 480" style={{ position: "absolute", filter: "blur(3.5px)", mixBlendMode: "screen" }}>
          <path d={ribbon(24, 0)} stroke="#d9e8ff" strokeWidth="9" fill="none" opacity="0.8" strokeLinecap="round" />
          <path d={ribbon(80, 1.7)} stroke="#a9c8ff" strokeWidth="5" fill="none" opacity="0.6" strokeLinecap="round" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

/** Flutlicht-Flare: heller Kern, Halo und anamorphotischer Streifen. */
export const Flare: React.FC<{ x: number; y: number; power: number; streak?: number }> = ({ x, y, power, streak = 1 }) => {
  if (power <= 0.005) return null;
  const p = Math.min(1.6, power);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, mixBlendMode: "screen" }}>
      <div
        style={{
          position: "absolute",
          left: -700,
          top: -700,
          width: 1400,
          height: 1400,
          opacity: 0.55 * p,
          background: "radial-gradient(closest-side, rgba(120,165,255,0.5), rgba(40,80,255,0.16) 38%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -1100 * streak,
          top: -5,
          width: 2200 * streak,
          height: 10,
          opacity: 0.9 * p,
          filter: "blur(4px)",
          background: "linear-gradient(90deg, rgba(90,140,255,0), rgba(190,215,255,0.9) 40%, #fff 50%, rgba(190,215,255,0.9) 60%, rgba(90,140,255,0))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -90 * p,
          top: -90 * p,
          width: 180 * p,
          height: 180 * p,
          background: "radial-gradient(closest-side, #fff, rgba(200,222,255,0.85) 22%, rgba(120,165,255,0.25) 55%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
};

export const GLOW = "0 0 22px rgba(150,190,255,0.55), 0 0 70px rgba(70,120,255,0.45)";
export const GLOW_SOFT = "0 0 18px rgba(150,190,255,0.35), 0 0 60px rgba(70,120,255,0.25)";
export const ICE = "#8fbcff";
