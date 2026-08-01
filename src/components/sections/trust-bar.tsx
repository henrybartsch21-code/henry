import { Reveal } from "@/components/ui/reveal";

const CLIENTS = [
  "Nordlicht Capital",
  "Velis Architecture",
  "Kairo Group",
  "Halstead & Partners",
  "Meridian Labs",
  "Aurel Biotech",
  "Fennimore & Voss",
  "Solenne Studio",
];

const PRESS = [
  "Studio Quarterly",
  "The Craft Review",
  "Brand & Byte",
  "Formwerk Magazin",
  "Blueprint Journal",
];

export function TrustBar() {
  const loop = [...CLIENTS, ...CLIENTS];

  return (
    <section className="relative border-y border-line-200 bg-surface-0 py-14">
      <Reveal className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="mb-10 text-center text-xs uppercase tracking-[0.18em] text-ink-400">
          Vertrauen von Unternehmen, die Substanz vor Lautstärke stellen
        </p>
      </Reveal>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-0 to-transparent lg:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-0 to-transparent lg:w-48" />
        <div className="flex w-max animate-[marquee_36s_linear_infinite] items-center gap-16">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display shrink-0 text-xl font-medium tracking-tight text-ink-400 opacity-80"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-line-200 pt-8">
            <span className="text-[11px] uppercase tracking-[0.15em] text-ink-400">
              Vorgestellt in
            </span>
            {PRESS.map((name) => (
              <span
                key={name}
                className="text-sm font-medium tracking-tight text-ink-500"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
