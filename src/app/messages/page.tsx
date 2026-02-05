import { Box, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { MessagingBoard } from "@/components/MessagingBoard";
import { PageEnter } from "@/components/PageEnter";

export default async function MessagesPage() {
  const threads = [
    {
      id: "demo-1",
      updatedAt: "2026-02-04T22:00:00.000Z",
      messages: [
        {
          id: "m-1",
          createdAt: "2026-02-04T21:46:00.000Z",
          body: "Hey! Want to do a short intro walk this weekend?",
        },
        {
          id: "m-2",
          createdAt: "2026-02-04T21:55:00.000Z",
          body: "Sure, Saturday around 10 in Tantolunden works.",
        },
      ],
    },
  ];

  return (
    <Box py="6">
      <Container size="3">
        <PageEnter>
          <Flex direction="column" gap="4">
            <Heading size="7">Messages</Heading>

            <Card variant="surface">
              <Text size="2" color="gray">
                This is a simple inbox. In a future step, threads will be tied to requests and dog profiles.
              </Text>
            </Card>

            <MessagingBoard threads={threads} />
          </Flex>
        </PageEnter>
      </Container>
    </Box>
  );
}
