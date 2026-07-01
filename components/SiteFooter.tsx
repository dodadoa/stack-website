import type { Dictionary } from "@/lib/dictionaries";
import { GradientField } from "./GradientField";
import { SponsorLogos } from "./SponsorLogos";

type SiteFooterProps = {
  dict: Dictionary;
};

export function SiteFooter({ dict }: SiteFooterProps) {
  return (
    <footer className="mt-auto bg-pntrsw-black text-pntrsw-white">
      <GradientField variant="footer" className="border-t border-pntrsw-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between">
          <div className="type-subheadline space-y-2 text-xs leading-[1.6] text-pntrsw-white/75">
            <p>{dict.footer.org}</p>
            <p>{dict.footer.support}</p>
          </div>
          <a
            href="#top"
            className="type-subheadline meta-line text-pntrsw-white transition-opacity hover:opacity-55"
          >
            {dict.footer.top}
          </a>
        </div>
      </GradientField>

      <SponsorLogos label={dict.footer.sponsors} />
    </footer>
  );
}
