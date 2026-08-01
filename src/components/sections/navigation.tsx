"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";
import { useLanguage } from "@/lib/i18n";
import { useMobileMenu } from "@/lib/mobile-menu";

const LINKS = [
  { href: "/", key: "home" as const },
  { href: "/zimmer-suiten", key: "rooms" as const },
  { href: "/wellness", key: "wellness" as const },
  { href: "/kulinarik", key: "culinary" as const },
  { href: "/aktivitaeten", key: "activities" as const },
  { href: "/angebote", key: "offers" as const },
  { href: "/kontakt", key: "contact" as const },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { open, setOpen, toggle } = useMobileMenu();
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const isHome = pathname === "/";

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome || open;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid
            ? "border-b border-line-200 bg-cream-50/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-12">
          <Link
            href="/"
            data-cursor="link"
            className={`font-display text-xl tracking-[0.02em] transition-colors duration-500 ${
              solid ? "text-ink-900" : "text-cream-50"
            }`}
          >
            Bergkristall
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="link"
                className={`text-[13px] font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
                  solid ? "text-ink-500 hover:text-ink-900" : "text-cream-50/85 hover:text-cream-50"
                } ${pathname === link.href ? (solid ? "!text-gold-600" : "!text-cream-50") : ""}`}
              >
                {t("nav", link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div
              className={`hidden items-center gap-1 text-[12px] font-medium uppercase tracking-[0.06em] sm:flex ${
                solid ? "text-ink-500" : "text-cream-50/80"
              }`}
            >
              <button
                onClick={() => setLang("de")}
                className={lang === "de" ? "text-gold-600" : ""}
                aria-current={lang === "de"}
              >
                DE
              </button>
              <span className="opacity-40">/</span>
              <button
                onClick={() => setLang("en")}
                className={lang === "en" ? "text-gold-600" : ""}
                aria-current={lang === "en"}
              >
                EN
              </button>
            </div>

            <Magnetic className="hidden xl:block">
              <Link
                href="/angebote"
                data-cursor="link"
                className="inline-flex items-center gap-2 rounded-sm border border-gold-500 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.06em] text-gold-600 transition-colors duration-300 hover:bg-gold-500 hover:text-cream-50"
                style={!solid ? { color: "#f4eee0", borderColor: "#f4eee0" } : undefined}
              >
                {t("nav", "bookNow")}
              </Link>
            </Magnetic>

            <button
              onClick={toggle}
              className="flex flex-col gap-1.5 xl:hidden"
              aria-label={open ? t("nav", "close") : t("nav", "menu")}
              aria-expanded={open}
            >
              <span
                className={`h-px w-6 transition-transform duration-300 ${solid ? "bg-ink-900" : "bg-cream-50"} ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-6 transition-transform duration-300 ${solid ? "bg-ink-900" : "bg-cream-50"} ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-pine-900 px-8 xl:hidden"
          >
            <nav className="flex flex-col gap-5">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-cream-50"
                  >
                    {t("nav", link.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              href="/angebote"
              onClick={() => setOpen(false)}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-sm border border-gold-300 px-5 py-2.5 text-sm uppercase tracking-[0.06em] text-gold-300"
            >
              {t("nav", "bookNow")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
