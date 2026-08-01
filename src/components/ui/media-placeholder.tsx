import { cn } from "@/lib/utils";
import type { RoomTone } from "@/lib/hotel-data";

const GRADIENTS: Record<RoomTone, string> = {
  pine: "linear-gradient(155deg, #2f3949 0%, #1a212b 55%, #11151c 100%)",
  gold: "linear-gradient(155deg, #cfa863 0%, #a9803f 55%, #6f5527 100%)",
  stone: "linear-gradient(155deg, #d7c9a6 0%, #b7a37b 55%, #7c6c4c 100%)",
  mist: "linear-gradient(155deg, #eef1e9 0%, #cdd6c4 55%, #8fa08a 100%)",
};

const RIDGE_OPACITY: Record<RoomTone, number> = {
  pine: 0.35,
  gold: 0.22,
  stone: 0.28,
  mist: 0.4,
};

/**
 * Steht anstelle eines echten Foto-Assets: ein generatives Alpen-Gradient
 * mit Bergsilhouette. Kein externer Bild-Host wird angesprochen — der
 * Nutzer ersetzt diese Flächen später durch eigene 4K-Aufnahmen.
 */
export function Photo({
  tone = "pine",
  label,
  className,
  ratio = "aspect-[4/5]",
  showTag = true,
}: {
  tone?: RoomTone;
  label: string;
  className?: string;
  ratio?: string;
  showTag?: boolean;
}) {
  const isSelfPositioned = className?.includes("absolute") || className?.includes("fixed");

  return (
    <div
      className={cn("overflow-hidden", !isSelfPositioned && "relative", ratio, className)}
      style={{ background: GRADIENTS[tone] }}
      role="img"
      aria-label={label}
    >
      <svg
        className="absolute inset-x-0 bottom-0 h-2/3 w-full"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 160 L60 90 L110 130 L165 55 L230 140 L280 75 L340 150 L400 100 L400 200 L0 200 Z"
          fill="#000"
          opacity={RIDGE_OPACITY[tone]}
        />
        <path
          d="M0 190 L80 140 L140 170 L210 110 L260 175 L330 130 L400 170 L400 200 L0 200 Z"
          fill="#000"
          opacity={RIDGE_OPACITY[tone] * 0.7}
        />
      </svg>
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {showTag && (
        <span className="absolute bottom-3 right-3 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-cream-50/80 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
