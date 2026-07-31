import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { GrainOverlay } from "@/components/ui/grain-overlay";

const siteUrl = "https://sitecraft.agency";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SiteCraft — Digitale Flaggschiffe für Marken mit Anspruch",
    template: "%s — SiteCraft",
  },
  description:
    "SiteCraft ist eine Premium-Digitalagentur für Markenidentität, digitales Produktdesign und Web-Development. Wir bauen keine Websites, die existieren — sondern welche, die verkaufen.",
  keywords: [
    "Premium Digitalagentur",
    "Webdesign Agentur",
    "UX UI Design",
    "Markenidentität",
    "Web Development",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "SiteCraft",
    title: "SiteCraft — Digitale Flaggschiffe für Marken mit Anspruch",
    description:
      "Premium-Digitalagentur für Markenidentität, digitales Produktdesign und Web-Development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteCraft — Digitale Flaggschiffe für Marken mit Anspruch",
    description:
      "Premium-Digitalagentur für Markenidentität, digitales Produktdesign und Web-Development.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-ink-950 text-bone-200">
        <SmoothScroll />
        <CustomCursor />
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
