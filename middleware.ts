import { NextRequest, NextResponse } from "next/server";
import { basePath, defaultLocale } from "./lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/vml2026" || pathname.startsWith("/vml2026/")) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = `${basePath}${pathname.slice(3)}`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/th" || pathname.startsWith("/th/")) {
    const url = request.nextUrl.clone();
    const rest = pathname.slice(3);
    url.pathname = rest ? `${basePath}/th${rest}` : `${basePath}/th`;
    return NextResponse.redirect(url);
  }

  if (pathname === basePath || pathname === `${basePath}/`) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith(`${basePath}/th/`)) {
    const url = request.nextUrl.clone();
    url.pathname = `/th${pathname.slice(`${basePath}/th`.length)}`;
    return NextResponse.rewrite(url);
  }

  if (pathname === `${basePath}/th`) {
    const url = request.nextUrl.clone();
    url.pathname = "/th";
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith(`${basePath}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname.slice(basePath.length)}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
