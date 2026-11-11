import React from "react";
import { AbsoluteFill } from "remotion";
import { Reveal } from "../components/Reveal";
import { FONT } from "../lib/fonts";
import { E, kf, mix, ramp, useT } from "../lib/motion";
import { T } from "../timeline";

const LETTERS = "SWELLORA".split("");

/** SZENE 6 — THE FINAL REVEAL · Lichtimpuls, Wortmarke, Call-to-Action. */
export const Scene6Reveal: React.FC = () => {
  const t = useT();
  const s = T.s6;
  if (t < s.in) return null;

  // Lichtimpuls: ein Punkt, der sich zu einer feinen horizontalen Lichtlinie öffnet.
  const pulse = kf(t, [[s.pulse - 0.1, 0], [s.pulse + 0.35, 1, E.out], [s.logo + 1.4, 0, E.smooth]]);
  const pulseW = mix(10, 900, ramp(t, s.pulse, s.logo + 0.6, E.out));

  // Wortmarke: Buchstaben steigen gestaffelt aus der Maske, das Tracking schließt sich.
  const tracking = mix(0.62, 0.34, ramp(t, s.logo, s.logo + 2.2, E.out));
  const sweep = ramp(t, s.logo + 0.35, s.logo + 1.75, E.smooth);
  const breathe = 1 + ramp(t, s.logo, 30, E.linear) * 0.025;

  const btn = ramp(t, s.button, s.button + 0.7, E.out);
  const btnPress = kf(t, [[s.button, 0.9], [s.button + 0.6, 1, E.out]]);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: "#fff", alignItems: "center" }}>
      <AbsoluteFill
        style={{
          background: "radial-gradient(60% 22% at 50% 41%, rgba(255,255,255,0.1), rgba(255,255,255,0) 70%)",
          opacity: kf(t, [[s.pulse, 0], [s.logo + 0.3, 1, E.out], [s.logo + 2.5, 0.45, E.soft]]),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 786,
          height: 2,
          width: pulseW,
          opacity: pulse,
          borderRadius: 2,
          background: "linear-gradient(90deg, rgba(255,255,255,0), #fff 50%, rgba(255,255,255,0))",
          boxShadow: "0 0 30px rgba(255,255,255,0.55)",
        }}
      />

      <div style={{ position: "absolute", top: 706, width: "100%", textAlign: "center", transform: `scale(${breathe})` }}>
        <div
          style={{
            display: "inline-flex",
            fontSize: 112,
            fontWeight: 560,
            lineHeight: 1.2,
            letterSpacing: `${tracking}em`,
            marginRight: `-${tracking}em`,
            overflow: "hidden",
            padding: "0.05em 0",
            backgroundImage: `linear-gradient(100deg, #fff ${sweep * 160 - 60}%, rgba(255,255,255,0.45) ${sweep * 160 - 30}%, #fff ${sweep * 160}%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {LETTERS.map((ch, i) => {
            const p = ramp(t, s.logo + i * 0.055, s.logo + 0.95 + i * 0.055, E.out);
            return (
              <span key={i} style={{ display: "inline-block", transform: `translateY(${(1 - p) * 112}%)`, opacity: ramp(t, s.logo + i * 0.055, s.logo + 0.3 + i * 0.055, E.linear) }}>
                {ch}
              </span>
            );
          })}
        </div>
      </div>

      <div style={{ position: "absolute", top: 884, width: "100%", textAlign: "center", fontSize: 42, fontWeight: 400, letterSpacing: "-0.015em", color: "#a3a39f" }}>
        <Reveal at={s.tagline} dur={0.9}>
          Webdesign. Neu gedacht.
        </Reveal>
      </div>

      <div style={{ position: "absolute", top: 1218, width: "100%", textAlign: "center", fontSize: 60, lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.04em" }}>
        <Reveal at={s.cta} dur={0.9}>
          Jetzt kostenlosen
        </Reveal>
        <Reveal at={s.cta + 0.09} dur={0.9}>
          Entwurf sichern.
        </Reveal>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1424,
          opacity: ramp(t, s.button, s.button + 0.35, E.linear),
          transform: `translateY(${(1 - btn) * 36}px) scale(${btnPress})`,
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "30px 34px 30px 58px",
          borderRadius: 60,
          backgroundColor: "#fff",
          color: "#050505",
          fontSize: 40,
          fontWeight: 600,
          letterSpacing: "-0.025em",
          boxShadow: `0 0 ${90 * btn}px rgba(255,255,255,0.16)`,
        }}
      >
        Jetzt anfragen
        <span style={{ width: 62, height: 62, borderRadius: 31, backgroundColor: "#050505", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
          <span style={{ transform: `translateX(${kf(t, [[s.button + 0.3, -8], [s.button + 0.9, 0, E.out]])}px)` }}>→</span>
        </span>
      </div>

      <div style={{ position: "absolute", top: 1626, width: "100%", textAlign: "center", fontSize: 27, letterSpacing: "0.02em", color: "#77777a", opacity: ramp(t, s.button + 0.35, s.button + 0.9, E.linear) }}>
        Unverbindlich · In wenigen Tagen
      </div>
    </AbsoluteFill>
  );
};
