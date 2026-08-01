"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";

const FAQS = [
  {
    q: "Ab wann ist der Check-in möglich?",
    a: "Check-in ist ab 15:00 Uhr, Check-out bis 11:00 Uhr. Bei früherer Anreise oder späterer Abreise sprechen Sie uns gerne an — nach Verfügbarkeit richten wir uns nach Ihnen.",
  },
  {
    q: "Sind Hunde bei Ihnen willkommen?",
    a: "Ja, gepflegte Hunde sind in den meisten Zimmerkategorien willkommen. Bitte geben Sie dies bei der Buchung an, damit wir das passende Zimmer reservieren können.",
  },
  {
    q: "Ist der Zugang zum Spa im Zimmerpreis inbegriffen?",
    a: "Der Zugang zum 1.200 m² großen Panorama-Spa mit Pool und Saunalandschaft ist für alle Hausgäste im Übernachtungspreis inklusive.",
  },
  {
    q: "Bieten Sie Halbpension oder All-inclusive an?",
    a: "Standardmäßig buchen Sie bei uns mit Halbpension (Almfrühstück & 5-Gänge-Abendmenü). Vollpension und individuelle Verpflegungspläne sind auf Anfrage möglich.",
  },
  {
    q: "Wie weit ist die nächste Skipiste entfernt?",
    a: "Der Skilift liegt 400 m vom Haus entfernt, unser hauseigener Skibus bringt Sie in der Wintersaison kostenfrei alle 15 Minuten dorthin.",
  },
  {
    q: "Wie flexibel sind Stornierungen?",
    a: "Bis 14 Tage vor Anreise können Sie kostenfrei stornieren. Bei den meisten Pauschalangeboten gelten abweichende, in der Angebotsbeschreibung genannte Fristen.",
  },
  {
    q: "Gibt es kostenfreie Parkplätze?",
    a: "Ja, Hausgästen stehen überdachte Stellplätze sowie Lademöglichkeiten für Elektrofahrzeuge kostenfrei zur Verfügung.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-cream-50 py-28 lg:py-40">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-center text-[13px] font-medium uppercase tracking-[0.18em] text-gold-600">
            Häufige Fragen
          </p>
          <h2 className="text-center font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
            Bevor Sie anreisen.
          </h2>
        </Reveal>

        <div className="mt-16 divide-y divide-line-200 border-y border-line-200">
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
                  <span className="font-display text-lg text-ink-900 lg:text-xl">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-300 text-ink-500 transition-transform duration-500 ${
                      isOpen ? "rotate-45 border-gold-500 text-gold-600" : ""
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
                      <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-ink-500">
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
