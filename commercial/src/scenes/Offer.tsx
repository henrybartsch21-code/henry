import React from "react";
import { AbsoluteFill } from "remotion";
import { Flare, GLOW, ICE } from "../components/Light";
import { Spread } from "../components/Type";
import { E, kf, mix, ramp, rnd, useT } from "../lib/motion";
import { T } from "../timeline";

const N = 170;

/** 5 — Das Angebot: „Dein erster Entwurf." → „100 % kostenlos." mit Lichtimpuls und Funkenflug. */
export const Offer: React.FC = () => {
  const t = useT();
  const s = T.offer;
  const lift = ramp(t, s.free - 0.4, s.free + 0.05, E.inOut);
  const hit = ramp(t, s.free, s.free + 0.55, E.out);
  const tau = t - s.free;
  const out = ramp(t, s.out, s.out + 0.24, E.in);
  // Kamera-Ruck auf dem Impact
  const shake = Math.exp(-Math.max(0, tau) * 9) * (tau >= 0 ? 1 : 0);
  const sx = Math.sin(t * 91) * 16 * shake;
  const sy = Math.cos(t * 77) * 22 * shake;

  return (
    <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px) scale(${1 + ramp(t, s.in, s.out, E.linear) * 0.06})`, opacity: 1 - out }}>
      <Flare x={540} y={1010} power={kf(t, [[s.free - 0.02, 0], [s.free + 0.1, 1.6, E.out], [s.free + 1.2, 0.55, E.soft], [s.out, 0.4, E.linear]])} streak={kf(t, [[s.free, 0.2], [s.free + 0.4, 1.3, E.out]])} />

      {/* Funkenflug — Gischt aus Licht */}
      {tau > 0 && tau < 2.2
        ? Array.from({ length: N }).map((_, i) => {
            const a = rnd(i) * Math.PI * 2;
            const sp = 500 + rnd(i + 0.3) * 2100;
            const k = (1 - Math.exp(-tau * (2.2 + rnd(i + 0.7) * 2))) / 2.6;
            const x = 540 + Math.cos(a) * sp * k * 1.15;
            const y = 1010 + Math.sin(a) * sp * k * 0.8 + tau * tau * 130 * rnd(i + 0.9);
            const size = 2.5 + rnd(i + 0.5) * 7;
            const life = 0.8 + rnd(i + 0.2) * 1.3;
            const o = Math.max(0, 1 - tau / life) * (0.5 + 0.5 * Math.sin(tau * 30 + i));
            return <div key={i} style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: size, backgroundColor: i % 3 ? "#fff" : ICE, opacity: o,  }} />;
          })
        : null}

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", color: "#fff", transform: `scaleX(${1 + out * 4})`, filter: out > 0.02 ? `blur(${out * 36}px)` : undefined }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 100, fontWeight: 600, textShadow: GLOW, transform: `translateY(${mix(190, 0, lift)}px) scale(${mix(1, 0.6, lift)})`, opacity: mix(1, 0.7, lift) }}>
            <Spread at={s.title} dur={0.9}>Dein erster Entwurf.</Spread>
          </div>
          <div style={{ marginTop: 26, textAlign: "center", opacity: ramp(t, s.free, s.free + 0.08, E.linear), transform: `scale(${mix(1.9, 1, hit)})`, filter: hit < 0.98 ? `blur(${(1 - hit) * 22}px)` : undefined }}>
            <div style={{ fontSize: 156, lineHeight: 1, fontWeight: 260, letterSpacing: "-0.05em", textShadow: GLOW }}>100 %</div>
            <div style={{ fontSize: 210, lineHeight: 1.04, fontWeight: 740, letterSpacing: "-0.062em", textShadow: "0 0 30px rgba(130,175,255,0.85)" }}>kostenlos.</div>
          </div>
          <div style={{ marginTop: 50, fontSize: 50, fontWeight: 460, color: "#c5d6f7", textShadow: GLOW }}>
            <Spread at={s.sub} tracking={-0.025}>Erst sehen. Dann entscheiden.</Spread>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
