import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateMagicLinkToken } from "@/lib/auth/magicLink";
import { getRequestOrigin } from "@/lib/auth/session";
import { sendMagicLinkEmail } from "@/lib/email";

const BodySchema = z.object({
  email: z.string().email().transform((s) => s.toLowerCase().trim()),
  redirectTo: z.string().optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, redirectTo } = parsed.data;

  const { token, tokenHash } = generateMagicLinkToken();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email },
    select: { id: true, email: true },
  });

  await prisma.magicLinkToken.create({
    data: {
      email,
      tokenHash,
      expiresAt,
      redirectTo,
      userId: user.id,
    },
  });

  const baseUrl = process.env.APP_URL ?? (await getRequestOrigin());
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Missing APP_URL (or Host headers)" },
      { status: 500 },
    );
  }

  const loginUrl = new URL("/api/auth/verify", baseUrl);
  loginUrl.searchParams.set("token", token);
  if (redirectTo) loginUrl.searchParams.set("redirectTo", redirectTo);

  await sendMagicLinkEmail({ to: email, loginUrl: loginUrl.toString() });

  // Always return 200 to avoid leaking which emails are registered.
  return NextResponse.json({ ok: true });
}
