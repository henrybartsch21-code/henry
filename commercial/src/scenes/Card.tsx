import React from "react";
import { AbsoluteFill } from "remotion";
import { GLOW, Halo } from "../components/Light";
import { Spread } from "../components/Type";
import { E, kf, ramp, useT } from "../lib/motion";
import { T } from "../timeline";

const W = 820;
const H = 1130;

type Design = {
  bg: string;
  ink: string;
  mute: string;
  glow: string;
  rim: string;
  brand: string;
  eyebrow: string;
  head: string[];
  sub: string;
  cta: string;
  btn: [string, string];
  art: string;
};

const designs: Design[] = [
  {
    bg: "linear-gradient(155deg, #060a24 0%, #0d1f8f 55%, #2f6dff 100%)",
    ink: "#fff",
    mute: "rgba(220,232,255,0.72)",
    glow: "70,120,255",
    rim: "rgba(160,195,255,0.75)",
    brand: "NORDLICHT",
    eyebrow: "ENERGIEBERATUNG",
    head: ["Mehr Anfragen.", "Jeden Tag."],
    sub: "Klar erklärt, schnell gebucht.",
    cta: "Angebot ansehen",
    btn: ["#fff", "#07103a"],
    art: "radial-gradient(120% 90% at 80% 10%, rgba(255,255,255,0.55), rgba(120,170,255,0.25) 35%, rgba(0,0,0,0) 70%)",
  },
  {
    bg: "linear-gradient(165deg, #ffffff 0%, #eef2fa 60%, #d5e1f7 100%)",
    ink: "#0a0d18",
    mute: "rgba(20,28,50,0.62)",
    glow: "190,215,255",
    rim: "rgba(255,255,255,0.95)",
    brand: "Atelier Weiss",
    eyebrow: "INTERIOR · BERLIN",
    head: ["Klar. Ruhig.", "Hochwertig."],
    sub: "Räume, die man nicht vergisst.",
    cta: "Termin anfragen",
    btn: ["#0a0d18", "#fff"],
    art: "radial-gradient(90% 80% at 30% 100%, rgba(80,130,255,0.5), rgba(160,195,255,0.25) 40%, rgba(255,255,255,0) 75%)",
  },
  {
    bg: "linear-gradient(170deg, #0b0c10 0%, #12141c 55%, #1c2440 100%)",
    ink: "#fff",
    mute: "rgba(200,210,235,0.66)",
    glow: "120,160,255",
    rim: "rgba(150,185,255,0.6)",
    brand: "KRAFTWERK",
    eyebrow: "PERSONAL TRAINING",
    head: ["Stärker in", "zwölf Wochen."],
    sub: "Dein Plan. Dein Coach. Dein Ziel.",
    cta: "Probetraining",
    btn: ["#8fbcff", "#050814"],
    art: "radial-gradient(100% 80% at 50% 110%, rgba(110,160,255,0.75), rgba(40,80,255,0.3) 40%, rgba(0,0,0,0) 72%)",
  },
];

