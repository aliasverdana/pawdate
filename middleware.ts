import { NextResponse } from "next/server";
import { authMiddleware } from "@descope/nextjs-sdk/server";

const PROTECTED_PREFIXES = ["/dogs/new", "/requests", "/messages"];

export default authMiddleware({
  // Everything is public by default, then we protect a few routes.
  publicRoutes: ["/"],
  privateRoutes: PROTECTED_PREFIXES,
  redirectUrl: "/login",
});

export const config = {
  matcher: ["/dogs/new", "/requests/:path*", "/messages/:path*"],
};

// Fallback redirect for any route missed by privateRoutes (defensive)
export function middleware() {
  return NextResponse.next();
}
