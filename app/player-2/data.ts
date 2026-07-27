/* PLAYER 2 HAS ENTERED THE SERVER — programme data.
   Fill from the Instagram announcement posts (between
   instagram.com/p/DKj-5xpShzS and instagram.com/p/DMIlv3jytE3). */

export type P2Section = "exhibition" | "screening";

export type P2Work = {
  title: string;
  description: string;
};

export type P2Artist = {
  slug: string;
  name: string;
  bio: string;
  section: P2Section;
  works: P2Work[];
};

/* Add artists like:
  {
    slug: "artist-name",
    name: "Artist Name",
    bio: "Short bio…",
    section: "exhibition", // or "screening"
    works: [{ title: "Work Title (2025)", description: "…" }],
  },
*/
export const P2_ARTISTS: P2Artist[] = [];

export function getP2Artist(slug: string): P2Artist | undefined {
  return P2_ARTISTS.find((a) => a.slug === slug);
}

export function bySection(section: P2Section): P2Artist[] {
  return P2_ARTISTS.filter((a) => a.section === section);
}
