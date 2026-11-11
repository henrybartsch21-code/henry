import React from "react";
import { AbsoluteFill } from "remotion";
import { GLOW_SOFT, ICE } from "../components/Light";
import { Cursor } from "../components/Type";
import { E, clamp, kf, mix, ramp, useT } from "../lib/motion";
import { PROMPT, T, charTime } from "../timeline";

const BOX_W = 940;
const BOX_H = 470;

/** 2 — Der Wunsch: ein Prompt wird getippt, die Kamera zieht langsam auf. */
export const Prompt: React.FC = () => {
  const t = useT();
  const s = T.prompt;
  const inP = ramp(t, s.in, s.in + 0.45, E.out);
  const out = ramp(t, s.send + 0.02, s.send + 0.34, E.in);

  // Kamera: nah am Text beginnen, während des Tippens aufziehen.
  const zoom = kf(t, [[s.in, 2.0], [s.typeStart, 1.85, E.soft], [s.typeEnd + 0.1, 1.12, E.smooth], [s.send, 1.0, E.soft]]);
  const cx = kf(t, [[s.in, 420], [s.typeEnd + 0.1, 540, E.smooth]]);
  const cy = kf(t, [[s.in, 905], [s.typeEnd + 0.1, 960, E.smooth]]);

  const press = kf(t, [[s.send - 0.1, 0], [s.send, 1, E.out], [s.send + 0.15, 0, E.out]]);
  const cur = ramp(t, s.typeEnd + 0.05, s.send - 0.08, E.inOut);
  let n = 0;

  return (
    <AbsoluteFill style={{ opacity: inP * (1 - out * 0.6) }}>
      <div style={{ position: "absolute", inset: 0, transformOrigin: "0 0", transform: `translate(${540 - cx * zoom}px, ${960 - cy * zoom - out * 2600}px) scale(${zoom})` }}>
        <div
          style={{
            position: "absolute",
            left: (1080 - BOX_W) / 2,
            top: 960 - BOX_H / 2,
            width: BOX_W,
            height: BOX_H,
            borderRadius: 54,
            transform: `scaleX(${mix(2.6, 1, inP)}) scaleY(${mix(0.2, 1, inP)})`,
            background: "linear-gradient(160deg, rgba(22,30,58,0.62), rgba(6,8,18,0.72))",
            boxShadow: `0 0 0 2px rgba(150,190,255,${0.5 + press * 0.4}), 0 0 44px rgba(70,120,255,${0.6 + press * 0.4}), inset 0 1px 0 rgba(255,255,255,0.18)`,
          }}
        >
          <div style={{ padding: "66px 62px 0", fontSize: 72, lineHeight: 1.18, fontWeight: 520, letterSpacing: "-0.035em", color: "#fff", textShadow: GLOW_SOFT }}>
            {PROMPT.map((line, li) => (
              <div key={li} style={{ height: 86, whiteSpace: "pre" }}>
                {line.split("").map((ch) => {
                  const i = n++;
                  const age = t - charTime(i);
                  if (age < 0) return null;
                  const fresh = 1 - clamp(age / 0.32);
                  return (
                    <span key={i} style={{ color: fresh > 0.02 ? `rgb(${Math.round(mix(255, 110, fresh))},${Math.round(mix(255, 165, fresh))},255)` : undefined, opacity: clamp(age / 0.04 + 0.4) }}>
                      {ch}
                    </span>
                  );
                })}
                {t < s.send && t >= charTime(li === 0 ? 0 : PROMPT[0].length) - 0.3 && (li === 1 || t < charTime(PROMPT[0].length)) ? (
                  <span style={{ display: "inline-block", width: 5, height: 70, marginLeft: 6, verticalAlign: "-10px", backgroundColor: ICE, boxShadow: "0 0 18px #6aa0ff", opacity: Math.floor(t * 3.2) % 2 || t > s.typeStart ? 1 : 0.2 }} />
                ) : null}
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: 62, right: 46, bottom: 44, display: "flex", alignItems: "center", color: "#9aa6c4", fontSize: 34 }}>
            <span style={{ fontSize: 58, fontWeight: 300, color: "#fff", lineHeight: 1 }}>+</span>
            <span style={{ marginLeft: "auto", marginRight: 30, letterSpacing: "-0.01em" }}>Svelora Studio</span>
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: 30,
                background: "linear-gradient(160deg, #cfe0ff, #5d93ff)",
                boxShadow: `0 0 ${30 + press * 60}px rgba(110,160,255,${0.7 + press * 0.3})`,
                transform: `scale(${1 - press * 0.12})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#050814",
                fontSize: 50,
                fontWeight: 600,
              }}
            >
              ↑
            </div>
          </div>
        </div>
        <Cursor x={mix(1100, 918, cur)} y={mix(1420, 1128, cur)} press={press} opacity={ramp(t, s.typeEnd, s.typeEnd + 0.15, E.linear)} />
      </div>
    </AbsoluteFill>
  );
};
