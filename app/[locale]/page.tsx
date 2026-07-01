import { AsciiPatchStrip } from "@/components/AsciiPatch";
import { CuratorialText } from "@/components/CuratorialText";
import { GradientField } from "@/components/GradientField";
import { PatchedHeroTitle } from "@/components/PatchedHeroTitle";
import { PageShell } from "@/components/PageShell";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dict = getDictionary(localeParam);

  return (
    <article>
      <GradientField variant="hero" className="px-6 pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <AsciiPatchStrip className="mb-6" />

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
            <PatchedHeroTitle subtitle={dict.home.subtitle} />

            <div className="space-y-6 lg:pt-4">
              <div className="space-y-6 border-l-2 border-pntrsw-deep/20 pl-5">
                <div>
                  <p className="type-subheadline label-caps mb-2 text-pntrsw-body/60">Exhibition</p>
                  <p className="type-subheadline meta-line text-pntrsw-body">{dict.home.dates}</p>
                </div>
                <div>
                  <p className="type-subheadline label-caps mb-2 text-pntrsw-body/60">Venue</p>
                  <p className="type-body text-base leading-snug text-pntrsw-body/80">
                    {dict.home.venue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GradientField>

      <PageShell wide>
        <CuratorialText paragraphs={dict.home.curatorial} locale={localeParam} />
      </PageShell>
    </article>
  );
}
