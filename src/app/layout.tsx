import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { GrainOverlay } from "@/components/ui/grain-overlay";

const siteUrl = "https://sitecraft.agency";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SiteCraft — Webentwicklung für Marken mit Anspruch",
    template: "%s — SiteCraft",
  },
  description:
    "SiteCraft entwickelt und realisiert moderne Websites mit Fokus auf technische Umsetzung, Performance, Funktionalität und zuverlässige Implementierung.",
  keywords: [
    "Webentwicklung",
    "Website-Entwicklung",
    "Next.js Entwicklung",
    "Performance-Optimierung",
    "CMS-Integration",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "SiteCraft",
    title: "SiteCraft — Webentwicklung für Marken mit Anspruch",
    description:
      "Entwicklung moderner Websites: technische Umsetzung, Performance, CMS-Integration.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteCraft — Webentwicklung für Marken mit Anspruch",
    description:
      "Entwicklung moderner Websites: technische Umsetzung, Performance, CMS-Integration.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-surface-0 text-ink-700">
        <SmoothScroll />
        <CustomCursor />
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
