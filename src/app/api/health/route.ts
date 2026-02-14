import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
