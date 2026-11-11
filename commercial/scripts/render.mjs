/**
 * Master-Render mit echter Bewegungsunschärfe.
 *
 * 1. Tonspur synthetisieren
 * 2. Film mit 180 FPS rendern (3 Zwischenbilder pro Frame)
 * 3. Je 3 Zwischenbilder zu einem Frame verrechnen (360°-Shutter) → 60 FPS,
 *    feines Filmkorn gegen Banding, Ton anlegen
 *
 *   node scripts/render.mjs            → out/svelora-commercial.mp4
 *   node scripts/render.mjs --fast     → ohne Motion Blur (schnelle Vorschau)
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";

const fast = process.argv.includes("--fast");
const run = (cmd, args) => execFileSync(cmd, args, { stdio: "inherit" });
const SAMPLES = 3;
const out = "out/svelora-commercial.mp4";
const master = "out/master-180fps.mp4";

mkdirSync("out", { recursive: true });
run("node", ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "scripts/generate-assets.mts"]);

if (fast) {
  run("npx", ["remotion", "render", "SveloraCommercial", out]);
} else {
  run("npx", ["remotion", "render", "SveloraMaster", master, "--muted", "--crf=10"]);
  run("ffmpeg", [
    "-y", "-hide_banner", "-loglevel", "error", "-stats",
    "-i", master,
    "-i", "public/audio/soundtrack.wav",
    "-vf", `tmix=frames=${SAMPLES}:weights='1 1 1',select='not(mod(n+1\\,${SAMPLES}))',setpts=N/60/TB,noise=alls=3:allf=t`,
    "-r", "60",
    "-c:v", "libx264", "-preset", "slow", "-crf", "19", "-pix_fmt", "yuv420p",
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
    "-c:a", "aac", "-b:a", "320k", "-movflags", "+faststart", "-shortest",
    out,
  ]);
  rmSync(master, { force: true });
}
console.log(`\n✓ ${out}`);
