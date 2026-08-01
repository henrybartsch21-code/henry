export type RoomTone = "pine" | "gold" | "stone" | "mist";

export type Room = {
  slug: string;
  name: string;
  category: string;
  size: string;
  guests: string;
  view: string;
  price: number;
  tone: RoomTone;
  description: string;
  amenities: string[];
};

export const rooms: Room[] = [
  {
    slug: "chalet-suite-edelweiss",
    name: "Chalet-Suite Edelweiss",
    category: "Suite",
    size: "58 m²",
    guests: "2–3 Personen",
    view: "Panoramablick auf das Hochtal",
    price: 420,
    tone: "pine",
    description:
      "Altholz, offener Kamin und eine freistehende Kupferwanne mit Blick auf die Gipfelkette — unsere großzügigste Suite unter dem Dach.",
    amenities: ["Offener Kamin", "Freistehende Badewanne", "Private Südbalkon", "Regendusche"],
  },
  {
    slug: "juniorsuite-latschenkiefer",
    name: "Juniorsuite Latschenkiefer",
    category: "Juniorsuite",
    size: "42 m²",
    guests: "2 Personen",
    view: "Blick zum Bergwald",
    price: 340,
    tone: "gold",
    description:
      "Warme Zirbenholz-Täfelung, ein separater Wohnbereich und ein Baldachinbett für Nächte so ruhig wie der Winterwald davor.",
    amenities: ["Zirbenholz-Interieur", "Sitzecke", "Kingsize-Baldachinbett", "Kaffeebar"],
  },
  {
    slug: "doppelzimmer-almrausch",
    name: "Doppelzimmer Almrausch",
    category: "Doppelzimmer",
    size: "28 m²",
    guests: "2 Personen",
    view: "Blick zur Alm",
    price: 240,
    tone: "stone",
    description:
      "Unser klassisches Landhauszimmer — handgefertigte Möbel, dicke Loden-Textilien und ein Fenster, das sich zum Klang der Kuhglocken öffnet.",
    amenities: ["Handgefertigte Möbel", "Loden-Textilien", "Fußbodenheizung", "Bio-Minibar"],
  },
  {
    slug: "familienchalet-steinbock",
    name: "Familienchalet Steinbock",
    category: "Chalet",
    size: "76 m²",
    guests: "bis 5 Personen",
    view: "Eigener Garten & Bergblick",
    price: 560,
    tone: "mist",
    description:
      "Ein freistehendes Chalet mit zwei Schlafebenen, eigener Terrasse und direktem Zugang zur Kinder-Alm — für Familien, die den ganzen Berg wollen.",
    amenities: ["Zwei Schlafebenen", "Eigene Terrasse", "Kamin-Lounge", "Kinderbetten"],
  },
];

export type Offer = {
  slug: string;
  name: string;
  season: "Winter" | "Sommer" | "Ganzjährig";
  nights: number;
  price: number;
  description: string;
  includes: string[];
};

export const offers: Offer[] = [
  {
    slug: "winterzauber",
    name: "Winterzauber in den Alpen",
    season: "Winter",
    nights: 5,
    price: 1490,
    description:
      "Fünf Nächte zwischen Firn und Feuerstelle — inklusive Skipass, geführter Skitour und einem Abend im Spa unter freiem Sternenhimmel.",
    includes: ["5 Übernachtungen im Doppelzimmer", "6-Tages-Skipass", "Geführte Skitour", "1x Abend-Spa privat"],
  },
  {
    slug: "almsommer",
    name: "Almsommer Auszeit",
    season: "Sommer",
    nights: 4,
    price: 980,
    description:
      "Wandern bis zur Almhütte, schwimmen im Bergsee, abends Kulinarik auf der Sonnenterrasse. Vier Nächte im Rhythmus der Berge.",
    includes: ["4 Übernachtungen", "Geführte Almwanderung", "Picknickkorb", "Kräuter-Massage 50 Min."],
  },
  {
    slug: "romantik-gipfelglueck",
    name: "Romantik Gipfelglück",
    season: "Ganzjährig",
    nights: 3,
    price: 890,
    description:
      "Drei Nächte für zwei — Candle-Light-Dinner im Gewölbekeller, Doppelmassage und ein privater Sonnenaufgangs-Transfer zur Bergstation.",
    includes: ["3 Übernachtungen in der Suite", "Candle-Light-Dinner", "Doppelmassage 80 Min.", "Sonnenaufgangs-Transfer"],
  },
];

