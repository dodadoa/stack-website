import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import Link from "next/link";

type LocaleSwitcherProps = {
  locale: Locale;
  pathname: string;
};

export function LocaleSwitcher({ locale, pathname }: LocaleSwitcherProps) {
  const pathWithoutLocale = pathname.replace(/^\/(en|th)/, "") || "";

  return (
    <div className="flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
      {(["en", "th"] as const).map((code) => (
        <Link
          key={code}
          href={localePath(code, pathWithoutLocale)}
          className={
            locale === code
              ? "text-pntrsw-navy underline decoration-pntrsw-lime decoration-2 underline-offset-[5px]"
              : "text-pntrsw-navy/45 transition-colors hover:text-pntrsw-navy"
          }
          aria-current={locale === code ? "page" : undefined}
        >
          {code}
        </Link>
      ))}
    </div>
  );
}
