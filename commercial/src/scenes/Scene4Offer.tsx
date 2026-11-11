import React from "react";
import { AbsoluteFill } from "remotion";
import { Reveal } from "../components/Reveal";
import { FONT } from "../lib/fonts";
import { E, kf, mix, ramp, useT } from "../lib/motion";
import { T } from "../timeline";

/** SZENE 4 — THE OFFER · „Dein erster Entwurf." → „100 % kostenlos." */
export const Scene4Offer: React.FC = () => {
  const t = useT();
  const s = T.s4;

  // Zeile 1 rückt nach oben und wird zur Überschrift des Angebots.
  const lift = ramp(t, s.free - 0.55, s.free + 0.15, E.inOut);
  // Der gesamte Block macht Platz für die Website-Vorschau.
  const dock = ramp(t, s.preview - 0.4, s.preview + 0.4, E.inOut);
  const exit = ramp(t, s.out, s.out + 0.3, E.in);

  // Impact: minimale Überskalierung, die präzise einrastet — keine Effekte, nur Timing.
  const punch = kf(t, [[s.free, 1.16], [s.free + 0.7, 1, E.out]]);
  const hair = ramp(t, s.free + 0.12, s.free + 0.95, E.out);

  const blockY = mix(0, -566, dock) - exit * 260;
  const blockScale = mix(1, 0.62, dock);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: "#fff", opacity: 1 - exit }}>
      {/* Lichtimpuls hinter „kostenlos." */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(70% 26% at 50% 50%, rgba(255,255,255,0.13), rgba(255,255,255,0) 70%)",
          opacity: kf(t, [[s.free - 0.05, 0], [s.free + 0.08, 1, E.out], [s.free + 1.6, 0.25, E.soft]]) * (1 - dock),
        }}
      />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", transform: `translateY(${blockY}px) scale(${blockScale})` }}>
        <div style={{ textAlign: "center", width: "100%" }}>
          <div
            style={{
              transform: `translateY(${mix(150, 0, lift)}px) scale(${mix(1, 0.62, lift)})`,
              color: `rgba(255,255,255,${mix(1, 0.55, lift)})`,
              fontSize: 100,
              fontWeight: 600,
              letterSpacing: "-0.048em",
            }}
          >
            <Reveal at={s.title}>Dein erster Entwurf.</Reveal>
          </div>

          <div style={{ marginTop: 34, transform: `scale(${punch})` }}>
            <Reveal at={s.free - 0.02} dur={0.55} style={{ fontSize: 150, lineHeight: 1, fontWeight: 250, letterSpacing: "-0.05em" }}>
              100 %
            </Reveal>
            <Reveal at={s.free} dur={0.6} style={{ fontSize: 204, lineHeight: 1.02, fontWeight: 720, letterSpacing: "-0.062em", marginTop: -6 }}>
              kostenlos.
            </Reveal>
          </div>

          <div style={{ height: 2, width: 820 * hair, margin: "40px auto 0", backgroundColor: "rgba(255,255,255,0.3)" }} />

          <div style={{ marginTop: 40, fontSize: 46, fontWeight: 420, letterSpacing: "-0.025em", color: "#a9a9a5" }}>
            <Reveal at={s.sub} dur={0.8}>
              Erst sehen. <span style={{ color: "#fff" }}>Dann entscheiden.</span>
            </Reveal>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
