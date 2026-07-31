# SiteCraft — Design- & Markenstrategie

> Interne Strategiegrundlage für den Premium-Website-Relaunch. Dieses Dokument ist die
> Entscheidungsgrundlage für Copy, Visuals, Motion und Technik — jede Komponente im Code
> lässt sich auf einen Abschnitt hier zurückführen.

---

## 1. Markenstrategie

**Marke:** SiteCraft
**Branche:** Premium-Digitalagentur (Brand Design, UX/UI, Web-Development, Digital Strategy)
**Angebot:** Markenidentität, digitale Produktdesigns, High-End-Websites, Web-Applikationen,
laufende Optimierung (CRO, Performance, Content)
**Zielgruppe:** Gründer:innen, CEOs und Marketingverantwortliche von wachstumsstarken
Unternehmen (Scale-ups, Premium-D2C-Marken, B2B-Marktführer, Family-Offices, Kanzleien,
Private-Equity-nahe Firmen), deren Offline-Qualität online nicht sichtbar ist.

### Der Kern-Insight

Die meisten Unternehmen in dieser Zielgruppe sind operativ exzellent — aber ihre digitale
Präsenz liegt Jahre hinter ihrem tatsächlichen Niveau zurück. Sie wissen, dass ihre Website
sie unter Wert verkauft, aber jede Agentur, mit der sie bisher gesprochen haben, hat ihnen
ein Template mit ausgetauschten Farben angeboten. Das Problem ist nicht fehlendes Budget,
sondern fehlendes Vertrauen, dass „Premium" tatsächlich geliefert wird.

### Positionierung

**Nicht:** „Wir helfen Unternehmen, online erfolgreich zu sein."
**Sondern:** *„SiteCraft entwirft digitale Flaggschiffe für Marken, die es sich nicht leisten
können, unterschätzt zu werden."*

Der Claim, den SiteCraft besitzt: **Craft statt Copy-Paste.** Während der Markt zwischen
zwei Extremen pendelt — Billig-Baukasten oder überteuerte Konzern-Agentur ohne
Verantwortung für Ergebnisse — positioniert sich SiteCraft als das kleine, obsessiv
präzise Studio, das jede Website wie ein Produkt behandelt: mit Forschung, Prototyping,
Iteration und einem messbaren Ergebnis am Ende.

### Markensäulen

1. **Präzision** — jedes Pixel, jeder Übergang, jeder Satz ist eine Entscheidung, keine
   Voreinstellung.
2. **Beweisbarkeit** — Ergebnisse werden in Zahlen ausgedrückt, nicht in Adjektiven.
3. **Zurückhaltung** — Premium zeigt sich durch Ruhe und Klarheit, nicht durch visuellen Lärm.
4. **Partnerschaft** — SiteCraft liefert nicht „ein Projekt ab", sondern übernimmt mit dem
   Kunden Verantwortung für das Ergebnis.

### Tonalität

Selbstbewusst, präzise, unaufgeregt. Kurze, klare Sätze. Keine Ausrufezeichen-Marketing-
Sprache, keine Buzzwords wie „ganzheitlich" oder „innovativ" ohne Substanz. Der Ton eines
Senior-Beraters, der weiß, was er tut, und das nicht beweisen muss, indem er laut wird.

### Elevator Pitch (Hero-Leitgedanke)

*„Es gibt einen Unterschied zwischen einer Website, die existiert, und einer, die verkauft.
SiteCraft baut Zweiteres."*

---

## 2. Visuelles Konzept

### Farbsystem

Kein Standard-Dark-Mode-Violett-Gradient. Die Palette basiert auf einem tiefen,
warmen Anthrazit (kein reines Schwarz — wirkt technischer und hochwertiger) mit einem
einzigen präzisen Akzent: ein gedämpftes, leicht metallisches Bernstein/Kupfer –
ungewöhnlich genug, um sich von der Blau/Violett-SaaS-Beliebigkeit abzuheben, warm genug,
um „Craft" statt „Tech-Startup" zu signalisieren.

| Token | Hex | Verwendung |
|---|---|---|
| `--ink-950` | `#0A0A0B` | Primärer Hintergrund (kein Pure-Black) |
| `--ink-900` | `#111113` | Sektions-Layering |
| `--ink-800` | `#19191C` | Karten, erhöhte Flächen |
| `--ink-700` | `#242427` | Borders, Trennlinien |
| `--paper-50` | `#FAF9F6` | Heller Kontrast-Hintergrund (Case-Study-Sektion) |
| `--bone-200` | `#E8E6E1` | Primärtext auf dunkel (kein reines Weiß — wärmer) |
| `--bone-400` | `#A8A6A0` | Sekundärtext |
| `--ember-500` | `#C9752F` | Akzent (Ember/Kupfer) — CTAs, Hervorhebungen |
| `--ember-300` | `#E3A768` | Akzent hell, Hover-Zustände |

