const NAV = [
  { href: "#work", label: "Projekte" },
  { href: "#services", label: "Leistungen" },
  { href: "#process", label: "Prozess" },
  { href: "#gallery", label: "Einblick" },
  { href: "#about", label: "Über uns" },
  { href: "#faq", label: "FAQ" },
];

const SOCIALS = [
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://github.com", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line-200 bg-surface-0 pb-10 pt-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="#hero" className="font-display text-xl font-semibold text-ink-900">
              SiteCraft<span className="text-ember-600">.</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Technisch sauber umgesetzte Websites für Unternehmen, deren
              Qualität online bisher nicht sichtbar war.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
              Kontakt
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-500">
              <li>
                <a href="mailto:hello@sitecraft.agency" className="hover:text-ink-900">
                  hello@sitecraft.agency
                </a>
              </li>
              <li>
                <a href="tel:+493055501420" className="hover:text-ink-900">
                  +49 30 555 01420
                </a>
              </li>
              <li className="text-ink-400">Torstraße 42, 10119 Berlin</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
              Social
            </h4>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-200 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} SiteCraft GmbH. Alle Rechte vorbehalten.</span>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-ink-700">
              Impressum
            </a>
            <a href="/datenschutz" className="hover:text-ink-700">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
