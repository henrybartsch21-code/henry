import { Reveal } from "@/components/ui/reveal";

const QUOTES = [
  {
    quote:
      "Wir haben vorher drei Anbieter briefen lassen. Alle drei kamen mit demselben Vorschlag zurück — nur mit anderen Farben. SiteCraft hat als Erste gefragt, was die Seite technisch leisten muss, bevor die erste Zeile Code entstand.",
    name: "Corinna Ahlgren",
    role: "Head of Marketing, Nordlicht Capital",
  },
  {
    quote:
      "Was mich überzeugt hat, war nicht das fertige Ergebnis — das kam sowieso. Es war, dass jede technische Entscheidung begründet wurde. Keine Geschmacksfrage, sondern Argumentation. Das gibt es selten in dieser Branche.",
    name: "Julian Verse",
    role: "Gründer, Velis Architecture",
  },
  {
    quote:
      "Unsere Forschung ist komplex. Die alte Website hat das mit noch mehr Komplexität beantwortet. SiteCraft hat die Inhalte lesbar strukturiert, ohne sie zu vereinfachen — genau die Balance, die wir bei drei anderen Anbietern vermisst haben.",
    name: "Dr. Nadine Oskar",
    role: "Head of Communications, Aurel Biotech",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-surface-0 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-3 lg:gap-12">
          {QUOTES.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1}>
              <div className="flex h-full flex-col">
                <span className="font-display text-5xl leading-none text-ember-500/40">
                  &ldquo;
                </span>
                <p className="mt-4 font-display text-xl font-medium leading-[1.4] tracking-tight text-ink-900 lg:text-[1.35rem]">
                  {item.quote}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full border border-line-300 bg-surface-100" />
                  <div>
                    <div className="text-sm font-semibold text-ink-900">
                      {item.name}
                    </div>
                    <div className="text-xs text-ink-400">{item.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
