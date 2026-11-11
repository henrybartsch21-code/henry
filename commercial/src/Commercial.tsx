import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { Grain, Stage } from "./components/Background";
import { loadFonts } from "./lib/fonts";
import { useT } from "./lib/motion";
import { Scene1Problem } from "./scenes/Scene1Problem";
import { Scene2Difference } from "./scenes/Scene2Difference";
import { Scene3Experience } from "./scenes/Scene3Experience";
import { Scene4Offer } from "./scenes/Scene4Offer";
import { Scene5Payoff } from "./scenes/Scene5Payoff";
import { Scene6Reveal } from "./scenes/Scene6Reveal";
import { T } from "./timeline";

loadFonts();

/** Zeigt eine Szene nur in ihrem Zeitfenster (inkl. Überlappung für nahtlose Übergänge). */
const Window: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const t = useT();
  return t >= from && t < to ? <>{children}</> : null;
};

export const Commercial: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050505", WebkitFontSmoothing: "antialiased", textRendering: "geometricPrecision" }}>
    <Stage />
    <Window from={0} to={T.s1.out + 0.4}>
      <Scene1Problem />
    </Window>
    <Window from={T.s2.in - 0.2} to={T.s2.out + 0.5}>
      <Scene2Difference />
    </Window>
    <Window from={T.s3.in - 0.3} to={T.s3.out + 0.9}>
      <Scene3Experience />
    </Window>
    <Window from={T.s4.title - 0.1} to={T.s4.out + 0.35}>
      <Scene4Offer />
    </Window>
    <Window from={T.s4.preview - 0.1} to={T.s5.out + 0.3}>
      <Scene5Payoff />
    </Window>
    <Window from={T.s6.in} to={31}>
      <Scene6Reveal />
    </Window>
    <Grain />
    <Audio src={staticFile("audio/soundtrack.wav")} />
  </AbsoluteFill>
);