export type Testimonial = {
  name: string;
  origin: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Julia & Thomas Reinhardt",
    origin: "München, Deutschland",
    quote:
      "Man merkt in jeder Kleinigkeit, dass hier eine Familie mit Herzblut arbeitet — vom Holzstapel am Kamin bis zum handgeschriebenen Willkommensgruß auf dem Zimmer.",
    rating: 5,
  },
  {
    name: "Isabelle Moreau",
    origin: "Lyon, Frankreich",
    quote:
      "Der Blick aus dem Infinity-Pool auf die Gipfelkette bei Sonnenuntergang war der Moment, in dem ich verstanden habe, warum Gäste seit Jahrzehnten wiederkommen.",
    rating: 5,
  },
  {
    name: "Marco Hüttner",
    origin: "Zürich, Schweiz",
    quote:
      "Skitouren am Morgen, Gewölbekeller-Menü am Abend — ein Haus, das Understatement und Genuss auf seltene Weise vereint.",
    rating: 5,
  },
];

export type Activity = {
  name: string;
  duration: string;
  level: string;
  description: string;
};

export const winterActivities: Activity[] = [
  { name: "Skitouren zur Rotwand", duration: "4–5 Std.", level: "Mittel", description: "Geführte Fellaufstiege abseits der Piste, mit Panoramarast auf 2.100 m." },
  { name: "Nachtrodelbahn Hochtal", duration: "2 Std.", level: "Leicht", description: "Fackelabfahrt mit Glühwein-Stopp an der Almhütte." },
  { name: "Eisklettern Gletscherbach", duration: "3 Std.", level: "Anspruchsvoll", description: "Mit zertifiziertem Bergführer an gefrorenen Wasserfällen." },
  { name: "Langlauf Hochtal-Loipe", duration: "Frei wählbar", level: "Leicht–Mittel", description: "12 km klassisch & Skating direkt ab Hotel gespurt." },
];

export const summerActivities: Activity[] = [
  { name: "Almwanderung Steinbockalm", duration: "3 Std.", level: "Leicht", description: "Sanfter Aufstieg zur bewirtschafteten Alm, Jause inklusive." },
  { name: "Klettersteig Gipfelgrat", duration: "5 Std.", level: "Anspruchsvoll", description: "Ausgesetzter Grat mit Bergführer, Rückfahrt per Gondel." },
  { name: "E-Bike Höhenweg", duration: "4 Std.", level: "Mittel", description: "34 km Höhenweg mit Blick über drei Täler." },
  { name: "Bergsee-Yoga", duration: "1,5 Std.", level: "Leicht", description: "Morgensession am Ufer des Hochtalsees, für alle Level." },
];

export const galleryImages = [
  { tone: "pine" as RoomTone, label: "Fassade im Morgenlicht" },
  { tone: "gold" as RoomTone, label: "Infinity-Pool zur Gipfelkette" },
  { tone: "stone" as RoomTone, label: "Gewölbekeller-Restaurant" },
  { tone: "mist" as RoomTone, label: "Chalet-Suite Edelweiss" },
  { tone: "gold" as RoomTone, label: "Saunahaus am Waldrand" },
  { tone: "pine" as RoomTone, label: "Skitour zur Rotwand" },
  { tone: "stone" as RoomTone, label: "Almwanderung im Sommer" },
  { tone: "mist" as RoomTone, label: "Sonnenterrasse zum Frühstück" },
];
