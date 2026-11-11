import { existsSync } from "node:fs";
import { Config } from "@remotion/cli/config";

// Master-Qualität für Reels / TikTok / Shorts
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(96);
Config.setCodec("h264");
Config.setCrf(15);
Config.setPixelFormat("yuv420p");
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer("swangle");

// Optional: vorinstallierten Browser verwenden (CI / Cloud-Container).
const localBrowser =
  process.env.REMOTION_BROWSER ??
  "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
if (existsSync(localBrowser)) {
  Config.setBrowserExecutable(localBrowser);
}
