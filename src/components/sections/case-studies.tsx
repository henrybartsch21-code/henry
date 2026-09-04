import { Reveal } from "@/components/ui/reveal";

const CASES = [
  {
    client: "Nordlicht Capital",
    category: "Investment & Asset Management",
    cover: "from-[#1a2c3d] via-[#0f1a24] to-[#050b10]",
    problem:
      "Ein verwaltetes Vermögen im dreistelligen Millionenbereich, präsentiert auf einer Website, die aussah wie ein studentisches Nebenprojekt.",
    strategy:
      "Technischer Neuaufbau als datengetriebenes Vertrauensinstrument: Kennzahlen und Track-Record gleichwertig zur bestehenden Markenvorgabe umgesetzt.",
    execution:
      "Individuell entwickeltes Frontend mit Live-Datenvisualisierung, umgesetzt in Next.js mit Fokus auf Ladezeit unter 1 Sekunde.",
    result: "+186 %",
    resultLabel: "qualifizierte Investoren-Anfragen (6 Monate)",
  },
  {
    client: "Velis Architecture",
    category: "Architektur & Städtebau",
    cover: "from-[#3d3226] via-[#1f1a14] to-[#100b06]",
    problem:
      "Preisgekrönte Projekte, verpackt in ein Standard-Portfolio-Template, das die vorhandene Bildsprache des Büros unsichtbar machte.",
    strategy:
      "Technische Konzeption auf Basis der Bildsprache des Büros: großformatige Vollbild-Projektstrecken statt Raster-Galerie, Inhalte redaktionell pflegbar.",
    execution:
      "Headless-CMS-Anbindung für Projektseiten, performante Bildauslieferung mit scroll-gebundenen Übergängen.",
    result: "3",
    resultLabel: "neue Großprojekte über Website-Anfragen in 6 Monaten",
  },
  {
    client: "Solenne Studio",
    category: "Premium D2C-Marke",
    cover: "from-[#3d2418] via-[#1f140e] to-[#100b06]",
    problem:
      "Starke stationäre Präsenz, aber die Online-Conversion lag weit unter dem Branchendurchschnitt — Besucher kauften im Laden, nicht online.",
    strategy:
      "Produktseiten technisch neu aufgebaut: vorhandene Inhalte zu Material und Herstellung in eine strukturierte, conversion-orientierte Seitenlogik überführt.",
    execution:
      "Conversion-optimiertes PDP-System mit A/B-getesteten Kaufpfaden und performanter Bildauslieferung.",
    result: "+94 %",
    resultLabel: "Online-Conversion-Rate im ersten Quartal",
  },
  {
    client: "Aurel Biotech",
    category: "Life Sciences & Forschung",
    cover: "from-[#1c2e24] via-[#101c16] to-[#08100c]",
    problem:
      "Klinisch-nüchterne Kommunikation, die potenzielle Forschungspartner eher abschreckte als überzeugte — Wissenschaft ohne erkennbare Vision.",
    strategy:
      "Vorhandene Forschungsinhalte in eine klare, lesbare Seitenarchitektur überführt, ohne wissenschaftliche Präzision zu verwässern.",
    execution:
      "Interaktive Datenvisualisierungen für Studienergebnisse, mehrsprachiges Content-System für internationale Partner.",
    result: "2",
    resultLabel: "neue Forschungspartnerschaften über Website-Kontakt (4 Monate)",
  },
];

export function CaseStudies() {
  return (
    <section id="work" className="relative bg-surface-50 py-32 text-ink-900 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-600">
            Ausgewählte Projekte
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink-900">
            Vier Umsetzungen. Vier messbare Ergebnisse.
          </h2>
        </Reveal>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {CASES.map((item, i) => (
            <Reveal key={item.client} delay={i * 0.05}>
              <article className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div
                  className={`relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${item.cover} p-8 shadow-[0_20px_45px_-25px_rgba(30,26,20,0.45)]`}
                >
                  <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:radial-gradient(circle_at_20%_20%,white,transparent_60%)]" />
                  <span className="text-xs uppercase tracking-[0.15em] text-surface-0/70">
                    {item.category}
                  </span>
                  <span className="font-display text-3xl font-semibold text-surface-0">
                    {item.client}
                  </span>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                        Problem
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                        Strategie
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                        {item.strategy}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                        Umsetzung
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                        {item.execution}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-ember-600">
                        Ergebnis
                      </h3>
                      <p className="mt-2 font-display text-3xl font-semibold text-ink-900">
                        {item.result}
                      </p>
                      <p className="text-sm text-ink-500">{item.resultLabel}</p>
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
