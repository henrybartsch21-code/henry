import React from "react";
import { Composition } from "remotion";
import { Commercial } from "./Commercial";
import { DURATION, FPS, HEIGHT, WIDTH } from "./timeline";

export const Root: React.FC = () => (
  <Composition
    id="SwelloraCommercial"
    component={Commercial}
    durationInFrames={DURATION * FPS}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
