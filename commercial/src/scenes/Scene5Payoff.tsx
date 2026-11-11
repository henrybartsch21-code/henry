import React from "react";
import { AbsoluteFill } from "remotion";
import { BAR, Browser } from "../components/Browser";
import { MotionBlur } from "../components/MotionBlur";
import { Reveal } from "../components/Reveal";
import { PAGE_H, PAGE_W, Phone, PHONE_H, PHONE_W, ShowcasePage } from "../components/ShowcasePage";
import { FONT } from "../lib/fonts";
import { E, Key, kf, mix, ramp, useT } from "../lib/motion";
import { T } from "../timeline";

// Welt-Koordinaten: Die Seite liegt bei (0,0), das Smartphone schwebt rechts daneben.
const PHONE_X = PAGE_W + 330;
const PHONE_Y = 1560;

// Vorschau-Zustand (Szene 4): Seite im Browserrahmen, unteres Bilddrittel.
const PRE = { scale: 0.74, x: (1080 - PAGE_W * 0.74) / 2, y: 744, h: 1500 };

const S = T.s5.shots;
const W = 0.3; // Dauer eines Whip-Moves
// Kamera-Keyframes: Fokuspunkt (cx, cy) in Seitenkoordinaten + Zoom, mit leichter Drift pro Einstellung.
const build = (start: number, pan: number, targets: number[], drift: number[]): Key[] => {
  const keys: Key[] = [
    [T.s5.in + 0.3, start],
    [S[0], pan, E.linear],
  ];
  targets.forEach((v, i) => {
    const prev = keys[keys.length - 1][1];
    keys.push([S[i], prev], [S[i] + W, v, E.inOut]);
    const end = i < S.length - 1 ? S[i + 1] : T.s5.out + 0.3;
    keys.push([end, v + drift[i], E.linear]);
  });
  return keys;
};

//                         Start  Pan    Navigation  Hero   Typografie  Mobile            Kontakt
const camX = build(540, 540, [800, 470, 540, PHONE_X + PHONE_W / 2, 540], [-24, 30, 0, 0, 0]);
const camY = build(960, 1180, [508, 700, 1790, PHONE_Y + PHONE_H / 2 - 20, PAGE_H - 965], [0, 24, 60, 30, 60]);
const camS = build(1, 1, [1.88, 1.42, 1.16, 1.5, 1.08], [0.0, 0.03, 0.02, 0.04, 0.02]);

/**
 * SZENEN 4b + 5 — die Website-Vorschau setzt sich zusammen, füllt dann den Bildschirm,
 * und die Kamera fährt in präzisen Detailaufnahmen über das Interface.
 */
export const Scene5Payoff: React.FC = () => {
  const t = useT();
  const s4 = T.s4;
  const s = T.s5;

  const appear = ramp(t, s4.preview + 0.1, s4.preview + 0.65, E.out);
  const assemble = ramp(t, s4.preview + 0.2, s4.previewSettled, E.linear);
  // Vorschau → Vollbild
  const expand = ramp(t, s4.out - 0.05, s.in + 0.3, E.inOut);

  const cx = kf(t, camX);
  const cy = kf(t, camY);
  const cs = kf(t, camS);
  const dt = 1 / 120;
  const vx = (kf(t + dt, camX) - kf(t - dt, camX)) * cs;
  const vy = (kf(t + dt, camY) - kf(t - dt, camY)) * cs;
  const vs = Math.abs(kf(t + dt, camS) - kf(t - dt, camS)) * 400;

  const scale = mix(PRE.scale, 1, expand) * (expand >= 1 ? cs : 1);
  const tx = expand >= 1 ? 540 - cx * cs : mix(PRE.x, 0, expand);
  const ty = expand >= 1 ? 960 - cy * cs : mix(PRE.y + BAR, 0, expand);

  const dim = ramp(t, s.text1 - 0.25, s.text1 + 0.35, E.smooth);
  const exit = ramp(t, s.out, s.out + 0.28, E.in);
  const floatIn = (1 - appear) * 260;

  if (t < s4.preview - 0.05) return null;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: 1 - exit }}>
      <MotionBlur
        id="cam-blur"
        x={Math.abs(vx) * 0.3 + vs * 0.12}
        y={Math.abs(vy) * 0.3 + vs * 0.12}
        style={{ position: "absolute", inset: 0, opacity: appear, transform: `translateY(${floatIn}px) scale(${1 + exit * 0.08})` }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, transformOrigin: "0 0", transform: `translate(${tx}px, ${ty}px) scale(${scale})` }}>
          {/* Browserrahmen der Vorschau — löst sich beim Übergang ins Vollbild auf */}
          {expand < 1 ? (
            <div style={{ position: "absolute", left: 0, top: -BAR, opacity: 1 - expand }}>
              <Browser width={PAGE_W} height={PRE.h} url="dein-unternehmen.de" radius={30}>
                <div />
              </Browser>
            </div>
          ) : null}
          <div
            style={{
              width: PAGE_W,
              height: expand < 1 ? mix(PRE.h, PAGE_H, expand) : PAGE_H,
              overflow: "hidden",
              borderRadius: mix(0, 0, expand),
              borderBottomLeftRadius: 30 * (1 - expand),
              borderBottomRightRadius: 30 * (1 - expand),
            }}
          >
            <ShowcasePage assemble={assemble} scroll={cy - 960} />
          </div>
          {expand >= 1 ? (
            <div style={{ position: "absolute", left: PHONE_X, top: PHONE_Y }}>
              <Phone />
            </div>
          ) : null}
        </div>
      </MotionBlur>

      {/* Emotionaler Höhepunkt */}
      <AbsoluteFill style={{ backgroundColor: "#050505", opacity: dim * 0.94 }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", color: "#fff", textAlign: "center" }}>
        <div style={{ transform: `scale(${1 + ramp(t, s.text1, s.out + 0.3, E.linear) * 0.05})` }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.05em",
              color: `rgba(255,255,255,${mix(1, 0.5, ramp(t, s.text2 - 0.2, s.text2 + 0.3, E.smooth))})`,
              transform: `translateY(${mix(84, 0, ramp(t, s.text2 - 0.3, s.text2 + 0.25, E.inOut))}px)`,
            }}
          >
            <Reveal at={s.text1} dur={0.7}>
              Dein Unternehmen.
            </Reveal>
          </div>
          <div style={{ fontSize: 106, fontWeight: 680, letterSpacing: "-0.056em", marginTop: 14, whiteSpace: "nowrap" }}>
            <Reveal at={s.text2} dur={0.7}>
              Dein nächstes Level.
            </Reveal>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
