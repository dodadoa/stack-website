"use client";

import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { StackMark } from "./StackMark";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

const navItems = [
  { key: "exhibition" as const, href: "" },
  { key: "screening" as const, href: "screening" },
  { key: "installation" as const, href: "installation" },
  { key: "artists" as const, href: "artists" },
  { key: "schedule" as const, href: "schedule" },
];

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-pntrsw-white/10 bg-pntrsw-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2.5">
        <StackMark locale={locale} />

        <div className="flex items-center gap-5 md:gap-6">
          <nav className="type-subheadline hidden items-center gap-5 text-[0.625rem] md:flex">
            {navItems.map(({ key, href }) => {
              const linkPath = localePath(locale, href);
              const isActive =
                href === ""
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(linkPath);

              return (
                <Link
                  key={key}
                  href={linkPath}
                  className={
                    isActive
                      ? "text-pntrsw-white underline decoration-pntrsw-white decoration-2 underline-offset-[4px]"
                      : "text-pntrsw-white/60 transition-colors hover:text-pntrsw-white"
                  }
                >
                  {dict.nav[key]}
                </Link>
              );
            })}
          </nav>

          <LocaleSwitcher locale={locale} pathname={pathname} />
        </div>
      </div>

      <nav className="type-subheadline flex gap-4 overflow-x-auto border-t border-pntrsw-white/25 px-6 py-2 text-[0.6rem] md:hidden">
        {navItems.map(({ key, href }) => {
          const linkPath = localePath(locale, href);
          const isActive =
            href === ""
              ? pathname === `/${locale}` || pathname === `/${locale}/`
              : pathname.startsWith(linkPath);

          return (
            <Link
              key={key}
              href={linkPath}
              className={
                isActive
                  ? "shrink-0 text-pntrsw-white underline decoration-pntrsw-white decoration-2 underline-offset-[4px]"
                  : "shrink-0 text-pntrsw-white/60 transition-colors hover:text-pntrsw-white"
              }
            >
              {dict.nav[key]}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
