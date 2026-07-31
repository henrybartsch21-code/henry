import { Reveal } from "@/components/ui/reveal";

const CASES = [
  {
    client: "Nordlicht Capital",
    category: "Investment & Asset Management",
    cover: "from-[#1a2c3d] via-[#0f1a24] to-ink-950",
    problem:
      "Ein verwaltetes Vermögen im dreistelligen Millionenbereich, präsentiert auf einer Website, die aussah wie ein studentisches Nebenprojekt.",
    strategy:
      "Redesign als datengetriebenes Vertrauensinstrument: Kennzahlen, Track-Record und Investmentphilosophie visuell gleichwertig zur Markenästhetik.",
    execution:
      "Individuelles Interface-System mit Live-Datenvisualisierung, entwickelt in Next.js mit Fokus auf Ladezeit unter 1 Sekunde.",
    result: "+186 %",
    resultLabel: "qualifizierte Investoren-Anfragen (6 Monate)",
  },
  {
    client: "Velis Architecture",
    category: "Architektur & Städtebau",
    cover: "from-[#3d3226] via-[#1f1a14] to-ink-950",
    problem:
      "Preisgekrönte Projekte, verpackt in ein Standard-Portfolio-Template, das jede visuelle Handschrift des Büros unsichtbar machte.",
    strategy:
      "Editorial-getriebenes Storytelling: großformatige Vollbild-Projektstrecken statt Raster-Galerie, Text als gestalterisches Element.",
    execution:
      "Custom-CMS-gestützte Projektseiten, aufwendige Bild-Choreografie mit scroll-gebundenen Übergängen.",
    result: "3",
    resultLabel: "neue Großprojekte über Website-Anfragen in 6 Monaten",
  },
  {
    client: "Solenne Studio",
    category: "Premium D2C-Marke",
    cover: "from-[#3d2418] via-[#1f140e] to-ink-950",
    problem:
      "Starke stationäre Präsenz, aber die Online-Conversion lag weit unter dem Branchendurchschnitt — Besucher kauften im Laden, nicht online.",
    strategy:
      "Produktseiten neu gedacht als digitales Verkaufsgespräch: Materialität, Herstellung und Wirkung im Zentrum statt reiner Produktfotos.",
    execution:
      "Conversion-optimiertes PDP-System mit A/B-getesteten Kaufpfaden und performanter Bildauslieferung.",
    result: "+94 %",
    resultLabel: "Online-Conversion-Rate im ersten Quartal",
  },
];

export function CaseStudies() {
  return (
    <section id="work" className="relative bg-paper-50 py-32 text-ink-950 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-600">
            Ausgewählte Arbeiten
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink-950">
            Drei Projekte. Drei messbare Ergebnisse.
          </h2>
        </Reveal>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {CASES.map((item, i) => (
            <Reveal key={item.client} delay={i * 0.05}>
              <article className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div
                  className={`relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${item.cover} p-8`}
                >
                  <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:radial-gradient(circle_at_20%_20%,white,transparent_60%)]" />
                  <span className="text-xs uppercase tracking-[0.15em] text-bone-200/70">
                    {item.category}
                  </span>
                  <span className="font-display text-3xl font-semibold text-bone-100">
                    {item.client}
                  </span>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-600/70">
                        Problem
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-800/80">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-600/70">
                        Strategie
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-800/80">
                        {item.strategy}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-600/70">
                        Umsetzung
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-800/80">
                        {item.execution}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-ember-600">
                        Ergebnis
                      </h3>
                      <p className="mt-2 font-display text-3xl font-semibold text-ink-950">
                        {item.result}
                      </p>
                      <p className="text-sm text-ink-800/70">{item.resultLabel}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
