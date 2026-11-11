import React from "react";

/**
 * Volumetrische Lichtbänder — die visuelle Signatur des Spots.
 * Auf eine Zeichenfläche in Achtelauflösung gemalt und hochskaliert:
 * butterweich im Bild und schnell im Render.
 */
const K = 8; // Skalierungsfaktor der Zeichenfläche
const RW = 1080 / K;
const RH = 1920 / K;
const PAD = 240 / K;

export const Ribbons: React.FC<{
  t: number;
  energy?: number;
  /** gespiegelte Komposition */
  flip?: boolean;
  drift?: number;
}> = ({ t, energy = 1, flip = false, drift = 0 }) => {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useLayoutEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    const s = (f: number, p: number, a: number) => Math.sin(t * f + p) * a;
    const ribbon = (o: number, ph: number) =>
      new Path2D(
        `M ${-60 + o} ${540} C ${90 + o + s(0.7, ph, 34)} ${400 + s(0.5, ph + 1, 26)}, ${10 + o + s(0.6, ph + 2, 30)} ${250 + s(0.8, ph, 22)}, ${150 + o + s(0.5, ph + 3, 22)} ${190} S ${290 + o + s(0.6, ph + 4, 26)} ${40 + s(0.7, ph, 20)}, ${350 + o} ${-70}`,
      );
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, RW + PAD * 2, RH + PAD * 2);
    ctx.translate(PAD, PAD);
    ctx.scale(4 / K, 4 / K);
    ctx.lineCap = "round";
    const layers: [number, string, string, number, number, number][] = [
      // blur, Farbe, Modus, Breite, Deckkraft, Versatz
      [20, "#1232ff", "source-over", 96, 0.55, 0],
      [20, "#0b1fb8", "source-over", 70, 0.5, 64],
      [9, "#4f8dff", "screen", 38, 0.75, 10],
      [9, "#3a6cf5", "screen", 22, 0.6, 70],
      [3.5, "#d9e8ff", "screen", 9, 0.8, 24],
      [3.5, "#a9c8ff", "screen", 5, 0.6, 80],
    ];
    layers.forEach(([blur, color, mode, width, alpha, o], i) => {
      ctx.filter = `blur(${(blur * 4) / K}px)`;
      ctx.globalCompositeOperation = mode as GlobalCompositeOperation;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke(ribbon(o, i % 2 ? 1.7 : 0));
    });
  }, [t]);
  if (energy <= 0.005) return null;
  return (
    <canvas
      ref={ref}
      width={RW + PAD * 2}
      height={RH + PAD * 2}
      style={{
        position: "absolute",
        left: -PAD * K,
        top: -PAD * K,
        width: (RW + PAD * 2) * K,
        height: (RH + PAD * 2) * K,
        opacity: Math.min(1, energy),
        transform: `${flip ? "scaleX(-1) " : ""}translateY(${drift}px)`,
      }}
    />
  );
};

/** Flutlicht-Flare: heller Kern, Halo und anamorphotischer Streifen. */
export const Flare: React.FC<{ x: number; y: number; power: number; streak?: number }> = ({ x, y, power, streak = 1 }) => {
  if (power <= 0.005) return null;
  const p = Math.min(1.6, power);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0 }}>
      <div
        style={{
          position: "absolute",
          left: -700,
          top: -700,
          width: 1400,
          height: 1400,
          opacity: 0.55 * p,
          background: "radial-gradient(closest-side, rgba(120,165,255,0.5), rgba(40,80,255,0.16) 38%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -1100 * streak,
          top: -9,
          width: 2200 * streak,
          height: 18,
          opacity: 0.9 * p,
          background: "radial-gradient(closest-side, #fff, rgba(190,215,255,0.85) 30%, rgba(90,140,255,0.3) 65%, rgba(90,140,255,0))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -90 * p,
          top: -90 * p,
          width: 180 * p,
          height: 180 * p,
          background: "radial-gradient(closest-side, #fff, rgba(200,222,255,0.85) 22%, rgba(120,165,255,0.25) 55%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
};

export const GLOW = "0 0 24px rgba(110,160,255,0.75)";
export const GLOW_SOFT = "0 0 18px rgba(110,160,255,0.45)";
export const ICE = "#8fbcff";

/** Weiter Lichthof hinter einem Element — als Verlauf statt als teurer Weichzeichner. */
export const Halo: React.FC<{ w: number; h: number; power?: number; color?: string }> = ({ w, h, power = 1, color = "70,120,255" }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width: w,
      height: h,
      marginLeft: -w / 2,
      marginTop: -h / 2,
      opacity: power,
      pointerEvents: "none",
      background: `radial-gradient(closest-side, rgba(${color},0.55), rgba(${color},0.2) 45%, rgba(${color},0) 100%)`,
    }}
  />
);
