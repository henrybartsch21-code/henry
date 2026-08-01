"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

const NAV = [
  { href: "/zimmer-suiten", key: "rooms" as const },
  { href: "/wellness", key: "wellness" as const },
  { href: "/kulinarik", key: "culinary" as const },
  { href: "/aktivitaeten", key: "activities" as const },
  { href: "/angebote", key: "offers" as const },
  { href: "/kontakt", key: "contact" as const },
];

const SOCIALS = [
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://www.facebook.com", label: "Facebook" },
  { href: "https://www.pinterest.com", label: "Pinterest" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-line-200 bg-cream-100 pb-10 pt-20">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="font-display text-2xl text-ink-900">
              Bergkristall
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              {t("footer", "tagline")}
            </p>
            <div className="mt-6 flex gap-5">
              {SOCIALS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-[0.08em] text-ink-500 hover:text-gold-600"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
              {t("footer", "navTitle")}
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                  >
                    {t("nav", item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
              {t("footer", "contactTitle")}
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-500">
              <li>
                <a href="mailto:willkommen@bergkristall-hotel.at" className="hover:text-ink-900">
                  willkommen@bergkristall-hotel.at
                </a>
              </li>
              <li>
                <a href="tel:+43664000000" className="hover:text-ink-900">
                  +43 664 000 000
                </a>
              </li>
              <li className="text-ink-400">Hochtalweg 12, 5620 Hochwiesen, Österreich</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
              {t("footer", "newsletterTitle")}
            </h4>
            <p className="mt-5 text-sm text-ink-500">{t("footer", "newsletterText")}</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex border-b border-line-300 pb-2"
            >
              <input
                type="email"
                required
                placeholder="mail@beispiel.com"
                className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
              />
              <button
                type="submit"
                className="shrink-0 text-xs font-medium uppercase tracking-[0.06em] text-gold-600"
              >
                {t("footer", "newsletterCta")}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-200 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Hotel Bergkristall — Familie Brandner. {t("footer", "rights")}</span>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-ink-700">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-ink-700">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