const Site: React.FC<{ d: Design }> = ({ d }) => (
  <div style={{ width: W, height: H, borderRadius: 46, overflow: "hidden", background: d.bg, color: d.ink, position: "relative", boxShadow: `0 0 0 2.5px ${d.rim}, 0 0 44px rgba(${d.glow},0.8), inset 0 2px 0 rgba(255,255,255,0.35)` }}>
    <div style={{ position: "absolute", inset: 0, background: d.art }} />
    <div style={{ position: "relative", display: "flex", alignItems: "center", padding: "50px 54px 0", fontSize: 26, color: d.mute }}>
      <span style={{ fontSize: 31, fontWeight: 700, letterSpacing: "-0.02em", color: d.ink }}>{d.brand}</span>
      <span style={{ marginLeft: "auto" }}>Leistungen</span>
      <span style={{ marginLeft: 34 }}>Über uns</span>
      <span style={{ marginLeft: 34 }}>Kontakt</span>
    </div>
    <div style={{ position: "relative", padding: "150px 54px 0" }}>
      <div style={{ fontSize: 23, letterSpacing: "0.22em", fontWeight: 550, color: d.mute }}>{d.eyebrow}</div>
      <div style={{ fontSize: 108, lineHeight: 0.98, fontWeight: 640, letterSpacing: "-0.055em", marginTop: 30 }}>
        {d.head.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
      <div style={{ fontSize: 36, color: d.mute, marginTop: 34, letterSpacing: "-0.015em" }}>{d.sub}</div>
      <div style={{ display: "inline-block", marginTop: 56, padding: "30px 52px", borderRadius: 60, backgroundColor: d.btn[0], color: d.btn[1], fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>
        {d.cta} →
      </div>
    </div>
    <div style={{ position: "absolute", left: 54, right: 54, bottom: 54, display: "flex", gap: 18 }}>
      {["4,9 ★", "+38 %", "24 h"].map((v, i) => (
        <div key={v} style={{ flex: 1, padding: "26px 28px", borderRadius: 28, backgroundColor: d.ink === "#fff" ? "rgba(255,255,255,0.1)" : "rgba(10,13,24,0.06)", boxShadow: `inset 0 0 0 1.5px ${d.ink === "#fff" ? "rgba(255,255,255,0.2)" : "rgba(10,13,24,0.1)"}` }}>
          <div style={{ fontSize: 44, fontWeight: 640, letterSpacing: "-0.04em" }}>{v}</div>
          <div style={{ fontSize: 21, color: d.mute, marginTop: 4 }}>{["Bewertung", "Anfragen", "Antwortzeit"][i]}</div>
        </div>
      ))}
    </div>
  </div>
);

/** 4 — Die Website entsteht: schwebende Glas-Karte, drei Designs im Flip. */
export const Card: React.FC = () => {
  const t = useT();
  const s = T.card;
  const enter = ramp(t, s.in, s.settled, E.out);
  const out = ramp(t, s.out, s.out + 0.3, E.in);

  // Drehung mit Speed-Ramps: ruhige Schwebephasen, dazwischen schnelle 180°-Flips.
  const flip = (at: number) => ramp(t, at - 0.24, at + 0.24, E.inOut) * 180;
  const rotY = -70 * (1 - enter) + kf(t, [[s.settled - 0.5, -16], [s.flip1 - 0.24, -6, E.linear]]) + flip(s.flip1) + flip(s.flip2) + kf(t, [[s.flip1 + 0.24, 0], [s.flip2 - 0.24, 10, E.linear], [s.flip2 + 0.24, 10], [s.out + 0.3, 22, E.linear]]);
  const norm = ((rotY % 360) + 360) % 360;
  const back = norm > 90 && norm < 270;
  const idx = t < s.flip1 ? 0 : t < s.flip2 ? 1 : 2;
  const rotX = kf(t, [[s.in, 26], [s.settled, 7, E.out], [s.out, 3, E.linear]]);
  const scale = kf(t, [[s.in, 2.6], [s.settled, 0.92, E.out], [s.out, 1.0, E.linear], [s.out + 0.3, 3.4, E.in]]);
  const y = Math.sin(t * 1.4) * 12 - 150;

  return (
    <AbsoluteFill style={{ opacity: ramp(t, s.in, s.in + 0.2, E.linear) * (1 - ramp(t, s.out + 0.12, s.out + 0.3, E.linear)) }}>
      <AbsoluteFill style={{ perspective: 1700, alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: `translateY(${y}px) scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`, filter: out > 0.05 ? `blur(${out * 24}px)` : undefined }}>
          <Halo w={1700} h={2000} color={designs[idx].glow} power={0.8} />
          <div style={{ position: "relative", transform: back ? "rotateY(180deg)" : undefined }}>
            <Site d={designs[idx]} />
          </div>
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 1560, width: "100%", display: "flex", justifyContent: "center", color: "#fff", fontSize: 92, fontWeight: 620, textShadow: GLOW }}>
        <div style={{ position: "absolute" }}>
          <Spread at={s.text1} out={s.flip1 - 0.2}>Design, das überzeugt.</Spread>
        </div>
        <div style={{ position: "absolute" }}>
          <Spread at={s.text2} out={s.out - 0.1}>Websites, die wirken.</Spread>
        </div>
      </div>
    </AbsoluteFill>
  );
};
