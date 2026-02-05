import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/auth/magicLink";
import { createSessionJwt, setSessionCookie } from "@/lib/auth/session";

function safeRedirect(redirectTo: string | null | undefined) {
  if (!redirectTo) return "/";

  // Allow only relative paths to avoid open-redirect issues.
  try {
    const u = new URL(redirectTo, "http://local");
    if (u.origin !== "http://local") return "/";
    if (!u.pathname.startsWith("/")) return "/";
    return `${u.pathname}${u.search}${u.hash}`;
  } catch {
    return "/";
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const tokenHash = hashToken(token);

  const record = await prisma.magicLinkToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!record || record.consumedAt) {
    return NextResponse.json({ error: "Invalid or used token" }, { status: 400 });
  }

  if (record.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "Expired token" }, { status: 400 });
  }

  const user = record.user;
  if (!user) {
    return NextResponse.json({ error: "User missing" }, { status: 500 });
  }

  await prisma.$transaction([
    prisma.magicLinkToken.update({
      where: { id: record.id },
      data: { consumedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: user.emailVerified ?? new Date() },
    }),
  ]);

  const jwt = await createSessionJwt({ id: user.id, email: user.email });
  await setSessionCookie(jwt);

  const redirectTo = safeRedirect(
    url.searchParams.get("redirectTo") ?? record.redirectTo,
  );

  return NextResponse.redirect(new URL(redirectTo, url.origin));
}
