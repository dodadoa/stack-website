const A = "/vmlAssets/ArtistArtwork";
const P = "/vmlAssets/ArtistPicture";

export type VmlWork = {
  title: string;
  description: string;
};

export type VmlArtist = {
  slug: string;
  name: string;
  bio: string;
  works: VmlWork[];
  artwork: string;
  portrait: string;
};

export const ARTISTS: VmlArtist[] = [
  {
    slug: "arlette-quynh-anh-tran",
    name: "Arlette Quynh Anh Tran",
    bio: "Arlette Quynh-Anh Tran is an art laborer based in Saigon whose practice spans artmaking, curating, and writing. Using animation, 3D design, archives, and architecture, she combines political discourse with science-fiction aesthetics to reimagine Third World histories and futures. She co-founded the Art Labor collective in 2012.",
    works: [
      {
        title: "PLATTENLOTUS (2022)",
        description:
          "Part of her ongoing project Eugenics of the Cold Flowers, combining the East German Plattenbau housing model with the lotus as a symbol of Vietnamese nationalism. Referencing the transfer of prefabricated socialist housing to Vietnam, the work imagines an urban utopia shaped by collective living, political ideology, and national identity.",
      },
      {
        title: "the_parents_mixtape (2021)",
        description:
          "Drawn from personal history, the video traces critical moments in the lives of the artist's parents that shaped her upbringing. Using Google Maps as a guide to the past, the video challenges the digitalized geographical assimilation and the heterogeneity of the human memory.",
      },
    ],
    artwork: `${A}/Arlette_artwork_1.png`,
    portrait: `${P}/Arlette_image.png`,
  },
  {
    slug: "ngoc-nau",
    name: "Ngọc Nâu",
    bio: "Ngọc Nâu is a new media artist based between Thái Nguyên and Hanoi, Vietnam. Working across video installation, holography, projection mapping, photography lightboxes, and augmented reality, her practice examines changing landscapes, the social and spiritual relations within them.",
    works: [
      {
        title: "All in Good Time (2025)",
        description:
          "Explores how technology, extraction, development, and everyday life reshape landscapes. Combining 3D construction models, spiritual and funerary rituals, extraction sites, and local exercise routines, the work reflects on how changing environments transform systems of belief, value, and meaning.",
      },
    ],
    artwork: `${A}/NgocNau_artwork_1.png`,
    portrait: `${P}/NgocNau_Image.png`,
  },
  {
    slug: "le-bac-tan",
    name: "Le-Bac-Tan",
    bio: "Le-Bac-Tan is an alias which allows certain people to distance themselves from academic practices. Le-Bac-Tan were born in the French Cochinchina sometime in the 1940s. At 26, they swallowed a microchip that enabled them to time travel to Y2K to witness computer time stops. They blend history with fiction, high art with low brow design. They are a collective of many trades: Multimedia Designer, Cultural Mixologist, Performer, and Tour Guide.",
    works: [
      {
        title: "Il provino (2022)",
        description:
          "Follows four characters embodying stereotypes of contemporary Vietnamese life through fragmented audition scenes. Each struggles to perform the role society has assigned to them.",
      },
    ],
    artwork: `${A}/LeBacTan_artwork_1.png`,
    portrait: `${P}/LeBacTan_image.png`,
  },
  {
    slug: "tran-uy-duc",
    name: "Trần Uy Đức",
    bio: "Hanoi-born Trần Uy Đức blurs the lines between deconstructed club, musique concrète, and deeply intimate pop. Active since 2018, his sound is rooted in an early embrace of raw metallic noise—inspired by his father's metal sculptures. While often described as a “collagist,” Đức considers his music a sonic diary, seeking linearity out of chaos to review themes of queer identity and collective trauma.",
    works: [
      {
        title: "Catwalk (2022)",
        description:
          "Welcoming the new lunar year, Hanoi's sky gradually adjusts to life after months of lockdown. The video captures unexpected moments – both real and staged – from the filmmaking process.",
      },
    ],
    artwork: `${A}/UyDuc_artwork.png`,
    portrait: `${P}/UyDuc_image.png`,
  },
  {
    slug: "hachul",
    name: "Hachul",
    bio: "Hachul Le Do is a transdisciplinary artist and an animation filmmaker exploring the entanglement of time and things. His work engages queer and trans becomings, crips, and human–nonhuman relations, inviting attention to the overlooked through storytelling across time-based art, sculpture, and installation.",
    works: [
      {
        title: "đám (2021)",
        description:
          "Speculates the future of Vietnamese social gatherings in a post-COVID context. 'đám' culturenature is the communal, occasional gatherings: birthdays, weddings, funerals. At these gatherings, cross-dressing performers from the Red River Delta enliven the festivities, bringing together performance, ritual, and social exchange.",
      },
    ],
    artwork: `${A}/HaChul_artwork.png`,
    portrait: `${P}/Hachul_image.png`,
  },
  {
    slug: "huytengmeng",
    name: "Huytengmeng",
    bio: "Nguyễn Đức Huy (b. 1995, Hanoi) is a visual artist working across painting, illustration, digital art, installation, and animation. His vivid, digitally influenced works combine precise compositions with humour, quirkiness, and a sense of detachment. In 2026, he presented his second solo exhibition, The Sky Stays Green, at Wiking Salon, Ho Chi Minh City. His work has also been shown at S.E.A. Focus, Staatliche Kunstsammlungen Dresden, Á Space, Manzi Art Space, and Nhà Sàn Studio.",
    works: [
      {
        title: "Cardio (2022)",
        description:
          "A person jumping ropes against different backdrops in the same house, meanwhile, there seems to exist other presences.",
      },
    ],
    artwork: `${A}/DucHuy_artwork.png`,
    portrait: `${P}/DucHuy_image.png`,
  },
];

export function getArtist(slug: string): VmlArtist | undefined {
  return ARTISTS.find((a) => a.slug === slug);
}

/* Screening running order for the programme grid on the main page. */
export type ScreeningEntry = {
  artistSlugs: string[];
  label: string;
  works: string[];
  artwork: string;
};

export const SCREENING_ORDER: ScreeningEntry[] = [
  {
    artistSlugs: ["arlette-quynh-anh-tran"],
    label: "Arlette Quynh Anh Tran",
    works: ["the_parents_mixtape (2021)", "PLATTENLOTUS (2022)"],
    artwork: `${A}/Arlette_artwork_1.png`,
  },
  {
    artistSlugs: ["ngoc-nau"],
    label: "Ngọc Nâu",
    works: ["All in Good Time (2025)"],
    artwork: `${A}/NgocNau_artwork_1.png`,
  },
  {
    artistSlugs: ["le-bac-tan"],
    label: "Le-Bac-Tan",
    works: ["Il provino (2022)"],
    artwork: `${A}/LeBacTan_artwork_1.png`,
  },
  {
    artistSlugs: ["tran-uy-duc"],
    label: "Trần Uy Đức",
    works: ["Catwalk (2022)"],
    artwork: `${A}/UyDuc_artwork.png`,
  },
  {
    artistSlugs: ["hachul"],
    label: "Hachul",
    works: ["đám (2021)"],
    artwork: `${A}/HaChul_artwork.png`,
  },
  {
    artistSlugs: ["huytengmeng"],
    label: "Huytengmeng",
    works: ["Cardio (2022)"],
    artwork: `${A}/DucHuy_artwork.png`,
  },
];
