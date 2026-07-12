import { CuratorialText } from "@/components/CuratorialText";
import { GlobeScene } from "@/components/GlobeScene";
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
      <GradientField
        variant="hero"
        className="flex min-h-[80svh] flex-col justify-center px-6 pb-16 pt-24 md:pb-24 md:pt-24"
      >
        <GlobeScene paragraphs={dict.home.curatorial} className="globe-veil" />
        <div className="globe-legibility-veil pointer-events-none absolute inset-0 z-[5]" aria-hidden />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-12">
          <PatchedHeroTitle subtitle={dict.home.subtitle} />

          <div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-8">
            {dict.home.locations.map((location) => (
              <div key={location.venue} className="text-center">
                <p className="type-subheadline meta-line text-pntrsw-body">{location.date}</p>
                <p className="type-body mt-2 text-base leading-snug text-pntrsw-body/80">
                  {location.venue}
                </p>
              </div>
            ))}
          </div>

          {dict.home.locationsTh ? (
            <div className="thai-text text-center">
              <p className="type-subheadline meta-line text-pntrsw-body">
                {dict.home.locationsTh.dates}
              </p>
              <p className="type-body mt-2 text-base leading-snug text-pntrsw-body/80">
                {dict.home.locationsTh.venues}
              </p>
            </div>
          ) : null}
        </div>
      </GradientField>

      <PageShell wide>
        <CuratorialText
          paragraphs={dict.home.curatorial}
          paragraphsTh={dict.home.curatorialTh}
        />
      </PageShell>
    </article>
  );
}
