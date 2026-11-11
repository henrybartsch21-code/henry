import React from "react";

/**
 * Gerichtete Bewegungsunschärfe (SVG feGaussianBlur mit getrennten Achsen).
 * Wird nur aktiv, wenn tatsächlich Geschwindigkeit anliegt — sonst kostenneutral.
 */
export const MotionBlur: React.FC<{
  id: string;
  x?: number;
  y?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ id, x = 0, y = 0, style, children }) => {
  const bx = Math.min(30, Math.abs(x));
  const by = Math.min(30, Math.abs(y));
  const active = bx > 0.4 || by > 0.4;
  return (
    <>
      {active ? (
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <filter id={id} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation={`${bx.toFixed(2)} ${by.toFixed(2)}`} />
          </filter>
        </svg>
      ) : null}
      <div style={{ ...style, filter: active ? `url(#${id})` : undefined }}>{children}</div>
    </>
  );
};
