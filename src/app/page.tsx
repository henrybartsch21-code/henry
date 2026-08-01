import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { CaseStudies } from "@/components/sections/case-studies";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/sections/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SiteCraft",
  description:
    "Premium-Digitalagentur für Markenidentität, digitales Produktdesign und Web-Development.",
  url: "https://sitecraft.agency",
  areaServed: "DE",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Torstraße 42",
    postalCode: "10119",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <Services />
        <Process />
        <CaseStudies />
        <Gallery />
        <Testimonials />
        <About />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
