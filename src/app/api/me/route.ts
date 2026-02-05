import { NextResponse } from "next/server";
import { session } from "@descope/nextjs-sdk/server";

export async function GET() {
  const s = await session();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sAny = s as any;
  const isAuthenticated = Boolean(sAny?.isAuthenticated);

  if (!isAuthenticated) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      userId: sAny?.userId,
      email: sAny?.email,
    },
  });
}
