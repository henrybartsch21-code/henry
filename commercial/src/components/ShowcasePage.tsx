import React from "react";
import { FONT } from "../lib/fonts";
import { E, ramp } from "../lib/motion";
import { ArchArt, BuildingArt } from "./art";

/**
 * Die „Hero-Website" des Spots (Szene 4 → 5): eine vollständige, lange Seite.
 * In Szene 4 setzt sie sich aus Einzelkomponenten zusammen (assemble 0→1),
 * in Szene 5 fährt die Kamera über genau dieselbe Seite.
 */
export const PAGE_W = 1080;
export const PAGE_H = 3990;

const ink = "#101010";
const mute = "#6f6f6b";

/** Eine Designkomponente, die aus der Tiefe an ihren Platz gleitet. */
const Part: React.FC<{
  p: number;
  i: number;
  from?: [number, number];
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ p, i, from = [0, 90], style, children }) => {
  const local = ramp(p, i * 0.085, i * 0.085 + 0.42, E.out);
  if (p >= 1) return <div style={style}>{children}</div>;
  return (
    <div
      style={{
        ...style,
        opacity: ramp(p, i * 0.085, i * 0.085 + 0.16, E.linear),
        transform: `translate3d(${from[0] * (1 - local)}px, ${from[1] * (1 - local)}px, 0) scale(${0.9 + 0.1 * local})`,
        outline: `1.5px solid rgba(16,16,16,${0.28 * (1 - local)})`,
        outlineOffset: 10 * (1 - local) + 4,
        borderRadius: 6,
      }}
    >
      {children}
    </div>
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = mute }) => (
  <div style={{ fontSize: 19, letterSpacing: "0.2em", fontWeight: 500, color }}>{children}</div>
);

