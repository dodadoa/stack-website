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
    <div className="type-subheadline flex items-center gap-2.5 text-[0.625rem]">
      {(["en", "th"] as const).map((code) => (
        <Link
          key={code}
          href={localePath(code, pathWithoutLocale)}
          className={
            locale === code
              ? "text-pntrsw-white underline decoration-pntrsw-white decoration-2 underline-offset-[4px]"
              : "text-pntrsw-white/55 transition-colors hover:text-pntrsw-white"
          }
          aria-current={locale === code ? "page" : undefined}
        >
          {code}
        </Link>
      ))}
    </div>
  );
}
