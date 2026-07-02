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
      <div className="flex w-full items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <StackMark locale={locale} />

        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          <nav className="type-subheadline hidden items-center gap-1.5 text-[0.625rem] md:flex">
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
                      ? "rounded-md bg-pntrsw-lime px-3 py-1.5 text-pntrsw-black"
                      : "rounded-md px-3 py-1.5 text-pntrsw-white/60 transition-colors hover:bg-pntrsw-white/10 hover:text-pntrsw-white"
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

      <nav className="type-subheadline flex justify-between gap-1.5 border-t border-pntrsw-white/25 px-4 py-2 text-[0.6rem] sm:px-6 lg:px-8 md:hidden">
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
                  ? "rounded-md bg-pntrsw-lime px-2 py-1 text-pntrsw-black sm:px-2.5"
                  : "rounded-md px-2 py-1 text-pntrsw-white/60 transition-colors hover:bg-pntrsw-white/10 hover:text-pntrsw-white sm:px-2.5"
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
