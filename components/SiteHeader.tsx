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
    <header className="sticky top-0 z-50 border-b border-pntrsw-lime bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-5">
        <StackMark locale={locale} />

        <div className="flex flex-col items-end gap-4 pt-0.5">
          <LocaleSwitcher locale={locale} pathname={pathname} />

          <nav className="hidden items-center gap-6 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] md:flex">
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
                      ? "text-pntrsw-navy underline decoration-pntrsw-lime decoration-2 underline-offset-[5px]"
                      : "text-pntrsw-navy/55 transition-colors hover:text-pntrsw-navy"
                  }
                >
                  {dict.nav[key]}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <nav className="flex gap-5 overflow-x-auto border-t border-pntrsw-navy/5 px-6 py-3 text-[0.625rem] font-semibold uppercase tracking-[0.22em] md:hidden">
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
                  ? "shrink-0 text-pntrsw-navy underline decoration-pntrsw-lime decoration-2 underline-offset-[5px]"
                  : "shrink-0 text-pntrsw-navy/55"
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
