"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

export type Lang = "de" | "en";

const dictionary = {
  nav: {
    home: { de: "Hotel", en: "Hotel" },
    rooms: { de: "Zimmer & Suiten", en: "Rooms & Suites" },
    wellness: { de: "Wellness", en: "Wellness" },
    culinary: { de: "Kulinarik", en: "Cuisine" },
    activities: { de: "Aktivitäten", en: "Activities" },
    offers: { de: "Angebote", en: "Offers" },
    contact: { de: "Kontakt", en: "Contact" },
    bookNow: { de: "Verfügbarkeit prüfen", en: "Check availability" },
    menu: { de: "Menü", en: "Menu" },
    close: { de: "Schließen", en: "Close" },
  },
  booking: {
    arrival: { de: "Anreise", en: "Arrival" },
    departure: { de: "Abreise", en: "Departure" },
    guests: { de: "Personen", en: "Guests" },
    guestsValue: { de: "2 Erwachsene", en: "2 adults" },
    submit: { de: "Verfügbarkeit prüfen", en: "Check availability" },
    eyebrow: { de: "Direkt & bestpreis-garantiert", en: "Direct & best-rate guaranteed" },
  },
  common: {
    discover: { de: "Entdecken", en: "Discover" },
    learnMore: { de: "Mehr erfahren", en: "Learn more" },
    from: { de: "ab", en: "from" },
    perNight: { de: "pro Nacht", en: "per night" },
    enquire: { de: "Anfragen", en: "Enquire" },
    viewAll: { de: "Alle ansehen", en: "View all" },
    scroll: { de: "Scrollen", en: "Scroll" },
  },
  footer: {
    tagline: {
      de: "Ein Familienrefugium in den Alpen — seit 1962 mit Herz und Handwerk geführt.",
      en: "A family refuge in the Alps — run with heart and craft since 1962.",
    },
    navTitle: { de: "Navigation", en: "Navigation" },
    contactTitle: { de: "Kontakt", en: "Contact" },
    newsletterTitle: { de: "Alpenpost", en: "Alpine Post" },
    newsletterText: {
      de: "Saisonale Angebote und Bergluft direkt ins Postfach.",
      en: "Seasonal offers and mountain air, straight to your inbox.",
    },
    newsletterCta: { de: "Anmelden", en: "Subscribe" },
    rights: { de: "Alle Rechte vorbehalten.", en: "All rights reserved." },
  },
} as const;

type Section = keyof typeof dictionary;

function translate<S extends Section>(
  section: S,
  key: keyof (typeof dictionary)[S],
  lang: Lang
): string {
  const entry = dictionary[section][key] as Record<Lang, string>;
  return entry[lang];
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <S extends Section>(section: S, key: keyof (typeof dictionary)[S]) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "bergkristall-lang";
let currentLang: Lang = "de";
if (typeof window !== "undefined") {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "de" || stored === "en") currentLang = stored;
}
const listeners = new Set<() => void>();

function getSnapshot(): Lang {
  return currentLang;
}
function getServerSnapshot(): Lang {
  return "de";
}
function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
function setLang(next: Lang) {
  currentLang = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  document.documentElement.lang = next;
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: (section, key) => translate(section, key, lang),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
