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

### Farbsystem (v2 — helles Luxus-Theme)

**Update:** Die erste Umsetzung nutzte ein dunkles Anthrazit-Theme. Nach Rückmeldung
wechselt das System auf ein durchgehend **helles** Farbkonzept — reines Weiß als
Basis, warme Sand-/Cremetöne für Layering, derselbe Kupfer-Akzent für
Wiedererkennung. Hell wirkt in dieser Positionierung (Architektur-/Luxury-Brand-
Referenz) zeitloser und weniger „Tech-Startup" als Dark-Mode — näher an
hochwertigen Architekturbüros und Interior-Marken als an SaaS-Produkten.

| Token | Hex | Verwendung |
|---|---|---|
| `--surface-0` | `#FFFFFF` | Primärer Hintergrund |
| `--surface-50` | `#FAF7F1` | Creme — alternierende Sektionen, Layering |
| `--surface-100` | `#F2EAD9` | Sand — Karten, erhöhte Flächen |
| `--surface-200` | `#E8DCC3` | Sand dunkler — Hover-Flächen, Badges |
| `--line-200` | `#E4DBC9` | Borders, Trennlinien auf hellem Grund |
| `--line-300` | `#D8CBAE` | Borders, kräftiger (Karten-Outline) |
| `--ink-900` | `#1E1A14` | Primärtext, Headlines (warmes Fast-Schwarz, kein reines `#000`) |
| `--ink-700` | `#42392C` | Fließtext |
| `--ink-500` | `#7A6E5B` | Sekundärtext, Meta-Informationen |
| `--ember-600` | `#9C5A24` | Akzent auf hellem Grund (dunkler für AA-Kontrast) |
| `--ember-500` | `#C9752F` | Akzent Standard — CTAs, Hervorhebungen, Icons |
| `--ember-100` | `#F3DCC0` | Akzent-Tint — Badge-Hintergründe, dezente Flächen |

Kontrast-Strategie unverändert: 90 % der Fläche neutral (Surface/Ink), Akzentfarbe
bleibt rationiert. Auf Weiß wird der Kupferton eine Stufe dunkler geführt
(`--ember-600` statt `--ember-500` für Text/Icons), um WCAG-AA-Kontrast auf
`#FFFFFF` zu sichern — auf Sand-Flächen bleibt `--ember-500`.

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
├─ #trust           Kundenlogos, Kennzahlen-Leiste, Presse-/Auszeichnungs-Leiste (neu)
├─ #problem         Problem/Lösung-Gegenüberstellung
├─ #services        3 Leistungsfelder mit visueller Erklärung
├─ #process         4-Phasen-Prozess (Analyse → Strategie → Umsetzung → Optimierung)
├─ #work            Case-Study-Grid (4 Flaggschiff-Projekte)
├─ #gallery         Visuelles Moodboard / Studio-Atmosphäre (neu)
├─ #testimonials    2 ausführliche O-Töne
├─ #about           Markenstory / Studio-Philosophie
├─ #faq             7 Einwand-Behandlungen
├─ #cta             Premium-Abschluss-CTA (Kontaktformular / Kalender)
└─ Footer           Navigation, Kontakt, Social, Rechtliches
```

**Änderungshistorie:** v1 nutzte ein dunkles Theme; v2 (dieses Dokument) stellt auf ein
helles, warmes Luxus-Theme um (siehe Abschnitt 2) und ergänzt die `#gallery`-Sektion sowie
eine Presse-/Auszeichnungsleiste in `#trust` — bestehende Inhalte wurden dabei nicht
entfernt, nur erweitert.

---

## 4. Video-Konzepte (v2 — hell, architektonisch, cinematic)

Da in dieser Umgebung keine Video-/Kamera-Produktion möglich ist, werden die folgenden
Konzepte als Produktionsbriefing für die tatsächliche Umsetzung dokumentiert. Im Code wird
an denselben Stellen ein gleichwertiges, selbst gebautes Motion-Substitut (generative
Canvas-/CSS-Animation in der hellen Palette) eingesetzt, das dieselbe Wirkung ohne
Videodatei erzeugt. Vier Platzierungen statt vorher drei — zusätzlich CTA-Sektion.

