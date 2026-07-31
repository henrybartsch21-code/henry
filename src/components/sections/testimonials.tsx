import { Reveal } from "@/components/ui/reveal";

const QUOTES = [
  {
    quote:
      "Wir haben drei Agenturen vorher briefen lassen. Alle drei kamen mit demselben Vorschlag zurück — nur mit anderen Farben. SiteCraft hat als Erste gefragt, warum unsere Investoren uns überhaupt vertrauen, bevor ein einziges Wireframe entstand.",
    name: "Corinna Ahlgren",
    role: "Head of Marketing, Nordlicht Capital",
  },
  {
    quote:
      "Was mich überzeugt hat, war nicht das finale Design — das kam sowieso. Es war, dass jede Entscheidung begründet wurde. Keine Geschmacksfrage, sondern Argumentation. Das gibt es selten in dieser Branche.",
    name: "Julian Verse",
    role: "Gründer, Velis Architecture",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-ink-900 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-16">
          {QUOTES.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1}>
              <div className="flex h-full flex-col">
                <span className="font-display text-5xl leading-none text-ember-500/40">
                  &ldquo;
                </span>
                <p className="mt-4 font-display text-2xl font-medium leading-[1.35] tracking-tight text-bone-100 lg:text-[1.7rem]">
                  {item.quote}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full border border-ink-700 bg-ink-800" />
                  <div>
                    <div className="text-sm font-semibold text-bone-100">
                      {item.name}
                    </div>
                    <div className="text-xs text-bone-600">{item.role}</div>
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
