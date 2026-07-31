"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";

const FAQS = [
  {
    q: "Für wen ist SiteCraft die richtige Wahl?",
    a: "Für Unternehmen, die operativ bereits erfolgreich sind, deren digitale Präsenz das aber nicht widerspiegelt. Wir arbeiten am liebsten mit Entscheider:innen, die Design als Investition verstehen, nicht als Kostenpunkt.",
  },
  {
    q: "Wie lange dauert ein typisches Projekt?",
    a: "Zwischen 8 und 14 Wochen, abhängig von Umfang und Anzahl der Unterseiten. Sie erhalten zu Projektbeginn einen verbindlichen Zeitplan mit klaren Meilensteinen.",
  },
  {
    q: "Was kostet ein Projekt bei SiteCraft?",
    a: "Projekte starten ab 18.000 €, die meisten bewegen sich zwischen 30.000 € und 65.000 € — abhängig von Umfang, Custom-Development-Anteil und Content-Erstellung. Nach dem Erstgespräch erhalten Sie ein verbindliches Angebot.",
  },
  {
    q: "Übernehmen Sie auch Content und Copywriting?",
    a: "Ja. Texte, die nicht verkaufen, sind das teuerste Design-Element einer Website. Copywriting ist deshalb fester Bestandteil unseres Prozesses, nicht optional zubuchbar.",
  },
  {
    q: "Was passiert nach dem Launch?",
    a: "Die ersten 90 Tage nach Launch sind in jedem Projekt inklusive: Monitoring, kleinere Anpassungen, Performance-Feintuning. Danach bieten wir optionale, monatliche Optimierungs-Retainer an.",
  },
  {
    q: "Arbeiten Sie mit bestehenden CMS-Systemen?",
    a: "Wir empfehlen headless CMS-Lösungen für maximale Performance, integrieren aber auch in bestehende Systeme, sofern diese die technischen Anforderungen an Ladezeit und Skalierbarkeit erfüllen.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-ink-900 py-32 lg:py-44">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-center text-[13px] font-medium uppercase tracking-[0.18em] text-ember-400">
            Häufige Fragen
          </p>
          <h2 className="text-center font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-bone-100">
            Bevor Sie fragen.
          </h2>
        </Reveal>

        <div className="mt-16 divide-y divide-ink-700/60 border-y border-ink-700/60">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-cursor="link"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-medium text-bone-100 lg:text-xl">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-600 text-bone-400 transition-transform duration-500 ${
                      isOpen ? "rotate-45 border-ember-500 text-ember-400" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-bone-400">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
