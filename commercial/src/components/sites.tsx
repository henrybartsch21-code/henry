import React from "react";
import { FONT } from "../lib/fonts";
import { ArchArt, RingsArt, WatchArt } from "./art";

/** Inhaltsfläche der schwebenden Website-Karten in Szene 3. */
export const CARD_W = 780;
export const CARD_H = 1040;

type SiteProps = { parallax?: number };

const page = (bg: string, color: string): React.CSSProperties => ({
  width: CARD_W,
  height: CARD_H,
  backgroundColor: bg,
  color,
  fontFamily: FONT,
  position: "relative",
  overflow: "hidden",
});

/** 1 — Luxusmarke mit minimalistischer Produktpräsentation */
export const LuxurySite: React.FC<SiteProps> = ({ parallax = 0 }) => (
  <div style={page("#0a0a0a", "#f4f2ee")}>
    <div style={{ height: 92, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 44px", fontSize: 15, letterSpacing: "0.08em", color: "#a5a29c" }}>
      <span>KOLLEKTION</span>
      <span style={{ fontSize: 23, letterSpacing: "0.42em", color: "#f4f2ee", fontWeight: 500, marginRight: "-0.42em" }}>AURÈLE</span>
      <span>BOUTIQUE</span>
    </div>
    <div style={{ height: 560, margin: "0 0", overflow: "hidden" }}>
      <WatchArt id="lux" style={{ transform: `scale(1.12) translateX(${parallax * 26}px)` }} />
    </div>
    <div style={{ padding: "50px 44px 0" }}>
      <div style={{ fontSize: 14, letterSpacing: "0.22em", color: "#8f8b84" }}>CALIBRE 07 — AUTOMATIK</div>
      <div style={{ fontSize: 66, lineHeight: 1.04, fontWeight: 300, letterSpacing: "-0.035em", marginTop: 20 }}>
        Zeit, in ihrer
        <br />
        schönsten Form.
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 44 }}>
        <span style={{ fontSize: 19, color: "#a5a29c" }}>ab 8.400 €</span>
        <span style={{ fontSize: 16, letterSpacing: "0.04em", padding: "17px 34px", borderRadius: 40, border: "1px solid rgba(244,242,238,0.5)" }}>
          Entdecken →
        </span>
      </div>
    </div>
  </div>
);

/** 2 — Moderne Unternehmenswebsite */
export const CorporateSite: React.FC<SiteProps> = ({ parallax = 0 }) => (
  <div style={page("#f3f4f5", "#0e1012")}>
    <div style={{ height: 92, display: "flex", alignItems: "center", padding: "0 44px", fontSize: 16, color: "#5b6066" }}>
      <div style={{ width: 22, height: 22, backgroundColor: "#0e1012", borderRadius: 5, marginRight: 12 }} />
      <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-0.02em", color: "#0e1012" }}>NORDWERK</span>
      <span style={{ marginLeft: "auto" }}>Lösungen</span>
      <span style={{ marginLeft: 30 }}>Branchen</span>
      <span style={{ marginLeft: 30 }}>Karriere</span>
      <span style={{ marginLeft: 30, padding: "11px 22px", borderRadius: 30, backgroundColor: "#0e1012", color: "#fff", fontWeight: 500 }}>Kontakt</span>
    </div>
    <div style={{ padding: "46px 44px 0" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500, padding: "8px 16px", borderRadius: 30, backgroundColor: "#e3e5e8", color: "#3d4248" }}>
        <span style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: "#0e1012" }} />
        Automation · Antriebstechnik
      </div>
      <div style={{ fontSize: 72, lineHeight: 1.0, fontWeight: 650, letterSpacing: "-0.05em", marginTop: 26 }}>
        Präzision für
        <br />
        die Industrie
        <br />
        <span style={{ color: "#8b9198" }}>von morgen.</span>
      </div>
      <div style={{ fontSize: 20, lineHeight: 1.45, color: "#5b6066", marginTop: 26, width: 560 }}>
        Wir entwickeln Fertigungssysteme, die leiser laufen, länger halten und sich rechnen.
      </div>
    </div>
    <div style={{ margin: "40px 44px 0", height: 330, borderRadius: 20, overflow: "hidden" }}>
      <RingsArt id="corp" style={{ transform: `scale(1.1) translateX(${parallax * 22}px)` }} />
    </div>
    <div style={{ display: "flex", padding: "34px 44px 0", gap: 0 }}>
      {[
        ["25+", "Jahre Erfahrung"],
        ["140", "Anlagen im Einsatz"],
        ["12", "Länder"],
      ].map(([n, l]) => (
        <div key={l} style={{ flex: 1 }}>
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em" }}>{n}</div>
          <div style={{ fontSize: 15, color: "#6d7278", marginTop: 4 }}>{l}</div>
        </div>
      ))}
    </div>
  </div>
);

/** 3 — Elegante Dienstleistungswebsite */
export const ServiceSite: React.FC<SiteProps> = ({ parallax = 0 }) => (
  <div style={page("#f1ece5", "#1d1a17")}>
    <div style={{ height: 92, display: "flex", alignItems: "center", padding: "0 44px", fontSize: 16, color: "#6f665c" }}>
      <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", color: "#1d1a17" }}>Studio Marén</span>
      <span style={{ marginLeft: "auto" }}>Projekte</span>
      <span style={{ marginLeft: 30 }}>Leistungen</span>
      <span style={{ marginLeft: 30, color: "#1d1a17", borderBottom: "1px solid #1d1a17", paddingBottom: 3 }}>Termin vereinbaren</span>
    </div>
    <div style={{ padding: "40px 44px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div>
        <div style={{ fontSize: 13.5, letterSpacing: "0.2em", color: "#8a8073" }}>INTERIOR DESIGN · HAMBURG</div>
        <div style={{ fontSize: 80, lineHeight: 0.98, fontWeight: 450, letterSpacing: "-0.05em", marginTop: 22 }}>
          Räume mit
          <br />
          ruhiger Hand.
        </div>
      </div>
      <div style={{ width: 66, height: 66, borderRadius: 33, backgroundColor: "#1d1a17", color: "#f1ece5", fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
        ↓
      </div>
    </div>
    <div style={{ margin: "44px 44px 0", height: 400, borderRadius: "346px 346px 18px 18px", overflow: "hidden" }}>
      <ArchArt id="svc" style={{ transform: `scale(1.12) translateX(${parallax * 22}px)` }} />
    </div>
    <div style={{ padding: "22px 44px 0", fontSize: 21 }}>
      {[
        ["01", "Konzept & Beratung"],
        ["02", "Planung & Material"],
        ["03", "Umsetzung"],
      ].map(([n, l]) => (
        <div key={n} style={{ display: "flex", alignItems: "center", padding: "19px 0", borderBottom: "1px solid rgba(29,26,23,0.16)" }}>
          <span style={{ width: 62, fontSize: 14, color: "#8a8073", letterSpacing: "0.08em" }}>{n}</span>
          <span style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>{l}</span>
          <span style={{ marginLeft: "auto", color: "#8a8073" }}>→</span>
        </div>
      ))}
    </div>
  </div>
);
