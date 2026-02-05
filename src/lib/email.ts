import { Resend } from "resend";

export type SendMagicLinkParams = {
  to: string;
  loginUrl: string;
};

export async function sendMagicLinkEmail(params: SendMagicLinkParams) {
  const { to, loginUrl } = params;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Pawdate <onboarding@resend.dev>";

  if (!apiKey) {
    // Local/dev fallback: do not fail hard, but log the link.
    // In production, we *do* fail to avoid silently dropping login emails.
    if (process.env.NODE_ENV === "production") {
      throw new Error("Missing RESEND_API_KEY");
    }
    console.log(`[pawdate] Magic link for ${to}: ${loginUrl}`);
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to,
    subject: "Your Pawdate sign-in link",
    text: `Use this link to sign in to Pawdate:\n\n${loginUrl}\n\nThis link expires soon. If you didn't request it, you can ignore this email.`,
  });
}
