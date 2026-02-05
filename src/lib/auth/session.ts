import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";

export const COOKIE_NAME = "pawdate_session";

function getJwtSecret() {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) throw new Error("Missing AUTH_JWT_SECRET");
  return new TextEncoder().encode(secret);
}

export type SessionUser = {
  id: string;
  email: string;
};

export async function createSessionJwt(payload: SessionUser) {
  const jwt = await new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.id)
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getJwtSecret());

  return jwt;
}

export async function setSessionCookie(jwt: string) {
  const isProd = process.env.NODE_ENV === "production";
  const store = await cookies();

  store.set({
    name: COOKIE_NAME,
    value: jwt,
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    const sub = payload.sub;
    const email = payload.email;
    if (!sub || typeof sub !== "string") return null;
    if (!email || typeof email !== "string") return null;
    return { id: sub, email };
  } catch {
    return null;
  }
}

export async function getRequestOrigin() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return null;
  return `${proto}://${host}`;
}
