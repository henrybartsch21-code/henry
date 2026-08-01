import { Hero } from "@/components/sections/hero";
import { AwardsBar } from "@/components/sections/awards-bar";
import { About } from "@/components/sections/about";
import { RoomsTeaser } from "@/components/sections/rooms-teaser";
import { WellnessTeaser } from "@/components/sections/wellness-teaser";
import { CulinaryTeaser } from "@/components/sections/culinary-teaser";
import { OffersTeaser } from "@/components/sections/offers-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { Gallery } from "@/components/sections/gallery";
import { FAQ } from "@/components/sections/faq";
import { CTASection } from "@/components/sections/cta-section";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Hotel Bergkristall",
  description:
    "Familiengeführtes 5-Sterne-Refugium in den Salzburger Alpen mit Panorama-Spa, Gourmetküche und Zimmern voller Zirbenholz und Weitblick.",
  url: "https://bergkristall-hotel.at",
  starRating: { "@type": "Rating", ratingValue: "5" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hochtalweg 12",
    postalCode: "5620",
    addressLocality: "Hochwiesen",
    addressCountry: "AT",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        <AwardsBar />
        <About />
        <RoomsTeaser />
        <WellnessTeaser />
        <CulinaryTeaser />
        <OffersTeaser />
        <Testimonials />
        <Gallery />
        <FAQ />
        <CTASection />
      </main>
    </>
  );
}
