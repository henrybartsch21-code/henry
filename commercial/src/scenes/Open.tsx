import React from "react";
import { AbsoluteFill } from "remotion";
import { Flare, GLOW } from "../components/Light";
import { Mark, Spread } from "../components/Type";
import { E, kf, ramp, useT } from "../lib/motion";
import { T } from "../timeline";

/** 1 — Ein Flutlicht zündet, die Marke tritt aus dem Licht. */
export const Open: React.FC = () => {
  const t = useT();
  const s = T.open;
  const out = ramp(t, s.out, s.out + 0.3, E.in);
  const push = 1 + ramp(t, 0, s.out + 0.3, E.linear) * 0.1;
  return (
    <AbsoluteFill style={{ transform: `scale(${push + out * 0.3})` }}>
      <Flare x={540} y={900} power={kf(t, [[s.flare, 0], [s.flare + 0.18, 1.5, E.out], [s.logo + 0.6, 0.5, E.soft], [s.out + 0.3, 0.9, E.in]])} streak={kf(t, [[s.flare, 0.1], [s.flare + 0.5, 1, E.out], [s.out, 0.7], [s.out + 0.3, 1.6, E.in]])} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 1 - out, transform: `scaleX(${1 + out * 5})`, filter: out > 0.02 ? `blur(${out * 40}px)` : undefined }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -140 }}>
          <Mark size={190} draw={ramp(t, s.logo - 0.35, s.logo + 0.55, E.inOut)} style={{ opacity: ramp(t, s.logo - 0.35, s.logo, E.linear), transform: `rotate(${(1 - ramp(t, s.logo - 0.35, s.logo + 0.8, E.out)) * -90}deg)` }} />
          <div style={{ marginTop: 54, fontSize: 104, fontWeight: 600, color: "#fff", textShadow: GLOW }}>
            <Spread at={s.logo} dur={0.8} from={0.9} tracking={0.3} style={{ paddingLeft: "0.3em" }}>
              SWELLORA
            </Spread>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
