import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "./lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = pathname.split("/")[1];
  if (pathnameLocale === "th") {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/th/, `/${defaultLocale}`) || `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  if (isLocale(pathnameLocale)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
