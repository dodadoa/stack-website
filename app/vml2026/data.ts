const A = "/vmlAssets/ArtistArtwork";
const P = "/vmlAssets/ArtistPicture";
const W = "/vmlAssets/artwork";

export type VmlArtist = {
  slug: string;
  name: string;
  works: string[];
  artwork: string;
  portrait: string;
  video: string;
  bioVideos: string[];
};

export const ARTISTS: VmlArtist[] = [
  {
    slug: "arlette-quynh-anh-tran",
    name: "Arlette Quynh Anh Tran",
    works: ["the_parents_mixtape (2021)", "PLATTENLOTUS (2022)"],
    artwork: `${A}/Arlette_artwork_1.png`,
    portrait: `${P}/Arlette_image.png`,
    video: `${W}/Arlette.mp4`,
    bioVideos: [`${W}/arlette_bio_moving.mp4`, `${W}/arlette_bio_moving2.mp4`],
  },
  {
    slug: "ngoc-nau",
    name: "Ngọc Nâu",
    works: ["All in Good Time (2025)"],
    artwork: `${A}/NgocNau_artwork_1.png`,
    portrait: `${P}/NgocNau_Image.png`,
    video: `${W}/NgocNau.mp4`,
    bioVideos: [`${W}/ngocnau_bio_moving.mp4`],
  },
  {
    slug: "le-bac-tan",
    name: "Le-Bac-Tan",
    works: ["Il provino (2022)"],
    artwork: `${A}/LeBacTan_artwork_1.png`,
    portrait: `${P}/LeBacTan_image.png`,
    video: `${W}/LeBacTan.mp4`,
    bioVideos: [`${W}/lebactan_bio_moving.mp4`],
  },
  {
    slug: "tran-uy-duc",
    name: "Trần Uy Đức",
    works: ["Catwalk (2023, with Nguyễn Duy Anh)"],
    artwork: `${A}/UyDuc_artwork.png`,
    portrait: `${P}/UyDuc_image.png`,
    video: `${W}/UyDuc.mp4`,
    bioVideos: [`${W}/uyduc_bio_moving.mp4`],
  },
  {
    slug: "hachul",
    name: "Hachul",
    works: ["Đám (2019)"],
    artwork: `${A}/HaChul_artwork.png`,
    portrait: `${P}/Hachul_image.png`,
    video: `${W}/Hachul.mp4`,
    bioVideos: [`${W}/hachul_bio_moving.mp4`],
  },
  {
    slug: "huytengmeng",
    name: "Huytengmeng",
    works: ["Cardio (2018)"],
    artwork: `${A}/DucHuy_artwork.png`,
    portrait: `${P}/DucHuy_image.png`,
    video: `${W}/DucHuy.mp4`,
    bioVideos: [`${W}/duchuy_bio_moving.mp4`],
  },
  {
    slug: "nguyen-duy-anh",
    name: "Nguyễn Duy Anh",
    works: ["Catwalk (2023, with Trần Uy Đức)"],
    artwork: `${A}/DuyAnh_artwork.png`,
    portrait: `${P}/DuyAnh_image.png`,
    video: `${W}/DuyAnh.mp4`,
    bioVideos: [`${W}/duyanh_bio_moving.mp4`],
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
    artistSlugs: ["nguyen-duy-anh", "tran-uy-duc"],
    label: "Nguyễn Duy Anh — Trần Uy Đức",
    works: ["Catwalk (2023)"],
    artwork: `${A}/UyDuc_artwork.png`,
  },
  {
    artistSlugs: ["hachul"],
    label: "Hachul",
    works: ["Đám (2019)"],
    artwork: `${A}/HaChul_artwork.png`,
  },
  {
    artistSlugs: ["huytengmeng"],
    label: "Huytengmeng",
    works: ["Cardio (2018)"],
    artwork: `${A}/DucHuy_artwork.png`,
  },
];
