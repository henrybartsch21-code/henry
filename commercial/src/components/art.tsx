import React from "react";

/**
 * „Produktfotografie" als handgebaute Vektor-Stills — keine Stockbilder,
 * keine generierten Fotos. Jedes Motiv ist ein ruhiges Studio-Arrangement
 * mit kontrolliertem Licht, damit die Mockups wie echte Agenturarbeiten wirken.
 */
type ArtProps = { style?: React.CSSProperties; id?: string };

const fill: React.CSSProperties = { width: "100%", height: "100%", display: "block" };

/** Luxusuhr im Dunkelstudio. */
export const WatchArt: React.FC<ArtProps> = ({ style, id = "w" }) => (
  <svg viewBox="0 0 600 440" preserveAspectRatio="xMidYMid slice" style={{ ...fill, ...style }}>
    <defs>
      <radialGradient id={`${id}bg`} cx="50%" cy="42%" r="75%">
        <stop offset="0" stopColor="#262524" />
        <stop offset="0.55" stopColor="#111110" />
        <stop offset="1" stopColor="#070707" />
      </radialGradient>
      <linearGradient id={`${id}steel`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f6f6f4" />
        <stop offset="0.35" stopColor="#8d8d8a" />
        <stop offset="0.6" stopColor="#e3e3df" />
        <stop offset="1" stopColor="#5d5d5a" />
      </linearGradient>
      <linearGradient id={`${id}strap`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#0c0c0c" />
        <stop offset="0.5" stopColor="#1f1e1d" />
        <stop offset="1" stopColor="#0a0a0a" />
      </linearGradient>
      <radialGradient id={`${id}dial`} cx="42%" cy="36%" r="80%">
        <stop offset="0" stopColor="#23262b" />
        <stop offset="1" stopColor="#0a0b0d" />
      </radialGradient>
    </defs>
    <rect width="600" height="440" fill={`url(#${id}bg)`} />
    <ellipse cx="300" cy="235" rx="230" ry="150" fill="#fff" opacity="0.025" />
    <rect x="246" y="-10" width="108" height="460" rx="10" fill={`url(#${id}strap)`} />
    <rect x="254" y="-10" width="2" height="460" fill="#fff" opacity="0.05" />
    <rect x="344" y="-10" width="2" height="460" fill="#fff" opacity="0.05" />
    <rect x="414" y="208" width="20" height="24" rx="4" fill={`url(#${id}steel)`} />
    <circle cx="300" cy="220" r="122" fill={`url(#${id}steel)`} />
    <circle cx="300" cy="220" r="110" fill="#050505" />
    <circle cx="300" cy="220" r="106" fill={`url(#${id}dial)`} />
    {Array.from({ length: 60 }).map((_, i) => {
      const major = i % 5 === 0;
      const a = (i / 60) * Math.PI * 2;
      const r1 = major ? 84 : 94;
      return (
        <line
          key={i}
          x1={300 + Math.sin(a) * r1}
          y1={220 - Math.cos(a) * r1}
          x2={300 + Math.sin(a) * 99}
          y2={220 - Math.cos(a) * 99}
          stroke={major ? "#e9e9e6" : "#6c6c6a"}
          strokeWidth={major ? 3 : 1}
          strokeLinecap="round"
        />
      );
    })}
    <circle cx="300" cy="262" r="20" fill="none" stroke="#3a3c40" strokeWidth="1.5" />
    <line x1="300" y1="262" x2="300" y2="248" stroke="#bdbdb9" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="300" y1="220" x2="262" y2="176" stroke="#f1f1ee" strokeWidth="5" strokeLinecap="round" />
    <line x1="300" y1="220" x2="356" y2="170" stroke="#f1f1ee" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="300" y1="238" x2="300" y2="132" stroke="#b9b3a6" strokeWidth="1.2" />
    <circle cx="300" cy="220" r="5" fill="#e9e9e6" />
    <path d="M214 150 A110 110 0 0 1 330 114" fill="none" stroke="#fff" strokeWidth="2" opacity="0.14" />
  </svg>
);

/** Präzisionsbauteil — konzentrische Metallringe (Industrie / Engineering). */
export const RingsArt: React.FC<ArtProps> = ({ style, id = "r" }) => (
  <svg viewBox="0 0 700 380" preserveAspectRatio="xMidYMid slice" style={{ ...fill, ...style }}>
    <defs>
      <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#dfe1e3" />
        <stop offset="1" stopColor="#b9bcc0" />
      </linearGradient>
      <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.5" stopColor="#8f949a" />
        <stop offset="1" stopColor="#e9ebed" />
      </linearGradient>
      <linearGradient id={`${id}b`} x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4f5f6" />
        <stop offset="0.5" stopColor="#6d7278" />
        <stop offset="1" stopColor="#d6d9dc" />
      </linearGradient>
      <radialGradient id={`${id}hub`} cx="40%" cy="35%" r="80%">
        <stop offset="0" stopColor="#3b4046" />
        <stop offset="1" stopColor="#101214" />
      </radialGradient>
    </defs>
    <rect width="700" height="380" fill={`url(#${id}bg)`} />
    <ellipse cx="470" cy="330" rx="260" ry="40" fill="#000" opacity="0.12" />
    <g transform="translate(450 180)">
      <circle r="210" fill={`url(#${id}a)`} />
      <circle r="186" fill={`url(#${id}b)`} />
      {Array.from({ length: 36 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="-96"
          x2="0"
          y2="-178"
          stroke={i % 2 ? "#585d63" : "#f5f6f7"}
          strokeWidth="5"
          transform={`rotate(${i * 10 + 4})`}
          opacity="0.75"
        />
      ))}
      <circle r="96" fill={`url(#${id}a)`} />
      <circle r="78" fill={`url(#${id}hub)`} />
      <circle r="30" fill={`url(#${id}b)`} />
      <circle r="12" fill="#15171a" />
    </g>
  </svg>
);

/** Interior-Stillleben: Bogen, Kugel, Sockel in warmem Stein. */
export const ArchArt: React.FC<ArtProps> = ({ style, id = "a" }) => (
  <svg viewBox="0 0 700 460" preserveAspectRatio="xMidYMid slice" style={{ ...fill, ...style }}>
    <defs>
      <linearGradient id={`${id}wall`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e9e1d6" />
        <stop offset="1" stopColor="#cfc3b3" />
      </linearGradient>
      <linearGradient id={`${id}arch`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#c7b299" />
        <stop offset="1" stopColor="#a48c72" />
      </linearGradient>
      <radialGradient id={`${id}ball`} cx="36%" cy="30%" r="80%">
        <stop offset="0" stopColor="#f6f1ea" />
        <stop offset="0.6" stopColor="#cdbfae" />
        <stop offset="1" stopColor="#8f7d69" />
      </radialGradient>
      <linearGradient id={`${id}pl`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#f0e9df" />
        <stop offset="1" stopColor="#b7a892" />
      </linearGradient>
    </defs>
    <rect width="700" height="460" fill={`url(#${id}wall)`} />
    <rect y="350" width="700" height="110" fill="#b9ab98" />
    <rect y="350" width="700" height="2" fill="#fff" opacity="0.25" />
    <path d="M250 352 V190 a100 100 0 0 1 200 0 V352 Z" fill={`url(#${id}arch)`} />
    <path d="M296 352 V196 a54 54 0 0 1 108 0 V352 Z" fill="#8a7560" opacity="0.55" />
    <ellipse cx="520" cy="356" rx="110" ry="12" fill="#000" opacity="0.16" />
    <rect x="470" y="282" width="92" height="70" fill={`url(#${id}pl)`} />
    <circle cx="516" cy="240" r="43" fill={`url(#${id}ball)`} />
    <ellipse cx="170" cy="356" rx="70" ry="9" fill="#000" opacity="0.14" />
    <path d="M150 352 c-14 -40 -8 -78 18 -104 c26 26 32 64 18 104 Z" fill="#2c2824" />
    <path d="M168 250 C150 200 120 170 96 150 M168 250 C176 190 200 150 226 124" stroke="#4b4339" strokeWidth="2.5" fill="none" />
  </svg>
);

/** Sideboard vor heller Wand (Möbelmanufaktur). */
export const SideboardArt: React.FC<ArtProps> = ({ style, id = "s" }) => (
  <svg viewBox="0 0 700 400" preserveAspectRatio="xMidYMid slice" style={{ ...fill, ...style }}>
    <defs>
      <linearGradient id={`${id}wall`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#efeae3" />
        <stop offset="1" stopColor="#d9d1c5" />
      </linearGradient>
      <linearGradient id={`${id}wood`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#c59a6c" />
        <stop offset="1" stopColor="#9c7449" />
      </linearGradient>
      <radialGradient id={`${id}lamp`} cx="38%" cy="32%" r="80%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#d5cbbb" />
      </radialGradient>
    </defs>
    <rect width="700" height="400" fill={`url(#${id}wall)`} />
    <rect y="318" width="700" height="82" fill="#c8bcab" />
    <circle cx="470" cy="120" r="62" fill={`url(#${id}lamp)`} />
    <ellipse cx="350" cy="326" rx="250" ry="12" fill="#000" opacity="0.18" />
    <rect x="150" y="196" width="400" height="104" rx="5" fill={`url(#${id}wood)`} />
    <rect x="150" y="196" width="400" height="5" fill="#fff" opacity="0.25" />
    {[283, 416].map((x) => (
      <rect key={x} x={x} y="202" width="1.5" height="92" fill="#5f432a" opacity="0.6" />
    ))}
    {[176, 520].map((x) => (
      <rect key={x} x={x} y="300" width="5" height="24" fill="#191919" />
    ))}
    <path d="M214 196 c-10 -22 -6 -46 10 -62 c16 16 20 40 10 62 Z" fill="#23211f" />
    <rect x="262" y="172" width="64" height="24" rx="2" fill="#f4f1ec" />
    <rect x="270" y="164" width="48" height="8" rx="2" fill="#2b2a28" />
  </svg>
);

/** Moderne Architektur — klare Volumen in Sichtbeton und Glas. */
export const BuildingArt: React.FC<ArtProps & { variant?: 0 | 1 | 2 }> = ({ style, id = "b", variant = 0 }) => {
  const sky = [
    ["#d5d9dd", "#f0f0ed"],
    ["#d9d4cc", "#f2eee8"],
    ["#c9cfd4", "#e9ebec"],
  ][variant];
  return (
    <svg viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice" style={{ ...fill, ...style }}>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
        <linearGradient id={`${id}glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#20262b" />
          <stop offset="0.55" stopColor="#56626b" />
          <stop offset="1" stopColor="#2a3138" />
        </linearGradient>
        <linearGradient id={`${id}face`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfbf9" />
          <stop offset="1" stopColor="#e4e4e0" />
        </linearGradient>
        <linearGradient id={`${id}sun`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="960" height="560" fill={`url(#${id}sky)`} />
      {variant === 1 ? (
        <g>
          <rect y="430" width="960" height="130" fill="#bdb6ab" />
          <polygon points="250,430 250,150 560,110 560,430" fill={`url(#${id}face)`} />
          <polygon points="560,110 730,170 730,430 560,430" fill="#a9a399" />
          {[0, 1, 2, 3].map((r) => (
            <rect key={r} x="290" y={190 + r * 58} width="232" height="30" fill={`url(#${id}glass)`} />
          ))}
          <rect x="600" y="230" width="90" height="200" fill="#6f6a62" />
        </g>
      ) : variant === 2 ? (
        <g>
          <rect y="440" width="960" height="120" fill="#aeb4b8" />
          <polygon points="120,440 120,280 480,220 840,280 840,440" fill={`url(#${id}face)`} />
          <polygon points="480,220 840,280 840,300 480,240 120,300 120,280" fill="#2a2e32" />
          <rect x="180" y="330" width="600" height="110" fill={`url(#${id}glass)`} />
          {[330, 480, 630].map((x) => (
            <rect key={x} x={x} y="330" width="4" height="110" fill="#e9e9e6" />
          ))}
        </g>
      ) : (
        <g>
          <rect y="452" width="960" height="108" fill="#c2c5c5" />
          <ellipse cx="500" cy="462" rx="420" ry="16" fill="#000" opacity="0.13" />
          <polygon points="330,300 640,300 640,452 330,452" fill="#8d9195" />
          <rect x="372" y="340" width="226" height="112" fill={`url(#${id}glass)`} />
          <polygon points="150,170 760,170 760,310 150,310" fill={`url(#${id}face)`} />
          <polygon points="760,170 880,136 880,280 760,310" fill="#b1b5b8" />
          <polygon points="150,170 760,170 880,136 270,136" fill="#ededea" />
          <rect x="196" y="206" width="520" height="74" fill={`url(#${id}glass)`} />
          {[300, 404, 508, 612].map((x) => (
            <rect key={x} x={x} y="206" width="3" height="74" fill="#eeeeea" />
          ))}
          <rect x="150" y="304" width="610" height="6" fill="#23272b" />
        </g>
      )}
      <rect width="960" height="560" fill={`url(#${id}sun)`} />
    </svg>
  );
};
