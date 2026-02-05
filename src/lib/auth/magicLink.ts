import crypto from "crypto";

export function generateMagicLinkToken() {
  // 32 bytes => 43 char base64url
  const token = crypto.randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  return { token, tokenHash };
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
