import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { P2_ARTISTS, getP2Artist } from "../data";
import "../player2.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return P2_ARTISTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = getP2Artist(slug);
  if (!artist) {
    return {};
  }
  return {
    title: `${artist.name} — Player 2 Has Entered The Server`,
    description: `${artist.name} — ${artist.works
      .map((w) => w.title)
      .join(", ")}. Player 2 Has Entered The Server, 21–22 June 2025, Goethe-Institut Thailand.`,
  };
}

export default async function P2ArtistPage({ params }: PageProps) {
  const { slug } = await params;
  const artist = getP2Artist(slug);

  if (!artist) {
    notFound();
  }

  return (
    <main className="p2-page">
      <Link href="/player-2" className="p2-back">
        ← Player 2
      </Link>

      <header className="p2-hero p2-hero-artist">
        <p className="p2-status">
          {artist.section === "exhibition" ? "Exhibition" : "Screening"}
        </p>
        <h1 className="p2-title">{artist.name}</h1>
      </header>

      <section className="p2-section">
        <h2 className="p2-heading">Artist</h2>
        <p className="p2-body">{artist.bio}</p>
      </section>

      <section className="p2-section">
        <h2 className="p2-heading">
          {artist.works.length > 1 ? "Works" : "Work"}
        </h2>
        <div className="p2-credits">
          {artist.works.map((w) => (
            <p key={w.title} className="p2-body">
              <span className="p2-credit-role">{w.title}</span>
              {w.description}
            </p>
          ))}
        </div>
      </section>

      <nav className="p2-section p2-artist-nav">
        {P2_ARTISTS.filter((a) => a.slug !== artist.slug).map((a) => (
          <Link key={a.slug} href={`/player-2/${a.slug}`} className="p2-link">
            {a.name}
          </Link>
        ))}
      </nav>
    </main>
  );
}
