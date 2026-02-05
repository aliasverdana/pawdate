import { Box, Container, Flex, Link as RadixLink, Text } from "@radix-ui/themes";
import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" style={{ minHeight: "100vh" }}>
      <Box style={{ borderBottom: "1px solid var(--gray-a5)" }}>
        <Container size="3">
          <Flex align="center" justify="between" py="4" wrap="wrap" gap="3">
            <RadixLink asChild weight="bold" size="4">
              <Link href="/">Pawdate</Link>
            </RadixLink>

            <Flex align="center" gap="4" wrap="wrap">
              <RadixLink asChild>
                <Link href="/dogs">Dogs</Link>
              </RadixLink>
              <RadixLink asChild>
                <Link href="/requests">Requests</Link>
              </RadixLink>
              <RadixLink asChild>
                <Link href="/messages">Messages</Link>
              </RadixLink>
              <RadixLink asChild>
                <Link href="/login">Login</Link>
              </RadixLink>
              <RadixLink asChild>
                <Link href="/safety">Safety</Link>
              </RadixLink>
              <RadixLink asChild>
                <Link href="/about">About</Link>
              </RadixLink>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box style={{ flex: 1 }}>{children}</Box>

      <Box style={{ borderTop: "1px solid var(--gray-a5)" }}>
        <Container size="3">
          <Flex py="4" justify="between" wrap="wrap" gap="2">
            <Text size="2" color="gray">
              Pawdate Stockholm (v0)
            </Text>
            <Flex gap="4" wrap="wrap">
              <RadixLink asChild size="2" color="gray">
                <Link href="/privacy">Privacy</Link>
              </RadixLink>
              <RadixLink asChild size="2" color="gray">
                <Link href="/terms">Terms</Link>
              </RadixLink>
              <RadixLink asChild size="2" color="gray">
                <Link href="/contact">Contact</Link>
              </RadixLink>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
