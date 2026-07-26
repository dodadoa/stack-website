import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CursorRing } from "@/components/CursorRing";
import { PageTransition } from "@/components/PageTransition";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { buildAlternates, ogLocale } from "@/lib/seo";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    return {};
  }

  const dict = getDictionary(localeParam);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: buildAlternates(localeParam),
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: ogLocale(localeParam),
    },
    twitter: {
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <div
      id="top"
      data-locale={locale}
      className="flex min-h-dvh flex-col bg-pntrsw-stone text-pntrsw-body"
    >
      <SetHtmlLang locale={locale} />
      <PageTransition />
      <CursorRing />
      <SiteHeader locale={locale} dict={dict} />
      <main className="w-full flex-1">{children}</main>
      <SiteFooter dict={dict} />
    </div>
  );
}
