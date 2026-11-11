import React from "react";
import { AbsoluteFill, interpolateColors } from "remotion";
import { SideboardArt } from "../components/art";
import { BAR, Browser } from "../components/Browser";
import { Lines } from "../components/Reveal";
import { FONT } from "../lib/fonts";
import { E, clamp, kf, mix, ramp, rnd, useT } from "../lib/motion";
import { T } from "../timeline";

const W = 880;
const H = 1150;
const OLD_FONT = '"Times New Roman", Times, serif';

type Rect = [x: number, y: number, w: number, h: number];
type Block = {
  from: Rect;
  to: Rect;
  bgFrom: string;
  bgTo: string;
  rFrom?: number;
  rTo?: number;
  old: React.ReactNode;
  next: React.ReactNode;
};

const oldLink: React.CSSProperties = { color: "#2b3f8f", textDecoration: "underline" };

/** Die UI-Bausteine: links ihr Platz in der alten Seite, rechts ihr Platz im neuen Design. */
const blocks: Block[] = [
  {
    // Banner → Navigation
    from: [0, 0, W, 128],
    to: [0, 0, W, 104],
    bgFrom: "#7d8799",
    bgTo: "#f5f3ef",
    old: (
      <div style={{ fontFamily: OLD_FONT, color: "#fff", padding: "20px 26px", background: "linear-gradient(#93a0b8, #5f6b82)", height: "100%" }}>
        <div style={{ fontSize: 46, fontWeight: 700, fontStyle: "italic", textShadow: "2px 2px 0 #3c4558" }}>Schreinerei Brandt</div>
        <div style={{ fontSize: 19, marginTop: 4 }}>*** Herzlich Willkommen auf unserer Homepage!!! ***</div>
      </div>
    ),
    next: (
      <div style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 48px", fontSize: 18, color: "#55504a" }}>
        <span style={{ fontSize: 27, fontWeight: 700, letterSpacing: "-0.03em", color: "#171513" }}>BRANDT</span>
        <span style={{ marginLeft: "auto" }}>Möbel</span>
        <span style={{ marginLeft: 34 }}>Werkstatt</span>
        <span style={{ marginLeft: 34 }}>Referenzen</span>
        <span style={{ marginLeft: 34, padding: "13px 26px", borderRadius: 30, backgroundColor: "#171513", color: "#fff", fontWeight: 500 }}>Beratung</span>
      </div>
    ),
  },
  {
    // Link-Leiste → Headline
    from: [0, 128, W, 46],
    to: [48, 168, 700, 262],
    bgFrom: "#39435a",
    bgTo: "#f5f3ef",
    old: (
      <div style={{ fontFamily: OLD_FONT, fontSize: 17, color: "#fff", padding: "11px 14px", whiteSpace: "nowrap" }}>
        Home | Über uns | Leistungen | Galerie | Angebote | Gästebuch | Anfahrt | Links | Kontakt | Impressum
      </div>
    ),
    next: (
      <div style={{ color: "#171513" }}>
        <div style={{ fontSize: 15, letterSpacing: "0.2em", fontWeight: 500, color: "#8a8176" }}>MÖBELMANUFAKTUR · SEIT 1987</div>
        <div style={{ fontSize: 100, lineHeight: 0.96, fontWeight: 620, letterSpacing: "-0.055em", marginTop: 20 }}>
          Möbel, die
          <br />
          <span style={{ color: "#a2998d" }}>bleiben.</span>
        </div>
      </div>
    ),
  },
  {
    // Seitenleiste → Hero-Bild
    from: [0, 174, 196, 760],
    to: [48, 566, 784, 372],
    bgFrom: "#d8d0b8",
    bgTo: "#e6e0d7",
    rTo: 24,
    old: (
      <div style={{ fontFamily: OLD_FONT, fontSize: 18, padding: 14, lineHeight: 1.75, color: "#222" }}>
        <b>MENÜ</b>
        {["Startseite", "Aktuelles", "Küchen", "Türen", "Fenster", "Treppen", "Reparaturen", "Preisliste", "Newsletter", "Sitemap"].map((l) => (
          <div key={l} style={oldLink}>» {l}</div>
        ))}
        <div style={{ marginTop: 18, fontSize: 14, border: "1px solid #888", padding: 6, background: "#fff" }}>
          Besucher:
          <br />
          <b style={{ fontFamily: "monospace", fontSize: 19 }}>0048213</b>
        </div>
      </div>
    ),
    next: <SideboardArt id="s2" />,
  },
  {
    // Fließtext → Subline
    from: [208, 186, 440, 330],
    to: [48, 452, 470, 70],
    bgFrom: "#ffffff",
    bgTo: "#f5f3ef",
    old: (
      <div style={{ fontFamily: OLD_FONT, fontSize: 16.5, lineHeight: 1.3, padding: 12, color: "#111", border: "1px solid #999", height: "100%", boxSizing: "border-box" }}>
        <b style={{ fontSize: 22, color: "#7a1f1f" }}>Willkommen!</b>
        <br />
        Wir sind Ihr kompetenter Partner rund ums Holz. Unser Betrieb besteht seit 1987 und bietet Ihnen ein umfangreiches Leistungsspektrum in den Bereichen Innenausbau, Möbelbau, Küchen, Türen, Fenster, Treppen sowie Reparaturen aller Art. Bitte klicken Sie links im Menü, um mehr zu erfahren. Für Fragen stehen wir Ihnen gerne telefonisch oder per Fax zur Verfügung. <span style={oldLink}>Hier klicken</span> für weitere Informationen...
      </div>
    ),
    next: (
      <div style={{ fontSize: 23, lineHeight: 1.42, color: "#5d564e" }}>
        Einzelstücke aus heimischen Hölzern — entworfen und gebaut in unserer Werkstatt.
      </div>
    ),
  },
  {
    // Kleines Bild → Primär-Button
    from: [660, 186, 208, 150],
    to: [580, 458, 252, 70],
    bgFrom: "#8f8a7c",
    bgTo: "#171513",
    rTo: 35,
    old: (
      <div style={{ fontFamily: OLD_FONT, height: "100%", boxSizing: "border-box", border: "4px ridge #bbb", color: "#eee", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        bild_werkstatt_2.jpg
        <br />
        (wird geladen…)
      </div>
    ),
    next: (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 21, fontWeight: 500, whiteSpace: "nowrap" }}>
        Beratung anfragen →
      </div>
    ),
  },
  {
    // „Aktuelles" → Produktkarte 1
    from: [660, 350, 208, 250],
    to: [48, 966, 248, 150],
    bgFrom: "#f3ecb4",
    bgTo: "#ebe6de",
    rTo: 18,
    old: (
      <div style={{ fontFamily: OLD_FONT, fontSize: 15.5, padding: 10, color: "#111", border: "2px dashed #b3261e", height: "100%", boxSizing: "border-box", lineHeight: 1.3 }}>
        <b style={{ color: "#b3261e", fontSize: 19 }}>NEU!!! AKTUELL</b>
        <br />
        Betriebsferien vom 02.08. bis 20.08.
        <br />
        <br />
        Sonderangebot: Zimmertüren ab 99,- €*
        <br />
        <span style={oldLink}>mehr…</span>
      </div>
    ),
    next: <Card n="01" title="Sideboards" />,
  },
  {
    // Tabelle → Produktkarte 2
    from: [208, 530, 440, 250],
    to: [316, 966, 248, 150],
    bgFrom: "#e4e4e4",
    bgTo: "#ebe6de",
    rTo: 18,
    old: (
      <div style={{ fontFamily: OLD_FONT, fontSize: 15.5, color: "#111", height: "100%" }}>
        {["Leistung|Preis|Info", "Zimmertür Buche|ab 99,-|siehe PDF", "Fensterbank|auf Anfrage|—", "Treppe Eiche|auf Anfrage|siehe PDF", "Reparatur|n. Aufwand|Tel.", "Küche komplett|auf Anfrage|Termin"].map((row, i) => (
          <div key={i} style={{ display: "flex", backgroundColor: i === 0 ? "#9aa3b5" : i % 2 ? "#fff" : "#ececec", fontWeight: i === 0 ? 700 : 400, borderBottom: "1px solid #888" }}>
            {row.split("|").map((c, j) => (
              <span key={j} style={{ flex: j === 0 ? 1.4 : 1, padding: "8px 8px", borderRight: "1px solid #888" }}>{c}</span>
            ))}
          </div>
        ))}
      </div>
    ),
    next: <Card n="02" title="Esstische" />,
  },
  {
    // Fußzeile → Produktkarte 3
    from: [208, 796, 660, 138],
    to: [584, 966, 248, 150],
    bgFrom: "#c9c9c9",
    bgTo: "#ebe6de",
    rTo: 18,
    old: (
      <div style={{ fontFamily: OLD_FONT, fontSize: 14.5, padding: 12, color: "#333", lineHeight: 1.45 }}>
        Diese Seite ist optimiert für Internet Explorer 6.0 bei einer Auflösung von 1024×768.
        <br />
        © 2009 Schreinerei Brandt · Letzte Aktualisierung: 14.03.2011 · <span style={oldLink}>Webmaster</span>
        <br />
        Tel. 0 81 52 / 44 19 · Fax 0 81 52 / 44 20
      </div>
    ),
    next: <Card n="03" title="Küchen" />,
  },
];

