import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { RoomDetail } from "@/components/sections/room-detail";
import { rooms } from "@/lib/hotel-data";

export const metadata: Metadata = {
  title: "Zimmer & Suiten",
  description:
    "Vier Zimmerkategorien im Hotel Bergkristall — von der Chalet-Suite Edelweiss bis zum Familienchalet Steinbock, jede mit Blick auf die Gipfelkette.",
};

export default function ZimmerSuitenPage() {
  return (
    <main>
      <PageHero
        eyebrow="Zimmer & Suiten"
        title="Vier Rückzugsorte, ein Bergpanorama."
        subtitle="Von der Juniorsuite bis zum freistehenden Familienchalet — jeder Raum ist auf die Gipfelkette ausgerichtet und mit Materialien aus dem eigenen Tal gebaut."
        tone="stone"
        label="Chalet-Suite Edelweiss"
      />
      {rooms.map((room, i) => (
        <RoomDetail key={room.slug} room={room} reverse={i % 2 === 1} />
      ))}
    </main>
  );
}
