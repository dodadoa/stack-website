export type SponsorLogo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  invert: boolean;
  compact?: boolean;
};

export const sponsorAssets = {
  primary: [
    {
      src: "/assets/SPONSOR LOGO/split/goethe.png",
      width: 141,
      height: 83,
      alt: "Goethe-Institut",
      invert: true,
    },
    {
      src: "/assets/SPONSOR LOGO/split/film-archive.png",
      width: 83,
      height: 83,
      alt: "Thai Film Archive",
      invert: true,
    },
  ] satisfies SponsorLogo[],
  secondary: [
    {
      src: "/assets/SPONSOR LOGO/split/thai-gov.png",
      width: 41,
      height: 83,
      alt: "Royal Thai Government",
      invert: true,
    },
    {
      src: "/assets/SPONSOR LOGO/split/cea.png",
      width: 65,
      height: 83,
      alt: "Creative Economy Agency",
      invert: true,
    },
    {
      src: "/assets/SPONSOR LOGO/split/virtual-media-lab.png",
      width: 70,
      height: 83,
      alt: "Virtual Media Lab",
      invert: true,
    },
    {
      src: "/assets/SPONSOR LOGO/split/immertech.png",
      width: 78,
      height: 83,
      alt: "IMMERTECH",
      invert: true,
    },
    {
      src: "/assets/SPONSOR LOGO/split/real-bangkok.png",
      width: 175,
      height: 83,
      alt: "REAL BANGKOK",
      invert: true,
    },
    {
      src: "/assets/SPONSOR LOGO/split/team-stimulant.png",
      width: 123,
      height: 83,
      alt: "TEAM STIMULANT",
      invert: true,
    },
    {
      src: "/assets/SPONSOR LOGO/volocity.png",
      width: 351,
      height: 102,
      alt: "Volocitee",
      invert: false,
      compact: true,
    },
  ] satisfies SponsorLogo[],
} as const;
