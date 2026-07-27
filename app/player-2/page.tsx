import type { Metadata } from "next";
import Link from "next/link";
import { bySection, type P2Artist } from "./data";
import "./player2.css";

export const metadata: Metadata = {
  title: "Player 2 Has Entered The Server",
  description:
    "Player 2 Has Entered The Server — an event about games, co-presence, and the politics of play. 21–22 June 2025, Goethe-Institut Thailand. Organized by Stack in collaboration with the Goethe-Institut Bangkok.",
  openGraph: {
    title: "Player 2 Has Entered The Server — Stack",
    description:
      "An event about games, co-presence, and the politics of play. 21–22 June 2025, Goethe-Institut Thailand.",
  },
};

const ANNOUNCEMENT_POST = "https://www.instagram.com/p/DKj-5xpShzS/";
const PHOTOS_POST = "https://www.instagram.com/p/DMIlv3jytE3/";

const SPECIAL_THANKS = [
  "June Sivaporn",
  "Cattleya Paosrijaroen",
  "Teeradech Panyasak",
  "Lee Anantawat",
  "Bangkok CityCity Gallery",
  "Latthapol K.",
  "Ken Soken",
  "Phakavadee Deechuay",
  "Pannawat Sertsuwankul",
  "Johannes Hossfeld",
  "Kannikar Saengsuwan",
  "Kullaya Wapinanon",
  "Damisa Lakkanapinit",
  "Shontisha Yara Rücker",
  "Phatarawadee Phataranawik",
  "Nitcha Tothong",
];

function ProgrammeSection({
  title,
  artists,
}: {
  title: string;
  artists: P2Artist[];
}) {
  return (
    <section className="p2-section">
      <h2 className="p2-heading">{title}</h2>
      {artists.length === 0 ? (
        <p className="p2-body p2-tbd">Lineup being restored from the logs…</p>
      ) : (
        <div className="p2-roster">
          {artists.map((artist) => (
            <Link
              key={artist.slug}
              href={`/player-2/${artist.slug}`}
              className="p2-card"
            >
              <span className="p2-card-name">{artist.name}</span>
              <span className="p2-card-works">
                {artist.works.map((w) => w.title).join(" · ")}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Player2Page() {
  return (
    <main className="p2-page">
      <Link href="/" className="p2-back">
        ← Stack
      </Link>

      <header className="p2-hero">
        <p className="p2-status">Archive · Session ended</p>
        <h1 className="p2-title">
          Player 2 Has Entered <em>The Server</em>
        </h1>
        <p className="p2-tagline">
          An event about games, co-presence, and the politics of play.
        </p>
        <div className="p2-meta">
          <span>21–22 June 2025</span>
          <span>Goethe-Institut Thailand</span>
          <span>Organized by Stack × Goethe-Institut Bangkok</span>
        </div>
      </header>

      <section className="p2-section">
        <h2 className="p2-heading">About</h2>
        <p className="p2-body">
          In a world increasingly shaped by code, competition, and co-op modes,
          Player 2 Has Entered The Server explores how Thai and international
          artists engage with video games — not merely as media, but as
          metaphors, social arenas, and systems of meaning.
        </p>
        <p className="p2-body">
          Organized by Stack, in collaboration with the Goethe-Institut
          Bangkok, this exhibition brought together works that employ the
          grammar of gaming — avatars, mechanics, environments, and interfaces
          — to investigate human relationships, digital labor, surveillance,
          identity, and resistance. Spanning film screenings (machinima),
          installations, workshops, talks, and audiovisual performances, the
          two-day event reminds us that every player enters a system already in
          motion.
        </p>
      </section>

      <ProgrammeSection title="Exhibition" artists={bySection("exhibition")} />
      <ProgrammeSection title="Screening" artists={bySection("screening")} />

      <section className="p2-section">
        <h2 className="p2-heading">Formats</h2>
        <ul className="p2-formats">
          <li>Machinima screenings</li>
          <li>Installations</li>
          <li>Workshops</li>
          <li>Talks</li>
          <li>Audiovisual performances</li>
        </ul>
      </section>

      <section className="p2-section">
        <h2 className="p2-heading">Credits</h2>
        <div className="p2-credits">
          <p className="p2-body">
            <span className="p2-credit-role">Photos</span>
            Ben Pipat (
            <a
              className="p2-link"
              href="https://www.instagram.com/frameofchaos/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @frameofchaos
            </a>
            )
          </p>
          <p className="p2-body">
            <span className="p2-credit-role">Sponsors &amp; supporters</span>
            Fantasy Unit Company Limited · Speedy Grandma · Isaac Sullivan ·
            Kalaya Kovidvisith
          </p>
          <p className="p2-body">
            <span className="p2-credit-role">Special thanks</span>
            {SPECIAL_THANKS.join(" · ")}
          </p>
        </div>
      </section>

      <section className="p2-section">
        <h2 className="p2-heading">Logs</h2>
        <p className="p2-body">
          <a
            className="p2-link"
            href={ANNOUNCEMENT_POST}
            target="_blank"
            rel="noopener noreferrer"
          >
            Announcement post
          </a>{" "}
          ·{" "}
          <a
            className="p2-link"
            href={PHOTOS_POST}
            target="_blank"
            rel="noopener noreferrer"
          >
            Event photos
          </a>{" "}
          — on Instagram{" "}
          <a
            className="p2-link"
            href="https://www.instagram.com/stack_xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @stack_xyz
          </a>
        </p>
      </section>

      <footer className="p2-footer">
        Player 2 Has Entered The Server was organized by Stack in collaboration
        with the Goethe-Institut Bangkok, 21–22 June 2025.
      </footer>
    </main>
  );
}
