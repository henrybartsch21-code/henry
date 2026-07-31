import { Reveal } from "@/components/ui/reveal";

const PROBLEMS = [
  "Die Website sieht aus wie vor sieben Jahren gebaut — das Geschäft dahinter ist es nicht.",
  "Jede Agentur bisher hat ein Template mit neuen Farben geliefert, kein System.",
  "Ladezeiten, mobile Darstellung und Conversion wurden nie als Geschäftsproblem behandelt.",
];

const ANSWERS = [
  "Individuelles Design-System statt Baukasten — entwickelt für genau ein Unternehmen.",
  "Forschung vor Pixeln: Zielgruppen-Interviews, Wettbewerbsanalyse, Content-Strategie.",
  "Performance und Conversion sind Designentscheidungen, kein Nachgedanke.",
];

export function ProblemSolution() {
  return (
    <section className="relative bg-ink-950 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-ember-400">
            Der Ausgangspunkt
          </p>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-bone-100">
            Ihr Geschäft ist exzellent. Ihre Website behauptet das Gegenteil.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-bone-600">
                01 — Was wir immer wieder sehen
              </h3>
            </Reveal>
            <ul className="mt-8 space-y-8 border-t border-ink-700/60">
              {PROBLEMS.map((text, i) => (
                <Reveal key={text} delay={i * 0.08}>
                  <li className="border-b border-ink-700/60 pb-8 pt-8 text-lg leading-relaxed text-bone-400">
                    {text}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ember-400">
                02 — Was SiteCraft anders macht
              </h3>
            </Reveal>
            <ul className="mt-8 space-y-8 border-t border-ink-700/60">
              {ANSWERS.map((text, i) => (
                <Reveal key={text} delay={i * 0.08}>
                  <li className="border-b border-ink-700/60 pb-8 pt-8 text-lg leading-relaxed text-bone-100">
                    {text}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
