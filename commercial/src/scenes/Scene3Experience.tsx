import React from "react";
import { AbsoluteFill } from "remotion";
import { Browser } from "../components/Browser";
import { Lines } from "../components/Reveal";
import { CARD_H, CARD_W, CorporateSite, LuxurySite, ServiceSite } from "../components/sites";
import { FONT } from "../lib/fonts";
import { E, clamp, kf, ramp, useT } from "../lib/motion";
import { T } from "../timeline";

const SPACING = 880;
const cards = [
  { x: -SPACING, url: "aurele.ch", Site: LuxurySite },
  { x: 0, url: "nordwerk.de", Site: CorporateSite },
  { x: SPACING, url: "studio-maren.de", Site: ServiceSite },
];

/** SZENE 3 — THE SWELLORA EXPERIENCE · Kamerafahrt durch drei Arbeiten im Raum. */
export const Scene3Experience: React.FC = () => {
  const t = useT();
  const s = T.s3;

  // Kamera: zwei präzise Fahrten + konstante, kaum merkliche Drift.
  const camX =
    kf(t, [
      [s.in - 0.3, -SPACING - 420],
      [s.in + 1.0, -SPACING - 40, E.out],
      [s.move1, -SPACING - 40],
      [s.move1 + 0.95, -40, E.inOut],
      [s.move2, -40],
      [s.move2 + 0.95, SPACING - 40, E.inOut],
    ]) +
    (t - s.in) * 14;
  const camZ = kf(t, [[s.in - 0.3, -900], [s.in + 1.1, 0, E.out]]);
  const vel = Math.abs(
    kf(t + 1 / 120, [[s.move1, 0], [s.move1 + 0.95, 1, E.inOut], [s.move2, 1], [s.move2 + 0.95, 2, E.inOut]]) -
      kf(t - 1 / 120, [[s.move1, 0], [s.move1 + 0.95, 1, E.inOut], [s.move2, 1], [s.move2 + 0.95, 2, E.inOut]]),
  ) * 60;

  const fadeIn = ramp(t, s.in - 0.25, s.in + 0.35, E.linear);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: fadeIn }}>
      <AbsoluteFill style={{ perspective: 1900, perspectiveOrigin: "50% 40%" }}>
        <div style={{ position: "absolute", left: 540, top: 760, transformStyle: "preserve-3d", transform: `translate3d(0, 0, ${camZ}px)` }}>
          {cards.map(({ x, url, Site }, i) => {
            const dx = x - camX;
            const n = clamp(dx / SPACING, -1.6, 1.6);
            // Karten reagieren auf die Kamera: drehen sich ihr zu, treten zurück, wenn sie nicht im Fokus sind.
            const rotY = -n * 26 - vel * 5 * Math.sign(n || 1) * 0.15;
            const z = -Math.abs(n) * 330;
            const bob = Math.sin(t * 0.9 + i * 2.1) * 9;
            // Abgang: elegant nach oben aus dem Bild, gestaffelt
            const out = ramp(t, s.out + i * 0.06, s.out + 0.5 + i * 0.06, E.in);
            const focus = 1 - clamp(Math.abs(n) * 0.75);
            return (
              <div
                key={url}
                style={{
                  position: "absolute",
                  left: -CARD_W / 2,
                  top: -(CARD_H + 58) / 2,
                  transformStyle: "preserve-3d",
                  transform: `translate3d(${dx}px, ${bob - out * 1900}px, ${z - out * 500}px) rotateY(${rotY}deg) rotateX(${out * 24}deg)`,
                  filter: vel > 0.25 ? `blur(${Math.min(9, vel * 5)}px)` : undefined,
                }}
              >
                <Browser width={CARD_W} height={CARD_H} url={url}>
                  <Site parallax={n} />
                  <div style={{ position: "absolute", inset: 0, backgroundColor: "#050505", opacity: (1 - focus) * 0.5 }} />
                </Browser>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <div style={{ position: "absolute", top: 1496, width: "100%", textAlign: "center", color: "#fff", fontSize: 104, lineHeight: 1.03, fontWeight: 620, letterSpacing: "-0.052em" }}>
        <div style={{ position: "absolute", width: "100%" }}>
          <Lines at={s.text1} out={s.text1Out} lines={["Design,", "das überzeugt."]} />
        </div>
        <div style={{ position: "absolute", width: "100%" }}>
          <Lines at={s.text2} out={s.text2Out} lines={["Websites,", "die wirken."]} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