### Video 1 — Hero Loop „Daylight"
- **Szene:** Ein ruhiges, sich langsam formendes Liniengitter aus feinem Gold-/Kupferdraht
  vor reinweißem Grund — wirkt wie eine architektonische Konstruktionszeichnung, die sich
  in Echtzeit zu einem eleganten Raum zusammensetzt.
- **Kamera:** Extrem langsamer Dolly-in (60s Loop), keine harten Schnitte, minimale
  Parallaxe zwischen Vorder- und Hintergrundlinien.
- **Stil:** Reinweißer Hintergrund, warme Sandtöne im Mittelgrund, Kupferlinien als
  einziger Farbakzent — kein Rauschen, kein Filmkorn (helles Theme verlangt Klarheit statt
  Textur).
- **Animation:** Linien bauen sich in dezenter Choreografie auf, verdichten sich kurz zu
  einem architektonischen Grundriss, lösen sich wieder auf.
- **Stimmung:** Hell, ruhig, präzise — „Morgenlicht in einem Architekturbüro", nicht
  „Tech-Rechenzentrum".
- **Technische Umsetzung:** 4K ProRes, Cinema 4D/Octane oder Houdini, Web-Export H.265 +
  AV1-Fallback, `poster`-Frame identisch zum Canvas-Substitut, das im Code läuft.

### Video 2 — Zwischensektion „Precision in Motion" (Prozess)
- **Szene:** Nahaufnahmen von Wireframes, die sich live zu High-Fidelity-UI aufbauen,
  Screen-Recording-Stil, choreografiert wie ein Produktfilm.
- **Kamera:** Statisch, Fokus auf Screen-Content-Choreografie statt Kamerabewegung.
- **Stil:** Clean UI-Rendering auf schwebendem Device-Mockup, Sand-/Cremehintergrund,
  weiches Studiolicht von links oben.
- **Animation:** Jede Prozessphase morpht nahtlos in die nächste (Match-Cut).
- **Stimmung:** Methodisch, kontrolliert, vertrauensbildend.
- **Technische Umsetzung:** After-Effects-Screen-Composites, 30fps, WebM/H.264, autoplay
  muted loop, `prefers-reduced-motion`-Fallback als Standbild.

### Video 3 — Portfolio-Reveal „Before/Impact" (Case Studies)
- **Szene:** Split-Reveal einer Marke vor/nach dem Relaunch, Wischübergang über ein
  Gerätemockup (Desktop → Mobile), platziert auf einem hellen Studio-Tisch mit Naturholz-
  und Steinelementen.
- **Kamera:** Leichter Orbit um das schwebende Gerätemockup.
- **Stil:** Warmes, diffuses Tageslicht, helle neutrale Flächen, Produktfotografie-Ästhetik
  im Stil hochwertiger Architektur-Portfolios.
- **Animation:** Zahlen (Ergebnis-KPIs) zählen synchron zur Wischbewegung hoch.
- **Stimmung:** Beweisführend, selbstbewusst, nüchtern-stolz.
- **Technische Umsetzung:** Blender-Rendering für Gerätemockups, Compositing in
  After Effects, Web-Export komprimiert < 3 MB/15s für Performance.

### Video 4 — CTA-Sektion „The Room" *(neu)*
- **Szene:** Eine ruhige Kamerafahrt durch einen minimalistischen, lichtdurchfluteten
  Büroraum mit warmen Naturmaterialien (Eiche, Leinen, Stein) — endet auf einem leeren,
  einladenden Schreibtisch mit weichem Gegenlicht, als visuelle Einladung „Platz nehmen,
  lass uns reden".
- **Kamera:** Sehr langsame, stabilisierte Vorwärtsfahrt (Steadicam/Gimbal), 20s Loop.
- **Stil:** Cinematic Lighting, warme Farbtemperatur (3200–4000K), flache Tiefenschärfe.
- **Animation:** Keine UI-Elemente — reine atmosphärische Aufnahme, CTA-Text liegt als
  Overlay darüber.
- **Stimmung:** Einladend, ruhig, exklusiv — reduziert Hemmschwelle vor dem letzten Klick.
- **Technische Umsetzung:** 6K-Rohmaterial, Colorgrading auf warme Mitteltöne, Web-Export
  komprimiert, `autoplay muted loop playsinline`, Standbild-Fallback für
  `prefers-reduced-motion`.

