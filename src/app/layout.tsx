import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { Preloader } from "@/components/ui/preloader";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { MobileActionBar } from "@/components/ui/mobile-action-bar";
import { LanguageProvider } from "@/lib/i18n";
import { MobileMenuProvider } from "@/lib/mobile-menu";

const siteUrl = "https://bergkristall-hotel.at";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bergkristall — Alpines Refugium in den Salzburger Alpen",
    template: "%s — Hotel Bergkristall",
  },
  description:
    "Hotel Bergkristall: ein familiengeführtes 5-Sterne-Refugium in den Salzburger Alpen mit Panorama-Spa, Gourmetküche und Zimmern voller Zirbenholz und Weitblick. Seit 1962.",
  keywords: [
    "Alpenhotel",
    "Wellnesshotel Salzburger Land",
    "5 Sterne Hotel Alpen",
    "Chalet Suite",
    "Skiurlaub Hotel",
  ],
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: siteUrl,
    siteName: "Hotel Bergkristall",
    title: "Bergkristall — Alpines Refugium in den Salzburger Alpen",
    description:
      "Ein familiengeführtes 5-Sterne-Refugium in den Salzburger Alpen mit Panorama-Spa, Gourmetküche und Zimmern voller Zirbenholz und Weitblick.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bergkristall — Alpines Refugium in den Salzburger Alpen",
    description:
      "Ein familiengeführtes 5-Sterne-Refugium in den Salzburger Alpen mit Panorama-Spa und Gourmetküche.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1a212b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-cream-50 pb-16 text-ink-700 xl:pb-0">
        <LanguageProvider>
          <MobileMenuProvider>
            <Preloader />
            <SmoothScroll />
            <CustomCursor />
            <GrainOverlay />
            <Navigation />
            {children}
            <Footer />
            <MobileActionBar />
          </MobileMenuProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
