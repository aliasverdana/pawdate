import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Pawdate Stockholm",
  description: "Find compatible dog playdates in Stockholm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Theme appearance="inherit" accentColor="green" grayColor="slate" radius="large" scaling="100%">
          <AppShell>{children}</AppShell>
        </Theme>
      </body>
    </html>
  );
}
