import { redirect } from "next/navigation";
import { session } from "@descope/nextjs-sdk/server";

export type AuthedUser = {
  userId: string;
  email?: string;
};

export async function requireUser(redirectTo?: string): Promise<AuthedUser> {
  const s = await session();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sAny = s as any;

  if (!sAny?.isAuthenticated) {
    const r = redirectTo ? encodeURIComponent(redirectTo) : "";
    redirect(`/login${r ? `?redirectTo=${r}` : ""}`);
  }

  const userId = sAny?.userId || sAny?.token?.sub || "";
  if (!userId) {
    const r = redirectTo ? encodeURIComponent(redirectTo) : "";
    redirect(`/login${r ? `?redirectTo=${r}` : ""}`);
  }

  const email = sAny?.email;
  return { userId, email };
}
