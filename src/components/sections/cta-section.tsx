import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";

export function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-surface-100 py-32 lg:py-48">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-ember-500/15 blur-[140px]" />

      <div className="relative mx-auto max-w-[1000px] px-6 text-center lg:px-12">
        <Reveal>
          <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-600">
            Nächster Schritt
          </p>
          <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-ink-900">
            Lassen Sie uns besprechen, was Ihre Website eigentlich leisten sollte.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-500">
            30 Minuten, keine Verkaufs-Präsentation. Wir hören zu, stellen die
            richtigen Fragen und sagen Ihnen ehrlich, ob wir passen.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Magnetic>
              <a
                href="mailto:hello@sitecraft.agency?subject=Projektanfrage"
                data-cursor="link"
                className="group inline-flex items-center gap-3 rounded-full bg-ink-900 px-8 py-4 text-sm font-semibold text-surface-0 transition-colors duration-300 hover:bg-ember-600"
              >
                Erstgespräch anfragen
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Magnetic>
            <a
              href="tel:+493055501420"
              data-cursor="link"
              className="text-sm font-medium text-ink-500 underline decoration-line-300 underline-offset-8 transition-colors duration-300 hover:text-ink-900 hover:decoration-ember-500"
            >
              +49 30 555 01420
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
