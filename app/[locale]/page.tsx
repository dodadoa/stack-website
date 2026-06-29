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
              <pre
                className="font-ascii text-[0.6rem] leading-[1.45] text-pntrsw-royal/60 sm:text-xs"
                aria-hidden
              >{`+ Exhibition
  dates: ${dict.home.dates}
+ Venue
  loc: ${dict.home.venue.split("/").join("\n       ")}`}</pre>

              <div className="space-y-6 border-l-2 border-pntrsw-lime pl-5">
                <div>
                  <p className="label-caps mb-2 text-pntrsw-royal">Exhibition</p>
                  <p className="meta-line text-pntrsw-navy">{dict.home.dates}</p>
                </div>
                <div>
                  <p className="label-caps mb-2 text-pntrsw-royal">Venue</p>
                  <p className="text-base leading-snug text-pntrsw-navy/80">
                    {dict.home.venue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GradientField>

      <PageShell wide>
        <pre
          className="font-ascii mb-10 text-[0.6rem] text-pntrsw-navy/25 sm:text-xs"
          aria-hidden
        >
          {`--- a/world/narrative.txt
+++ b/world/narrative.txt
@@ curatorial @@`}
        </pre>

        <CuratorialText paragraphs={dict.home.curatorial} locale={localeParam} />

        <p className="mt-14 border-t-2 border-pntrsw-lime pt-8 font-ascii text-xs leading-relaxed text-pntrsw-olive sm:text-sm">
          <span className="text-pntrsw-blue"># </span>
          {dict.home.credits}
        </p>
      </PageShell>
    </article>
  );
}
