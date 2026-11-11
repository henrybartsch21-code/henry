import React from "react";
import { AbsoluteFill } from "remotion";
import { E, kf, ramp, useT } from "../lib/motion";
import { T } from "../timeline";

const src = `import { Hero, Nav, Section } from "@svelora/ui";
import { motion } from "motion/react";

export default function Startseite() {
  return (
    <main className="site">
      <Nav logo="Dein Unternehmen" sticky />
      <Hero
        titel="Mehr Anfragen."
        text="Eine Website, die verkauft."
        cta="Angebot ansehen"
      />
      <Section id="leistungen" columns={3}>
        {leistungen.map((l) => (
          <motion.article
            key={l.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <h3>{l.titel}</h3>
            <p>{l.text}</p>
          </motion.article>
        ))}
      </Section>
      <Kontakt formular schnell />
    </main>
  );
}

const ease = [0.16, 1, 0.3, 1];
export const metadata = {
  title: "Dein Unternehmen",
  description: "Design, das überzeugt.",
};
@media (max-width: 768px) {
  .hero { font-size: clamp(2.6rem, 9vw, 4rem); }
}
<link rel="preload" as="font" />
lighthouse: performance 100`.split("\n");

const colors = ["#ffffff", "#8fbcff", "#4f7dff", "#c9d8ff", "#6b7aa8"];

/** 3 — Code-Rausch: Zeilen jagen durchs Bild, kurz in Zeitlupe lesbar, dann Whip. */
export const Code: React.FC = () => {
  const t = useT();
  const s = T.code;
  // Speed-Ramp: schnell → Zeitlupe → sehr schnell
  const y = kf(t, [[s.in, 2300], [s.in + 0.42, 620, E.out], [s.in + 0.86, 380, E.linear], [s.out + 0.12, -3400, E.in]]);
  const fade = ramp(t, s.in, s.in + 0.12, E.linear) * (1 - ramp(t, s.out - 0.05, s.out + 0.12, E.linear));
  return (
    <AbsoluteFill style={{ perspective: 1400, opacity: fade }}>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 0,
          width: 1200,
          transform: `translateY(${y}px) rotateX(18deg) rotateY(-12deg) rotateZ(-3deg) scale(${kf(t, [[s.in, 1.5], [s.in + 0.5, 1.12, E.out], [s.out, 1.6, E.in]])})`,
          transformOrigin: "50% 30%",
          fontFamily: '"DejaVu Sans Mono", ui-monospace, Menlo, Consolas, monospace',
          fontSize: 38,
          lineHeight: 1.5,
          fontWeight: 600,
          whiteSpace: "pre",
        }}
      >
        {src.map((line, i) => (
          <div key={i} style={{ color: colors[(i * 7 + line.length) % colors.length], textShadow: "0 0 10px rgba(90,140,255,0.9)" }}>
            {line || " "}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
