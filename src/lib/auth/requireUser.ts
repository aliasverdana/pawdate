import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";

export async function requireUser(redirectTo?: string) {
  const user = await getSessionUser();
  if (!user) {
    const r = redirectTo ? encodeURIComponent(redirectTo) : "";
    redirect(`/login${r ? `?redirectTo=${r}` : ""}`);
  }
  return user;
}