---

## 5. Bild-/Grafik-Konzepte (v2 — erweitert)

| # | Zweck | Position | Stil | Generierungs-Prompt |
|---|---|---|---|---|
| 1 | Hero-Visual-Substitut | `#hero` Hintergrund | Generatives Liniengitter, Canvas-basiert, live im Code (helle Palette) | *(nativ gerendert, kein Bild-Asset)* |
| 2 | Case-Study-Cover 1 (Investment) | `#work` Card 1 | Device-Mockup, helles Studio-Setting, warmes Seitenlicht | „Minimalist bright studio photograph of a floating laptop and phone mockup displaying a clean fintech dashboard UI, warm natural side lighting, soft cream background, shallow depth of field, premium product photography, 85mm lens, no text overlays" |
| 3 | Case-Study-Cover 2 (Architekturbüro) | `#work` Card 2 | Editorial Architekturfotografie, ruhiges Tageslicht | „Editorial architectural photography, minimalist limestone building facade, soft daylight, warm neutral tones, negative space for text overlay, shot on medium format film, no people" |
| 4 | Case-Study-Cover 3 (D2C-Marke) | `#work` Card 3 | Produktfotografie, helle gedeckte Töne | „Premium product photography, single hero product on light travertine surface, warm directional studio light, soft shadow falloff, minimalist composition, editorial commerce photography" |
| 4b | Case-Study-Cover 4 (Life Sciences) *(neu)* | `#work` Card 4 | Laborfotografie, klar und vertrauenswürdig statt klinisch-kalt | „Editorial photography of a modern biotech research lab, soft natural light through large windows, warm neutral tones, scientific equipment softly out of focus, no people, trustworthy and human atmosphere" |
| 5 | Über-uns-Portrait | `#about` | Redaktionelles Studio-Portrait, Gegenlicht durch großes Fenster | „Editorial portrait of a small design studio team reviewing a large screen in a bright loft office, large window backlight, warm neutral tones, candid unposed moment, documentary photography style" |
| 6 | Prozess-Icons (4x) | `#process` | Custom Line-Icons in Kupfer, kein Icon-Font-Klischee | *(als individuelles SVG-Set im Code, keine Bild-Generierung nötig)* |
| 7 | Büro-/Studio-Atmosphäre *(neu)* | `#gallery` Moodboard | Editorial Interior-Fotografie, minimalistisches Studio | „Editorial interior photography of a minimalist design studio, natural oak furniture, linen textures, large windows, soft midday light, warm neutral palette, no people, architectural digest style" |
| 8 | Materialdetail *(neu)* | `#gallery` Moodboard | Makro-Detailaufnahme, Materialität | „Macro photograph of natural materials — travertine stone, brushed copper, raw linen fabric — arranged in a flat lay, soft diffused daylight, warm minimalist palette, editorial texture photography" |
| 9 | Team bei der Arbeit *(neu)* | `#gallery` Moodboard | Dokumentarischer Arbeitsmoment | „Documentary photograph of a designer sketching on paper next to a laptop showing a UI wireframe, bright naturally lit desk, warm tones, shallow depth of field, editorial lifestyle photography, no visible logos" |
| 10 | Auszeichnungs-/Presselogos *(neu)* | `#trust` Presseleiste | Reduzierte Wortmarken, monochrom | *(als Typografie-Set im Code, keine Bild-Generierung nötig)* |

---

## 6. Copywriting

Vollständiger Copy-Text lebt direkt in den jeweiligen Komponenten (Quelle der Wahrheit ist
der Code, um Drift zwischen Doku und Live-Text zu vermeiden). Leitplanken:

- Keine Adjektiv-Stapel ohne Beleg („innovativ, kreativ, ganzheitlich").
- Jede Sektion hat genau einen Gedanken, keine Aufzählungs-Beliebigkeit.
- Zahlen statt Behauptungen, wo immer möglich.
- CTAs sind spezifisch („Projekt besprechen", „Case Study ansehen") statt generisch
  („Mehr erfahren").
