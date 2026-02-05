import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ user: null }, { status: 200 });

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      email: true,
      displayName: true,
      emailVerified: true,
      neighborhood: true,
    },
  });

  return NextResponse.json({ user });
}
