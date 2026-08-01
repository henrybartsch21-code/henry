import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bergkristall-hotel.at";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/zimmer-suiten`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/wellness`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kulinarik`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/aktivitaeten`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/angebote`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/kontakt`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/impressum`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/datenschutz`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
