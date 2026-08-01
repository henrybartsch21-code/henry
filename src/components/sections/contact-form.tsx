"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";

function ContactFormInner() {
  const params = useSearchParams();
  const presetRoom = params.get("zimmer");
  const presetOffer = params.get("angebot");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
      <Reveal>
        <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-600">
          Anfrage
        </p>
        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink-900">
          Schreiben Sie uns.
        </h2>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-500">
          Wir antworten in der Regel innerhalb eines Tages persönlich —
          nicht per Autoresponder.
        </p>

        <dl className="mt-10 space-y-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-[0.08em] text-ink-400">Adresse</dt>
            <dd className="mt-1 text-ink-700">Hochtalweg 12, 5620 Hochwiesen, Österreich</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.08em] text-ink-400">Telefon</dt>
            <dd className="mt-1"><a href="tel:+43664000000" className="text-ink-700 hover:text-gold-600">+43 664 000 000</a></dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.08em] text-ink-400">E-Mail</dt>
            <dd className="mt-1"><a href="mailto:willkommen@bergkristall-hotel.at" className="text-ink-700 hover:text-gold-600">willkommen@bergkristall-hotel.at</a></dd>
          </div>
        </dl>

        <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-sm border border-line-200 bg-cream-100">
          <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 300" aria-hidden="true">
            <path d="M0 200 L60 140 L120 190 L200 100 L260 180 L340 130 L400 190" stroke="#8f6f38" strokeWidth="2" fill="none" />
            <path d="M0 240 L100 220 L180 260 L280 210 L400 240" stroke="#a89d80" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
            <circle cx="200" cy="100" r="5" fill="#b5904f" />
          </svg>
          <span className="absolute bottom-3 left-3 rounded-full bg-black/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-ink-700/80">
            Anfahrtsskizze — eigene Karte einbinden
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        {sent ? (
          <div className="flex h-full flex-col items-start justify-center rounded-sm border border-line-200 bg-cream-100 p-10">
            <h3 className="font-display text-2xl text-ink-900">Danke für Ihre Anfrage!</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-500">
              Dies ist eine Demo-Website ohne angebundenes Buchungssystem —
              in Produktion würde diese Anfrage jetzt an unser Reservierungsteam
              gesendet.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            {(presetRoom || presetOffer) && (
              <p className="rounded-sm bg-cream-100 px-4 py-3 text-sm text-ink-700">
                {presetRoom && <>Anfrage zu: <strong>{presetRoom.replace(/-/g, " ")}</strong></>}
                {presetOffer && <>Anfrage zu Angebot: <strong>{presetOffer.replace(/-/g, " ")}</strong></>}
              </p>
            )}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">Name</span>
                <input required type="text" className="border-0 border-b border-line-300 bg-transparent pb-2 text-sm text-ink-900 outline-none focus:border-gold-500" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">E-Mail</span>
                <input required type="email" className="border-0 border-b border-line-300 bg-transparent pb-2 text-sm text-ink-900 outline-none focus:border-gold-500" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">Anreise</span>
                <input type="date" className="border-0 border-b border-line-300 bg-transparent pb-2 text-sm text-ink-900 outline-none focus:border-gold-500" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">Abreise</span>
                <input type="date" className="border-0 border-b border-line-300 bg-transparent pb-2 text-sm text-ink-900 outline-none focus:border-gold-500" />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">Nachricht</span>
              <textarea rows={4} className="border-0 border-b border-line-300 bg-transparent pb-2 text-sm text-ink-900 outline-none focus:border-gold-500" />
            </label>
            <Magnetic>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-sm bg-pine-900 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.05em] text-cream-50 transition-colors duration-300 hover:bg-gold-600"
              >
                Anfrage senden
              </button>
            </Magnetic>
          </form>
        )}
      </Reveal>
    </div>
  );
}

export function ContactForm() {
  return (
    <section className="relative bg-cream-50 py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <Suspense fallback={null}>
          <ContactFormInner />
        </Suspense>
      </div>
    </section>
  );
}
