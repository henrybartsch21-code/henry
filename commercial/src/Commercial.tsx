import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { Ribbons } from "./components/Light";
import { loadFonts, FONT } from "./lib/fonts";
import { E, kf, useT } from "./lib/motion";
import { Card } from "./scenes/Card";
import { Code } from "./scenes/Code";
import { End } from "./scenes/End";
import { Offer } from "./scenes/Offer";
import { Open } from "./scenes/Open";
import { Prompt } from "./scenes/Prompt";
import { T } from "./timeline";

loadFonts();

const Window: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const t = useT();
  return t >= from && t < to ? <>{children}</> : null;
};

export const Commercial: React.FC<{ withAudio?: boolean }> = ({ withAudio = true }) => {
  const t = useT();
  // Lichtbänder: atmen mit der Dramaturgie — aus im Angebot, voll im Finale.
  const energy = kf(t, [
    [0.1, 0], [1.4, 1, E.soft],
    [T.prompt.in, 1], [T.prompt.typeStart, 0.5, E.soft],
    [T.code.in, 0.5], [T.code.in + 0.3, 0.2, E.out],
    [T.card.in, 0.2], [T.card.settled, 0.95, E.out],
    [T.card.out, 0.95], [T.offer.in, 0, E.in],
    [T.offer.free, 0], [T.offer.free + 0.3, 0.35, E.out],
    [T.offer.out, 0.25, E.linear], [T.end.in, 0, E.in],
    [T.end.logo + 1, 0.9, E.soft],
  ]);
  const flash = T.flashes.reduce((a, [at, power]) => (t >= at ? Math.max(a, power * Math.exp(-(t - at) * 11)) : a), 0);
  return (
    <AbsoluteFill style={{ backgroundColor: "#020308", fontFamily: FONT, WebkitFontSmoothing: "antialiased" }}>
      <Ribbons t={t} energy={energy} flip={t >= T.card.in && t < T.offer.in} drift={Math.sin(t * 0.5) * 30} />
      <Window from={0} to={T.open.out + 0.32}><Open /></Window>
      <Window from={T.prompt.in} to={T.prompt.send + 0.36}><Prompt /></Window>
      <Window from={T.code.in} to={T.code.out + 0.14}><Code /></Window>
      <Window from={T.card.in} to={T.card.out + 0.32}><Card /></Window>
      <Window from={T.offer.in} to={T.offer.out + 0.26}><Offer /></Window>
      <Window from={T.end.in} to={99}><End /></Window>
      <AbsoluteFill style={{ background: "radial-gradient(75% 60% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.7) 100%)" }} />
      {flash > 0.004 ? <AbsoluteFill style={{ backgroundColor: "#dfeaff", opacity: flash, mixBlendMode: "screen" }} /> : null}
      {withAudio ? <Audio src={staticFile("audio/soundtrack.wav")} /> : null}
    </AbsoluteFill>
  );
};
