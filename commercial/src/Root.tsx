import React from "react";
import { Composition } from "remotion";
import { Commercial } from "./Commercial";
import { DURATION, FPS, HEIGHT, WIDTH } from "./timeline";

/** Zwischenbilder pro Frame für echte Bewegungsunschärfe im Master-Render. */
export const SAMPLES = 3;

export const Root: React.FC = () => (
  <>
    {/* Vorschau / Studio: 60 FPS mit Ton */}
    <Composition id="SveloraCommercial" component={Commercial} durationInFrames={DURATION * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />
    {/* Master: 180 FPS, wird von scripts/render.mjs zu 60 FPS mit Motion Blur verrechnet */}
    <Composition id="SveloraMaster" component={Commercial} defaultProps={{ withAudio: false }} durationInFrames={DURATION * FPS * SAMPLES} fps={FPS * SAMPLES} width={WIDTH} height={HEIGHT} />
  </>
);