Kontrast-Strategie: 90 % der Fläche neutral (Ink/Bone), Akzentfarbe wird bewusst
rationiert — max. 1–2 Ember-Flächen pro Sichtfenster. Das erzeugt den „teuren" Effekt:
Farbe als seltenes, gezieltes Signal statt Dauerdekoration.

### Typografie

- **Display/Headlines:** *Bricolage Grotesque* (variabel) — ein markanter, leicht
  unkonventioneller Grotesk mit Charakter in den Kurven. Vermeidet die Klischees
  Poppins/Montserrat/Playfair, wirkt redaktionell und selbstbewusst.
- **Fließtext/UI:** *Inter* — neutral, extrem lesbar, technisch sauber, tritt hinter den
  Headlines zurück.
- **Skala:** groß und selbstbewusst im Hero (clamp 3.5rem–7.5rem), strenge modulare Skala
  darunter (1.25er-Ratio), großzügige Line-Height im Fließtext (1.6), enge Line-Height in
  Headlines (0.95–1.05) mit leicht negativem Letter-Spacing.
- Beide Fonts werden selbst gehostet (Fontsource/npm), keine Drittanbieter-Requests zur
  Laufzeit — bessere Performance, bessere Privacy, kein Google-Fonts-Flackern.

### Spacing & Grid

