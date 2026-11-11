import React from "react";
import { AbsoluteFill } from "remotion";
import { Flare, GLOW } from "../components/Light";
import { Cursor, Mark, Spread } from "../components/Type";
import { E, kf, mix, ramp, useT } from "../lib/motion";
import { T } from "../timeline";

/** 6 — Marke und Call-to-Action. */
export const End: React.FC = () => {
  const t = useT();
  const s = T.end;
  const btn = ramp(t, s.button, s.button + 0.6, E.out);
  const cur = ramp(t, s.button + 0.25, s.click - 0.05, E.inOut);
  const press = kf(t, [[s.click - 0.08, 0], [s.click, 1, E.out], [s.click + 0.2, 0, E.out]]);
  const ripple = ramp(t, s.click, s.click + 0.9, E.out);
  return (
    <AbsoluteFill style={{ transform: `scale(${1 + ramp(t, s.in, 20, E.linear) * 0.05})`, color: "#fff", alignItems: "center" }}>
      <Flare x={540} y={640} power={kf(t, [[s.in, 0], [s.logo, 1.4, E.out], [s.logo + 1.2, 0.5, E.soft]])} streak={kf(t, [[s.in, 0.2], [s.logo + 0.5, 1, E.out]])} />
      <div style={{ position: "absolute", top: 468, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Mark size={170} draw={ramp(t, s.logo - 0.2, s.logo + 0.7, E.inOut)} style={{ opacity: ramp(t, s.logo - 0.2, s.logo + 0.1, E.linear) }} />
        <div style={{ marginTop: 50, fontSize: 108, fontWeight: 600, textShadow: GLOW }}>
          <Spread at={s.logo} dur={1.0} from={0.9} tracking={0.3} style={{ paddingLeft: "0.3em" }}>
            SWELLORA
          </Spread>
        </div>
        <div style={{ marginTop: 22, fontSize: 46, fontWeight: 420, color: "#c5d6f7", textShadow: GLOW }}>
          <Spread at={s.tagline} tracking={-0.02}>Webdesign. Neu gedacht.</Spread>
        </div>
      </div>

      <div style={{ position: "absolute", top: 1150, textAlign: "center", fontSize: 68, lineHeight: 1.14, fontWeight: 620, textShadow: GLOW, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Spread at={s.cta}>Jetzt kostenlosen</Spread>
        <Spread at={s.cta + 0.1}>Entwurf sichern.</Spread>
      </div>

      <div style={{ position: "absolute", top: 1400, opacity: ramp(t, s.button, s.button + 0.25, E.linear), transform: `translateY(${(1 - btn) * 50}px) scale(${mix(0.86, 1, btn) - press * 0.06})` }}>
        <div style={{ position: "absolute", inset: -ripple * 70, borderRadius: 100, border: "2px solid rgba(160,195,255,0.9)", opacity: (1 - ripple) * (t >= s.click ? 1 : 0) }} />
        <div
          style={{
            padding: "38px 78px",
            borderRadius: 80,
            background: "linear-gradient(170deg, #ffffff, #cfe0ff)",
            color: "#050814",
            fontSize: 46,
            fontWeight: 650,
            letterSpacing: "-0.03em",
            boxShadow: `0 0 0 2px rgba(255,255,255,0.9), 0 0 ${50 + press * 60}px rgba(120,165,255,${0.8 + press * 0.2}), 0 0 190px rgba(60,110,255,0.7)`,
          }}
        >
          Jetzt anfragen →
        </div>
      </div>
      <div style={{ position: "absolute", top: 1610, fontSize: 30, color: "#93a3c8", opacity: ramp(t, s.button + 0.3, s.button + 0.8, E.linear) }}>Unverbindlich · In wenigen Tagen</div>
      <Cursor x={mix(1120, 660, cur)} y={mix(1820, 1470, cur)} press={press} opacity={ramp(t, s.button + 0.25, s.button + 0.4, E.linear) * (1 - ramp(t, s.click + 0.5, s.click + 0.9, E.linear))} />
    </AbsoluteFill>
  );
};
