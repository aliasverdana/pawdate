import { Badge, Box, Button, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { PageEnter } from "@/components/PageEnter";

export default function Home() {
  return (
    <Box py="9">
      <Container size="3">
        <PageEnter>
          <Card size="4">
            <Flex direction="column" gap="5">
              <Flex align="center" gap="3" wrap="wrap">
                <Heading size="8">Pawdate Stockholm</Heading>
                <Badge color="green" variant="soft">
                  early
                </Badge>
              </Flex>

              <Text size="4" color="gray">
                A simple way to find compatible dog playdates in Stockholm. Dog profiles first, with size,
                energy level, play style, and neighborhood.
              </Text>

              <Flex gap="3" wrap="wrap">
                <Button asChild size="3">
                  <Link href="/dogs">Browse dogs</Link>
                </Button>
                <Button asChild variant="soft" size="3">
                  <Link href="/dogs/new">Create a dog profile</Link>
                </Button>
                <Button asChild variant="soft" size="3">
                  <Link href="/requests">Open requests</Link>
                </Button>
              </Flex>

              <Text size="2" color="gray">
                Safety note: meet in public, start on leash, keep first sessions short.
              </Text>
            </Flex>
          </Card>
        </PageEnter>
      </Container>
    </Box>
  );
}
