import Image from "next/image";
import { sponsorAssets } from "@/lib/sponsor-assets";

type SponsorLogosProps = {
  label: string;
};

export function SponsorLogos({ label }: SponsorLogosProps) {
  const { supporters } = sponsorAssets;

  return (
    <section className="border-t border-pntrsw-white/10 bg-pntrsw-black">
      <div className="mx-auto max-w-6xl px-6 py-8 md:py-10">
        <p className="type-subheadline label-caps mb-6 text-pntrsw-white/70">{label}</p>

        <div className="flex justify-center">
          <Image
            src={supporters.src}
            alt={supporters.alt}
            width={supporters.width}
            height={supporters.height}
            className="h-auto w-full max-w-[480px] object-contain brightness-0 invert sm:max-w-[560px] md:max-w-[640px]"
            sizes="(max-width: 768px) 480px, 640px"
          />
        </div>
      </div>
    </section>
  );
}