function Card({ n, title }: { n: string; title: string }) {
  return (
    <div style={{ padding: "20px 22px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#171513" }}>
      <span style={{ fontSize: 14, letterSpacing: "0.12em", color: "#8a8176" }}>{n}</span>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 26, fontWeight: 580, letterSpacing: "-0.03em" }}>{title}</span>
        <span style={{ fontSize: 20 }}>→</span>
      </div>
    </div>
  );
}

/** SZENE 2 — THE DIFFERENCE · veraltete Website zerfällt und wird zum Premium-Design. */
export const Scene2Difference: React.FC = () => {
  const t = useT();
  const s = T.s2;

  const enter = ramp(t, s.in - 0.15, s.in + 1.0, E.out);
  // Rotation läuft bis zum Freeze und bleibt dann stehen.
  const tRot = Math.min(t, s.freeze);
  const drift = (tRot - s.in) / (s.freeze - s.in);
  const settle = ramp(t, s.assemble, s.settled + 0.5, E.smooth);
  const rotY = mix(mix(-22, -9, enter) + drift * 5, 0, settle);
  const rotX = mix(mix(12, 5, enter) - drift * 1.5, 0, settle);
  // Mikro-Ruck beim Einfrieren
  const jolt = Math.exp(-Math.max(0, t - s.freeze) * 22) * (t >= s.freeze ? 1 : 0);

  const explode = ramp(t, s.shatter, s.assemble + 0.1, E.out);
  const morph = ramp(t, s.assemble, s.settled, E.smooth);
  const tone = ramp(t, s.shatter + 0.2, s.settled, E.smooth);
  const oldOpacity = 1 - ramp(t, s.shatter + 0.22, s.shatter + 0.6, E.linear);
  const newOpacity = ramp(t, s.settled - 0.5, s.settled - 0.04, E.linear);
  // Bühne im Fenster: alt → dunkel (Bausteine schweben) → neu
  const phase = ramp(t, s.shatter, s.shatter + 0.45, E.soft) + ramp(t, s.settled - 0.5, s.settled, E.smooth);
  const scatter = explode * (1 - morph);

  // Langsame Kamerafahrt über das neue Design
  const glide = ramp(t, s.settled, s.out + 0.4, E.linear);
  const exit = ramp(t, s.out, s.out + 0.45, E.in);
  const scale = mix(0.86, 0.98, enter) - jolt * 0.012 + scatter * 0.03 + glide * 0.05 + exit * 5.5;
  const y = mix(150, 0, enter) + 130 * (1 - settle) - glide * 46;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: ramp(t, s.in - 0.15, s.in + 0.35, E.linear) * (1 - ramp(t, s.out + 0.2, s.out + 0.45, E.linear)) }}>
      <AbsoluteFill style={{ perspective: 2200, perspectiveOrigin: "50% 45%" }}>
        <div
          style={{
            position: "absolute",
            left: (1080 - W) / 2,
            top: 190,
            transformStyle: "preserve-3d",
            transform: `translateY(${y}px) scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transformOrigin: "50% 45%",
          }}
        >
          <Browser
            width={W}
            height={H}
            tone={tone}
            url={tone < 0.5 ? "www.schreinerei-brandt.de/index.htm" : "brandt-moebel.de"}
            style={{ overflow: "visible", transformStyle: "preserve-3d" }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: scatter > 0.001 ? "visible" : "hidden",
                transformStyle: "preserve-3d",
                backgroundColor: interpolateColors(phase, [0, 1, 2], ["#efefe9", "#0c0c0c", "#f5f3ef"]),
                borderRadius: "0 0 22px 22px",
              }}
            >
              {blocks.map((b, i) => {
                const local = clamp(morph * 1.25 - i * 0.03);
                const p = E.smooth(local);
                const x = mix(b.from[0], b.to[0], p);
                const by = mix(b.from[1], b.to[1], p);
                const w = mix(b.from[2], b.to[2], p);
                const h = mix(b.from[3], b.to[3], p);
                const cx = b.from[0] + b.from[2] / 2 - W / 2;
                const cy = b.from[1] + b.from[3] / 2 - H / 2;
                const sx = cx * 0.55 + (rnd(i) - 0.5) * 160;
                const sy = cy * 0.42 + (rnd(i + 9) - 0.5) * 180;
                const sz = 160 + rnd(i + 3) * 560;
                const k = explode * (1 - p);
                const geo = clamp(explode * 1.6) * (1 - newOpacity); // „geometrischer" Zustand
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: x,
                      top: by,
                      width: w,
                      height: h,
                      overflow: "hidden",
                      borderRadius: mix(b.rFrom ?? 0, b.rTo ?? 0, p) + geo * 6 * (1 - p),
                      backgroundColor: interpolateColors(p, [0, 1], [b.bgFrom, b.bgTo]),
                      transform: `translate3d(${sx * k}px, ${sy * k}px, ${sz * k}px) rotateX(${(rnd(i + 5) - 0.5) * 50 * k}deg) rotateY(${(rnd(i + 7) - 0.5) * 64 * k}deg)`,
                      boxShadow: k > 0.01 ? `0 ${30 * k}px ${80 * k}px rgba(0,0,0,${0.5 * k}), inset 0 0 0 1px rgba(255,255,255,${0.35 * geo})` : undefined,
                    }}
                  >
                    {oldOpacity > 0 ? (
                      <div style={{ position: "absolute", left: 0, top: 0, width: b.from[2], height: b.from[3], opacity: oldOpacity }}>{b.old}</div>
                    ) : null}
                    {newOpacity > 0 ? (
                      <div style={{ position: "absolute", left: 0, top: 0, width: b.to[2], height: b.to[3], opacity: newOpacity }}>{b.next}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Browser>
        </div>
      </AbsoluteFill>

      {/* Lichtkante beim Einrasten */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(60% 30% at 50% 42%, rgba(255,255,255,0.16), rgba(255,255,255,0) 70%)",
          opacity: kf(t, [[s.settled - 0.25, 0], [s.settled, 1, E.out], [s.settled + 0.9, 0, E.soft]]),
          mixBlendMode: "screen",
        }}
      />

      <div style={{ position: "absolute", top: 1508, width: "100%", textAlign: "center", color: "#fff", fontSize: 96, lineHeight: 1.04, fontWeight: 620, letterSpacing: "-0.05em", opacity: 1 - exit }}>
        <Lines at={s.text} out={s.out - 0.1} lines={["Aus Besuchern", "werden Kunden."]} />
      </div>
    </AbsoluteFill>
  );
};

export const S2_BAR = BAR;
