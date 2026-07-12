import Image from "next/image";
import { sponsorAssets, type SponsorLogo } from "@/lib/sponsor-assets";

type SponsorLogosProps = {
  label: string;
};

function SponsorLogoImage({ logo, size }: { logo: SponsorLogo; size: "primary" | "secondary" }) {
  const primary = size === "primary";
  const secondarySize = logo.compact
    ? "max-h-5 sm:max-h-6 md:max-h-7"
    : "max-h-10 sm:max-h-11 md:max-h-12";

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={`h-auto w-auto object-contain ${
        logo.invert ? "brightness-0 invert" : ""
      } ${primary ? "max-h-16 sm:max-h-20 md:max-h-24" : secondarySize}`}
      sizes={
        primary
          ? "(max-width: 768px) 220px, 320px"
          : logo.compact
            ? "(max-width: 768px) 56px, 72px"
            : "(max-width: 768px) 96px, 128px"
      }
    />
  );
}

export function SponsorLogos({ label }: SponsorLogosProps) {
  return (
    <section className="border-t border-pntrsw-white/10 bg-pntrsw-black">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center md:py-10">
        <p className="type-subheadline label-caps mb-6 text-pntrsw-white/70">{label}</p>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-12 md:gap-x-14">
          {sponsorAssets.primary.map((logo) => (
            <SponsorLogoImage key={logo.src} logo={logo} size="primary" />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 md:mt-10">
          {sponsorAssets.secondary.map((logo) => (
            <SponsorLogoImage key={logo.src} logo={logo} size="secondary" />
          ))}
        </div>
      </div>
    </section>
  );
}
