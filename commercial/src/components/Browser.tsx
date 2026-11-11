import React from "react";
import { FONT } from "../lib/fonts";

type BrowserProps = {
  width: number;
  height: number;
  url: string;
  /** 0 = heller (veralteter) Rahmen, 1 = dunkler Premium-Rahmen */
  tone?: number;
  chrome?: number; // Sichtbarkeit der Titelleiste 0..1
  radius?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const BAR = 58;

const lerpColor = (a: [number, number, number], b: [number, number, number], p: number) =>
  `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * p)).join(",")})`;

/** Schwebendes Browserfenster — bewusst monochrom, damit die Website der Star bleibt. */
export const Browser: React.FC<BrowserProps> = ({ width, height, url, tone = 1, chrome = 1, radius = 22, style, children }) => {
  const bar = BAR * chrome;
  return (
    <div
      style={{
        width,
        height: height + bar,
        borderRadius: radius,
        overflow: "hidden",
        backgroundColor: lerpColor([214, 214, 210], [17, 17, 17], tone),
        boxShadow: `0 0 0 1px rgba(255,255,255,${0.1 * chrome}), 0 60px 140px rgba(0,0,0,0.75), 0 0 180px rgba(255,255,255,0.035)`,
        fontFamily: FONT,
        ...style,
      }}
    >
      <div
        style={{
          height: bar,
          opacity: chrome,
          display: "flex",
          alignItems: "center",
          padding: "0 22px",
          gap: 9,
          overflow: "hidden",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: lerpColor([150, 150, 146], [58, 58, 58], tone),
            }}
          />
        ))}
        <div
          style={{
            margin: "0 auto",
            transform: "translateX(-24px)",
            height: 32,
            width: "56%",
            borderRadius: 16,
            backgroundColor: lerpColor([238, 238, 234], [30, 30, 30], tone),
            color: lerpColor([90, 90, 90], [150, 150, 150], tone),
            fontSize: 15,
            letterSpacing: "0.01em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {url}
        </div>
      </div>
      <div style={{ position: "relative", width, height, overflow: "hidden" }}>{children}</div>
    </div>
  );
};
