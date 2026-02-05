import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/auth/session";

const PROTECTED_PREFIXES = [
  "/dogs/new",
  "/requests",
  "/messages",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip next internals
  if (pathname.startsWith("/_next")) return NextResponse.next();

  const needsAuth = PROTECTED_PREFIXES.some(p => pathname === p || pathname.startsWith(p + "/"));
  if (!needsAuth) return NextResponse.next();

  const hasSession = Boolean(req.cookies.get(COOKIE_NAME)?.value);
  if (hasSession) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("redirectTo", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/dogs/new",
    "/requests/:path*",
    "/messages/:path*",
  ],
};
