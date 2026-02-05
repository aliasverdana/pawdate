import { Box, Button, Card, Container, Flex, Heading, Link as RadixLink, Text } from "@radix-ui/themes";
import Link from "next/link";
import { PageEnter } from "@/components/PageEnter";
import { RequestsBoard } from "@/components/RequestsBoard";

export default async function RequestsPage() {
  const requests = [
    {
      id: "demo-req-1",
      neighborhood: "SODERMALM",
      placeName: "Tantolunden",
      startsAt: "2026-02-07T10:00:00.000Z",
      endsAt: null,
      note: "Looking for a calm first meetup. Medium energy, friendly greetings.",
      dog: { name: "Luna" },
    },
    {
      id: "demo-req-2",
      neighborhood: "VASASTAN",
      placeName: "Observatorielunden",
      startsAt: "2026-02-08T09:30:00.000Z",
      endsAt: null,
      note: "Short intro on leash, then see if they want to play.",
      dog: { name: "Max" },
    },
  ];

  return (
    <Box py="6">
      <Container size="3">
        <PageEnter>
          <Flex direction="column" gap="4">
            <Flex align="center" justify="between" wrap="wrap" gap="3">
              <Heading size="7">Open requests</Heading>
              <Flex gap="3" wrap="wrap">
                <RadixLink asChild>
                  <Link href="/dogs">Browse dogs</Link>
                </RadixLink>
                <Button asChild variant="soft">
                  <Link href="/dogs/new">Create dog profile</Link>
                </Button>
              </Flex>
            </Flex>

            <Card variant="surface">
              <Text size="2" color="gray">
                Requests are lightweight “who wants to meet” posts tied to a dog profile. Keep the first meetup public and short.
              </Text>
            </Card>

            <RequestsBoard requests={requests} />
          </Flex>
        </PageEnter>
      </Container>
    </Box>
  );
}
