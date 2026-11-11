import React from "react";
import { AbsoluteFill } from "remotion";
import { Lines, Reveal } from "../components/Reveal";
import { FONT } from "../lib/fonts";
import { E, mix, ramp, useT } from "../lib/motion";
import { T } from "../timeline";

/** SZENE 1 — THE PROBLEM · „Deine Website entscheidet." / „In Sekunden." */
export const Scene1Problem: React.FC = () => {
  const t = useT();
  const s = T.s1;

  // Die Linie: erscheint als Punkt, dehnt sich aus, wird zur Kante des Reveals, zieht sich zurück.
  const lineIn = ramp(t, s.line, s.line + 0.75, E.inOut);
  const lineOut = ramp(t, s.titleOut - 0.1, s.titleOut + 0.25, E.inOut);
  const lineW = mix(6, 760, lineIn) * (1 - lineOut);
  const lineOpacity = ramp(t, s.line - 0.1, s.line + 0.25, E.linear) * (1 - ramp(t, s.titleOut + 0.1, s.titleOut + 0.25, E.linear));

  // Kamerafahrt nach vorn auf „Sekunden."
  const push = ramp(t, s.seconds, s.out + 0.3, E.linear);
  const exit = ramp(t, s.out, s.out + 0.34, E.in);
  const cam = 1 + push * 0.07 + exit * 2.4;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: "#fff" }}>
      {/* Aussage 1 */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", top: 960 - 250, width: "100%", textAlign: "center", fontSize: 132, lineHeight: 1.02, fontWeight: 620, letterSpacing: "-0.052em" }}>
          <Lines at={s.title} out={s.titleOut} lines={["Deine Website", "entscheidet."]} stagger={0.1} dur={1.0} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 960 + 66,
            height: 3,
            width: lineW,
            borderRadius: 2,
            backgroundColor: "#fff",
            opacity: lineOpacity,
            boxShadow: `0 0 ${24 * (1 - lineIn) + 6}px rgba(255,255,255,${0.5 * (1 - lineIn) + 0.12})`,
          }}
        />
      </AbsoluteFill>

      {/* Aussage 2 */}
      {t > s.seconds - 0.05 ? (
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${cam})`,
            opacity: 1 - ramp(t, s.out + 0.08, s.out + 0.3, E.linear),
            filter: exit > 0.02 ? `blur(${exit * 18}px)` : undefined,
          }}
        >
          <div style={{ textAlign: "center", marginTop: -40 }}>
            <Reveal at={s.seconds} dur={0.8} style={{ fontSize: 104, fontWeight: 400, letterSpacing: "-0.04em", color: "#8e8e8a", marginBottom: -8 }}>
              In
            </Reveal>
            <div style={{ transform: `scale(${1 + ramp(t, s.seconds + 0.1, s.out + 0.2, E.soft) * 0.085})`, transformOrigin: "50% 60%" }}>
              <Reveal at={s.seconds + 0.08} dur={0.9} style={{ fontSize: 186, lineHeight: 1.04, fontWeight: 650, letterSpacing: "-0.058em" }}>
                Sekunden.
              </Reveal>
            </div>
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
