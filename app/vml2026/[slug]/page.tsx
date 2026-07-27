import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StackMenu } from "@/components/StackMenu";
import { ARTISTS, getArtist } from "../data";
import VmlCursor from "../VmlCursor";
import "../vml.css";

const V = "/vmlAssets/Visual";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ARTISTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) {
    return {};
  }
  return {
    title: `${artist.name} — Transitional Images`,
    description: `${artist.name} — ${artist.works
      .map((w) => w.title)
      .join(", ")}. Vietnam Media Show: Transitional Images, Stack V_Circuits, 7 August 2026, Goethe Saal.`,
    openGraph: {
      title: `${artist.name} — Transitional Images`,
      images: [artist.artwork],
    },
  };
}

export default async function VmlArtistPage({ params }: PageProps) {
  const { slug } = await params;
  const artist = getArtist(slug);

  if (!artist) {
    notFound();
  }

  return (
    <>
    <StackMenu />
    <main className="vml-page vml-artist-page">
      <VmlCursor />
      <img
        className="vml-rock vml-rock-artist"
        src={`${V}/rock_artist.png`}
        alt=""
        aria-hidden
      />
      <div className="vml-section">
        <Link href="/vml2026" className="vml-back">
          ← Transitional Images
        </Link>

        <section className="vml-artist-block">
          <h2 className="vml-heading">
            <img src={`${V}/circle_visual.png`} alt="" aria-hidden />
            {artist.works.length > 1 ? "Works" : "Work"}
          </h2>

          <div className="vml-artframe vml-artist-artwork">
            <img
              className="vml-artframe-img"
              src={artist.artwork}
              alt={`${artist.name} — ${artist.works[0]?.title ?? ""}`}
              loading="lazy"
            />
            <img
              className="vml-artframe-border"
              src={`${V}/artwork_frame.png`}
              alt=""
              aria-hidden
            />
          </div>

          <div className="vml-work-notes">
            {artist.works.map((w) => (
              <div key={w.title} className="vml-work-note">
                <p className="vml-work-title">{w.title}</p>
                <p className="vml-body">{w.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="vml-artist-block">
          <h2 className="vml-heading">
            <img src={`${V}/circle_visual.png`} alt="" aria-hidden />
            Artist
          </h2>

          <header className="vml-artist-header">
            <div className="vml-artist-portrait">
              <img src={artist.portrait} alt={artist.name} />
              <img
                className="vml-artframe-border"
                src={`${V}/artist_image_frame.png`}
                alt=""
                aria-hidden
              />
            </div>
            <div className="vml-artist-title">
              <div className="vml-nameplate vml-nameplate-lg">
                <img src={`${V}/Frame_for_ArtistName.png`} alt="" aria-hidden />
                <span>{artist.name}</span>
              </div>
            </div>
          </header>

          <p className="vml-body vml-bio">{artist.bio}</p>
        </section>

        <nav className="vml-artist-nav">
          {ARTISTS.filter((a) => a.slug !== artist.slug).map((a) => (
            <Link key={a.slug} href={`/vml2026/${a.slug}`}>
              {a.name}
            </Link>
          ))}
        </nav>
      </div>

      <footer className="vml-footer">
        <p className="vml-footer-note">
          Stack V_Circuits is organised by Stack, in collaboration with
          Goethe-Institut Thailand, with support from the Thai Film Archive.
        </p>
      </footer>
    </main>
    </>
  );
}
