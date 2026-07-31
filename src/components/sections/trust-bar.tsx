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

export function TrustBar() {
  const loop = [...CLIENTS, ...CLIENTS];

  return (
    <section className="relative border-y border-ink-800 bg-ink-950 py-14">
      <Reveal className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="mb-10 text-center text-xs uppercase tracking-[0.18em] text-bone-600">
          Vertrauen von Unternehmen, die Substanz vor Lautstärke stellen
        </p>
      </Reveal>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent lg:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent lg:w-48" />
        <div className="flex w-max animate-[marquee_36s_linear_infinite] items-center gap-16">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display shrink-0 text-xl font-medium tracking-tight text-bone-600 opacity-70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
