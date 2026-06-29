import Image from "next/image";
import { sponsorAssets } from "@/lib/sponsor-assets";

type SponsorLogosProps = {
  label: string;
};

export function SponsorLogos({ label }: SponsorLogosProps) {
  return (
    <section className="border-t border-pntrsw-navy/10 bg-pntrsw-black">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <p className="label-caps mb-8 text-pntrsw-stone/70">{label}</p>

        <div className="mb-10">
          <Image
            src={sponsorAssets.partners.src}
            alt={sponsorAssets.partners.alt}
            width={sponsorAssets.partners.width}
            height={sponsorAssets.partners.height}
            className="mx-auto h-auto w-full max-w-3xl object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <Image
          src={sponsorAssets.supporters.src}
          alt={sponsorAssets.supporters.alt}
          width={sponsorAssets.supporters.width}
          height={sponsorAssets.supporters.height}
          className="h-auto w-full object-contain opacity-95"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
