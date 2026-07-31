"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";

const LINKS = [
  { href: "#work", label: "Arbeiten" },
  { href: "#services", label: "Leistungen" },
  { href: "#process", label: "Prozess" },
  { href: "#about", label: "Studio" },
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
          ? "border-b border-ink-700/60 bg-ink-950/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
        <a
          href="#hero"
          data-cursor="link"
          className="font-display text-lg font-semibold tracking-tight text-bone-100"
        >
          SiteCraft<span className="text-ember-500">.</span>
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="link"
              className="text-[13px] font-medium uppercase tracking-[0.08em] text-bone-400 transition-colors duration-300 hover:text-bone-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Magnetic className="hidden lg:block">
          <a
            href="#cta"
            data-cursor="link"
            className="group inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-900/60 px-5 py-2.5 text-[13px] font-medium text-bone-100 transition-colors duration-300 hover:border-ember-500/60 hover:text-ember-300"
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
            className={`h-px w-6 bg-bone-200 transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-bone-200 transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-700/60 bg-ink-950 px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.08em] text-bone-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-ember-500/60 px-5 py-2.5 text-sm font-medium text-ember-300"
            >
              Projekt starten →
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