8-pt-Grundraster, großzügige Sektionsabstände (min. 8–12rem vertikal auf Desktop) —
Weißraum ist das eigentliche Luxus-Signal. 12-Spalten-Grid mit asymmetrischen
Content-Blöcken statt zentrierter Symmetrie überall (vermeidet „Template-Look").

### Motion-Prinzipien

- Easing: benutzerdefinierte `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) für alle
  Reveal-Animationen — schnell beschleunigend, sanft auslaufend. Kein Bounce, kein Spring
  mit sichtbarem Überschwingen (wirkt verspielt statt premium).
  Nichts blinkt, nichts hüpft.
- Reveal: Inhalte faden mit leichtem Y-Offset (16–24px) beim Scrollen ein, gestaffelt
  (Stagger 60–90ms) statt gleichzeitig.
  Nichts blinkt, nichts hüpft.
- Cursor: benutzerdefinierter Ring-Cursor, der sich über interaktiven Elementen vergrößert
  und einfärbt (Ember).
- Magnetische Buttons: primäre CTAs reagieren auf Mausnähe mit einem subtilen
  Transform (max. 8–12px Versatz).
- Parallax: dezent, nur auf Hero-Visual und ausgewählten Bildern (max. 15 % Versatz) —
  Parallax als Textur, nicht als Spielerei.

### Bildsprache

Statt generischer Stockfotos: abstrakte, technische Visuals (generative Canvas-Grafiken,
Wireframe-Meshes, Screen-Mockups in echten Geräte-Frames) und redaktionelle,
licht-getriebene Business-Fotografie in gedeckten Tönen (keine grellen Corporate-Stockfoto-
Lächeln-Bilder).

---

## 3. Sitemap / Seitenstruktur

Single-Page-Flow mit Anchor-Navigation (klassisches Muster für Premium-Agentur-Portfolios,
maximiert Erzähl-Fluss & Conversion-Pfad), plus dedizierte Case-Study-Detailebene:

```
/
├─ Navigation (fixed, transparent → solid on scroll)
├─ #hero            Cinematic Intro, Value Proposition, primärer CTA
├─ #trust           Kundenlogos, Kennzahlen-Leiste
├─ #problem         Problem/Lösung-Gegenüberstellung
├─ #services        3 Leistungsfelder mit visueller Erklärung
├─ #process         4-Phasen-Prozess (Analyse → Strategie → Umsetzung → Optimierung)
├─ #work            Case-Study-Grid (3 Flaggschiff-Projekte)
├─ #testimonials    2 ausführliche O-Töne
├─ #about           Markenstory / Studio-Philosophie
├─ #faq             6 Einwand-Behandlungen
├─ #cta             Premium-Abschluss-CTA (Kontaktformular / Kalender)
└─ Footer           Navigation, Kontakt, Social, Rechtliches
```

---

## 4. Video-Konzepte

Da in dieser Umgebung keine Video-/Kamera-Produktion möglich ist, werden die folgenden
Konzepte als Produktionsbriefing für die tatsächliche Umsetzung dokumentiert. Im Code wird
an denselben Stellen ein gleichwertiges, selbst gebautes Motion-Substitut (generative
Canvas-Animation) eingesetzt, das dieselbe Wirkung ohne Videodatei erzeugt.

### Video 1 — Hero Loop „Continuum"
- **Szene:** Ein abstraktes, sich langsam drehendes Drahtgitter-Mesh aus feinen Linien,
  das sich aus dem Dunkel formt und in ein simples, elegantes Interface-Fragment übergeht.
- **Kamera:** Extrem langsamer Dolly-in (60s Loop), keine harten Schnitte.
- **Stil:** Monochrom Ink mit einzelnen Ember-Akzentlinien, feines Filmkorn-Overlay für
  Tiefe.
- **Animation:** Partikel, die sich zu geometrischen Formen verdichten, dann wieder
  auflösen — Metapher für „aus Chaos wird Struktur".
- **Stimmung:** Ruhig, technisch, hochwertig — kein „hypey" Tech-Startup-Feeling.
- **Technische Umsetzung:** 4K ProRes, gerendert in Cinema 4D/Octane oder Houdini,
  Web-Export als H.265 + AV1-Fallback, `poster`-Frame identisch zum Canvas-Substitut.

### Video 2 — Prozess-Sektion „Precision in Motion"
- **Szene:** Nahaufnahmen von Wireframes, die sich live zu High-Fidelity-UI aufbauen,
  Screen-Recording-Stil aber choreografiert wie ein Produktfilm.
- **Kamera:** Statisch, Fokus auf Screen-Content-Choreografie statt Kamerabewegung.
- **Stil:** Clean UI-Rendering auf einem schwebenden Device-Mockup, Ink-Hintergrund.
- **Animation:** Jede Prozessphase morpht nahtlos in die nächste (Match-Cut).
- **Stimmung:** Methodisch, kontrolliert, vertrauensbildend.
- **Technische Umsetzung:** After-Effects-Screen-Composites, 30fps, WebM/H.264, autoplay
  muted loop, `prefers-reduced-motion`-Fallback als Standbild.

### Video 3 — Case-Study-Reveal „Before/Impact"
- **Szene:** Split-Reveal einer Marke vor/nach dem Relaunch, Wischübergang über ein
  Gerätemockup (Desktop → Mobile).
- **Kamera:** Leichter Orbit um das schwebende Gerätemockup.
- **Stil:** Warmes Studiolicht auf neutralem Grau, Produktfotografie-Ästhetik.
- **Animation:** Zahlen (Ergebnis-KPIs) zählen synchron zur Wischbewegung hoch.
- **Stimmung:** Beweisführend, selbstbewusst, nüchtern-stolz.
- **Technische Umsetzung:** Blender-Rendering für Gerätemockups, Compositing in
  After Effects, Web-Export komprimiert < 3 MB/15s für Performance.

---

## 5. Bild-/Grafik-Konzepte

| # | Zweck | Position | Stil | Generierungs-Prompt |
|---|---|---|---|---|
| 1 | Hero-Visual-Substitut | `#hero` Hintergrund | Generatives Wireframe-Mesh, Canvas-basiert, live im Code | *(nativ gerendert, kein Bild-Asset)* |
| 2 | Case-Study-Cover 1 (FinTech-Scale-up) | `#work` Card 1 | Device-Mockup, dunkles Studio-Setting, Kupfer-Rim-Light | „Minimalist dark studio photograph of a floating laptop and phone mockup displaying a clean fintech dashboard UI, warm copper rim lighting, deep charcoal background, shallow depth of field, premium product photography, 85mm lens, no text overlays" |
| 3 | Case-Study-Cover 2 (Architekturbüro) | `#work` Card 2 | Editorial Architekturfotografie, ruhiges Tageslicht | „Editorial architectural photography, minimalist concrete building facade, soft overcast daylight, muted warm tones, negative space for text overlay, shot on medium format film, no people" |
| 4 | Case-Study-Cover 3 (D2C-Marke) | `#work` Card 3 | Produktfotografie, gedeckte Töne | „Premium product photography, single hero product on textured stone surface, warm directional studio light, deep shadow falloff, minimalist composition, editorial commerce photography" |
| 5 | Über-uns-Portrait | `#about` | Redaktionelles Studio-Portrait, Gegenlicht | „Editorial portrait of a small design studio team reviewing a large screen, backlit window, warm neutral tones, candid unposed moment, documentary photography style" |
| 6 | Prozess-Icons (4x) | `#process` | Custom Line-Icons, kein Icon-Font-Klischee | *(als individuelles SVG-Set im Code, keine Bild-Generierung nötig)* |

---

## 6. Copywriting

Vollständiger Copy-Text lebt direkt in den jeweiligen Komponenten (Quelle der Wahrheit ist
der Code, um Drift zwischen Doku und Live-Text zu vermeiden). Leitplanken:

- Keine Adjektiv-Stapel ohne Beleg („innovativ, kreativ, ganzheitlich").
- Jede Sektion hat genau einen Gedanken, keine Aufzählungs-Beliebigkeit.
- Zahlen statt Behauptungen, wo immer möglich.
- CTAs sind spezifisch („Projekt besprechen", „Case Study ansehen") statt generisch
  („Mehr erfahren").
