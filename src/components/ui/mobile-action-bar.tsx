"use client";

import Link from "next/link";
import { useMobileMenu } from "@/lib/mobile-menu";
import { useLanguage } from "@/lib/i18n";

export function MobileActionBar() {
  const { open, toggle } = useMobileMenu();
  const { t } = useLanguage();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-pine-700 bg-pine-900 text-cream-50 xl:hidden"
      aria-label={t("nav", "menu")}
    >
      <button
        onClick={toggle}
        className="flex flex-col items-center justify-center gap-1 py-3"
        aria-label={open ? t("nav", "close") : t("nav", "menu")}
        aria-expanded={open}
      >
        <span className="flex flex-col gap-1">
          <span className={`h-px w-4 bg-cream-50 transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-4 bg-cream-50 transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </span>
        <span className="text-[10px] uppercase tracking-[0.06em] text-cream-100/70">{t("nav", "menu")}</span>
      </button>

      <a
        href="tel:+43664000000"
        className="flex flex-col items-center justify-center gap-1 border-l border-pine-700 py-3"
      >
        <span aria-hidden="true">📞</span>
        <span className="text-[10px] uppercase tracking-[0.06em] text-cream-100/70">Anruf</span>
      </a>

      <Link
        href="/kontakt"
        className="flex flex-col items-center justify-center gap-1 border-l border-pine-700 py-3 text-[12px] font-medium uppercase tracking-[0.05em]"
      >
        {t("common", "enquire")}
      </Link>

      <Link
        href="/angebote"
        className="flex flex-col items-center justify-center gap-1 border-l border-gold-500 bg-gold-600 py-3 text-[12px] font-medium uppercase tracking-[0.05em] text-cream-50"
      >
        {t("nav", "book")}
      </Link>
    </nav>
  );
}
