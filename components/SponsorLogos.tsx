import Image from "next/image";
import { sponsorAssets } from "@/lib/sponsor-assets";

type SponsorLogosProps = {
  label: string;
};

export function SponsorLogos({ label }: SponsorLogosProps) {
  return (
    <section className="border-t border-pntrsw-white/10 bg-pntrsw-black">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center md:py-10">
        <p className="type-subheadline label-caps mb-6 text-pntrsw-white/70">{label}</p>

        <div className="flex flex-col items-center justify-center gap-8 sm:gap-10">
          {sponsorAssets.logos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={`h-auto w-full object-contain ${
                logo.invert
                  ? "max-w-[480px] brightness-0 invert sm:max-w-[560px] md:max-w-[640px]"
                  : "max-w-[220px] sm:max-w-[260px]"
              }`}
              sizes={logo.invert ? "(max-width: 768px) 480px, 640px" : "(max-width: 768px) 220px, 260px"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
