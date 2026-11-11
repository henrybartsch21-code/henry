import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { rnd } from "../lib/motion";

/** Tiefschwarze Bühne mit einem kaum sichtbaren Lichtakzent. */
export const Stage: React.FC<{ light?: number }> = ({ light = 1 }) => (
  <AbsoluteFill style={{ backgroundColor: "#050505" }}>
    <AbsoluteFill
      style={{
        opacity: light,
        background:
          "radial-gradient(120% 55% at 50% 0%, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0) 70%)",
      }}
    />
  </AbsoluteFill>
);

/** Lebendiges Filmkorn — bricht Banding in dunklen Verläufen und gibt dem Bild Materialität. */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const x = Math.floor(rnd(frame) * 256);
  const y = Math.floor(rnd(frame + 0.5) * 256);
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${staticFile("grain.png")})`,
        backgroundPosition: `${x}px ${y}px`,
        opacity: 0.05,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    />
  );
};
