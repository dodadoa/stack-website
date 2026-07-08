"use client";

import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { StackMark } from "./StackMark";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

const navItems = [
  { key: "exhibition" as const, href: "" },
  { key: "screening" as const, href: "screening" },
  { key: "installation" as const, href: "installation" },
  { key: "talks" as const, href: "talks" },
  { key: "artists" as const, href: "artists" },
  { key: "schedule" as const, href: "schedule" },
];

function navLinkClass(isActive: boolean, mobile = false) {
  const base = mobile
    ? "block rounded-md px-4 py-3 text-sm"
    : "rounded-md px-3 py-1.5";

  return isActive
    ? `${base} bg-pntrsw-lime text-pntrsw-black`
    : `${base} text-pntrsw-white/60 transition-colors hover:bg-pntrsw-white/10 hover:text-pntrsw-white`;
}

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === ""
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(localePath(locale, href));

  return (
    <header className="sticky top-0 z-50 border-b border-pntrsw-white/10 bg-pntrsw-black">
      <div className="flex w-full items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <StackMark locale={locale} />

        <nav className="type-subheadline hidden items-center gap-1.5 text-[0.625rem] md:flex">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              href={localePath(locale, href)}
              className={navLinkClass(isActive(href))}
            >
              {dict.nav[key]}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-md text-pntrsw-white transition-colors hover:bg-pntrsw-white/10 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="flex h-4 w-5 flex-col justify-between">
            <span
              className={`block h-0.5 w-full origin-center bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full origin-center bg-current transition-transform duration-200 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 top-[53px] z-40 bg-pntrsw-black/60 backdrop-blur-sm md:hidden"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <nav
        id="mobile-nav"
        className={`type-subheadline fixed left-0 right-0 top-[53px] z-50 border-b border-pntrsw-white/10 bg-pntrsw-black px-4 py-4 transition-all duration-200 md:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col gap-1">
          {navItems.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={localePath(locale, href)}
                className={navLinkClass(isActive(href), true)}
                onClick={() => setMenuOpen(false)}
              >
                {dict.nav[key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