export const ShowcasePage: React.FC<{ assemble?: number; scroll?: number }> = ({ assemble = 1, scroll = 0 }) => {
  const p = assemble;
  return (
    <div style={{ width: PAGE_W, height: PAGE_H, backgroundColor: "#f4f3f0", color: ink, fontFamily: FONT, position: "relative", overflow: "hidden" }}>
      {/* Navigation */}
      <Part p={p} i={0} from={[0, -70]} style={{ height: 128, display: "flex", alignItems: "center", padding: "0 60px" }}>
        <span style={{ fontSize: 31, fontWeight: 700, letterSpacing: "-0.03em" }}>HALDEN</span>
        <span style={{ fontSize: 31, fontWeight: 300, letterSpacing: "-0.03em", marginLeft: 9, color: mute }}>Architekten</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 38, fontSize: 21, color: "#3c3c39" }}>
          <span>Projekte</span>
          <span>Büro</span>
          <span>Journal</span>
          <span style={{ padding: "15px 30px", borderRadius: 40, backgroundColor: ink, color: "#fff", fontWeight: 500 }}>Kontakt</span>
        </div>
      </Part>

      {/* Hero */}
      <div style={{ padding: "66px 60px 0" }}>
        <Part p={p} i={1} from={[-80, 0]}>
          <Eyebrow>ARCHITEKTUR · MÜNCHEN</Eyebrow>
        </Part>
        <Part p={p} i={2} from={[-120, 30]} style={{ marginTop: 30 }}>
          <div style={{ fontSize: 158, lineHeight: 0.94, fontWeight: 620, letterSpacing: "-0.058em" }}>
            Räume,
            <br />
            die <span style={{ color: "#9a9a95" }}>bleiben.</span>
          </div>
        </Part>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 46 }}>
          <Part p={p} i={3} from={[-60, 40]} style={{ width: 520, fontSize: 27, lineHeight: 1.42, color: "#4a4a47" }}>
            Wir planen Häuser, Büros und Orte, die auch in dreißig Jahren noch selbstverständlich wirken.
          </Part>
          <Part p={p} i={4} from={[90, 40]} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ padding: "24px 40px", borderRadius: 50, backgroundColor: ink, color: "#fff", fontSize: 23, fontWeight: 500 }}>
              Projekt anfragen
            </span>
            <span style={{ width: 72, height: 72, borderRadius: 36, border: `1.5px solid ${ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
              →
            </span>
          </Part>
        </div>
        <Part p={p} i={5} from={[0, 150]} style={{ marginTop: 62, height: 600, borderRadius: 30, overflow: "hidden" }}>
          <BuildingArt id="hero" style={{ transform: `scale(1.14) translateY(${-18 + scroll * 0.03}px)` }} />
        </Part>
        <Part p={p} i={6} from={[0, 100]} style={{ display: "flex", justifyContent: "space-between", marginTop: 30, fontSize: 20, color: mute }}>
          <span>Haus K — Tegernsee, 2025</span>
          <span>01 / 12</span>
        </Part>
      </div>

      {/* Haltung — Typografie */}
      <div style={{ padding: "150px 60px 0" }}>
        <Eyebrow>HALTUNG</Eyebrow>
        <div style={{ fontSize: 71, lineHeight: 1.1, fontWeight: 520, letterSpacing: "-0.042em", marginTop: 36 }}>
          Gute Architektur drängt sich nicht auf.{" "}
          <span style={{ color: "#a3a39e" }}>Sie schafft Klarheit, Ruhe und Orte, an denen man gerne bleibt.</span>
        </div>
        <div style={{ display: "flex", gap: 60, marginTop: 64, paddingTop: 34, borderTop: "1px solid rgba(16,16,16,0.14)" }}>
          {[
            ["86", "realisierte Projekte"],
            ["14", "Auszeichnungen"],
            ["2009", "gegründet"],
          ].map(([n, l]) => (
            <div key={l} style={{ flex: 1 }}>
              <div style={{ fontSize: 66, fontWeight: 560, letterSpacing: "-0.05em" }}>{n}</div>
              <div style={{ fontSize: 20, color: mute, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Projekte */}
      <div style={{ padding: "140px 60px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <Eyebrow>AUSGEWÄHLTE PROJEKTE</Eyebrow>
          <span style={{ fontSize: 21, borderBottom: `1.5px solid ${ink}`, paddingBottom: 4 }}>Alle ansehen →</span>
        </div>
        <div style={{ display: "flex", gap: 28, marginTop: 40 }}>
          {[
            { art: <BuildingArt id="p1" variant={1} />, title: "Atelier Nord", meta: "Hamburg · 2024" },
            { art: <ArchArt id="p2" />, title: "Galerie Linde", meta: "Wien · 2023" },
          ].map((c) => (
            <div key={c.title} style={{ flex: 1 }}>
              <div style={{ height: 520, borderRadius: 24, overflow: "hidden" }}>{c.art}</div>
              <div style={{ fontSize: 30, fontWeight: 560, letterSpacing: "-0.03em", marginTop: 24 }}>{c.title}</div>
              <div style={{ fontSize: 20, color: mute, marginTop: 6 }}>{c.meta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Kontakt */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 900, backgroundColor: "#0d0d0d", color: "#f4f3f0", borderRadius: "44px 44px 0 0", padding: "96px 60px 0" }}>
        <Eyebrow color="#8c8c88">KONTAKT</Eyebrow>
        <div style={{ fontSize: 112, lineHeight: 0.96, fontWeight: 600, letterSpacing: "-0.055em", marginTop: 30 }}>
          Lassen Sie uns
          <br />
          sprechen.
        </div>
        <div style={{ display: "flex", gap: 30, marginTop: 70 }}>
          {["Name", "E-Mail"].map((f) => (
            <div key={f} style={{ flex: 1, fontSize: 23, color: "#8c8c88", paddingBottom: 22, borderBottom: "1px solid rgba(244,243,240,0.28)" }}>
              {f}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 23, color: "#8c8c88", padding: "40px 0 22px", borderBottom: "1px solid rgba(244,243,240,0.28)" }}>
          Worum geht es bei Ihrem Projekt?
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 56 }}>
          <span style={{ padding: "26px 46px", borderRadius: 50, backgroundColor: "#f4f3f0", color: ink, fontSize: 24, fontWeight: 550 }}>
            Anfrage senden →
          </span>
          <span style={{ fontSize: 21, color: "#8c8c88", textAlign: "right", lineHeight: 1.5 }}>
            +49 89 2190 4400
            <br />
            studio@halden-architekten.de
          </span>
        </div>
      </div>
    </div>
  );
};

/** Mobile Ansicht derselben Website — für die Responsive-Detailaufnahme. */
export const PHONE_W = 470;
export const PHONE_H = 960;

export const Phone: React.FC = () => (
  <div
    style={{
      width: PHONE_W,
      height: PHONE_H,
      borderRadius: 74,
      backgroundColor: "#0b0b0b",
      padding: 13,
      boxShadow: "0 0 0 1.5px rgba(255,255,255,0.16), 0 0 0 5px #1a1a1a, 0 60px 120px rgba(0,0,0,0.7)",
      fontFamily: FONT,
    }}
  >
    <div style={{ width: "100%", height: "100%", borderRadius: 62, overflow: "hidden", backgroundColor: "#f4f3f0", color: ink, position: "relative" }}>
      <div style={{ position: "absolute", top: 14, left: "50%", marginLeft: -58, width: 116, height: 32, borderRadius: 16, backgroundColor: "#0b0b0b" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "74px 30px 0" }}>
        <span style={{ fontSize: 23, fontWeight: 700, letterSpacing: "-0.03em" }}>HALDEN</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <div style={{ width: 30, height: 2, backgroundColor: ink }} />
          <div style={{ width: 30, height: 2, backgroundColor: ink }} />
        </div>
      </div>
      <div style={{ padding: "44px 30px 0" }}>
        <div style={{ fontSize: 12.5, letterSpacing: "0.2em", fontWeight: 500, color: mute }}>ARCHITEKTUR · MÜNCHEN</div>
        <div style={{ fontSize: 86, lineHeight: 0.94, fontWeight: 620, letterSpacing: "-0.058em", marginTop: 18 }}>
          Räume,
          <br />
          die <span style={{ color: "#9a9a95" }}>bleiben.</span>
        </div>
        <div style={{ fontSize: 18, lineHeight: 1.42, color: "#4a4a47", marginTop: 24 }}>
          Wir planen Häuser, Büros und Orte, die auch in dreißig Jahren noch selbstverständlich wirken.
        </div>
        <div style={{ marginTop: 28, padding: "20px 0", borderRadius: 40, backgroundColor: ink, color: "#fff", fontSize: 18, fontWeight: 500, textAlign: "center" }}>
          Projekt anfragen
        </div>
        <div style={{ marginTop: 28, height: 330, borderRadius: 24, overflow: "hidden" }}>
          <BuildingArt id="ph" style={{ transform: "scale(1.5) translateX(-4%)" }} />
        </div>
      </div>
    </div>
  </div>
);
