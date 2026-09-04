"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";

const LINKS = [
  { href: "#work", label: "Projekte" },
  { href: "#services", label: "Leistungen" },
  { href: "#process", label: "Prozess" },
  { href: "#gallery", label: "Einblick" },
  { href: "#about", label: "Über uns" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-line-200 bg-surface-0/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
        <a
          href="#hero"
          data-cursor="link"
          className="font-display text-lg font-semibold tracking-tight text-ink-900"
        >
          SiteCraft<span className="text-ember-600">.</span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="link"
              className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-500 transition-colors duration-300 hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Magnetic className="hidden lg:block">
          <a
            href="#cta"
            data-cursor="link"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-[13px] font-medium text-surface-0 transition-colors duration-300 hover:bg-ember-600"
          >
            Projekt starten
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </Magnetic>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label="Menü öffnen"
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-ink-900 transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-ink-900 transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-line-200 bg-surface-0 px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.08em] text-ink-500"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-surface-0"
            >
              Projekt starten →
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
