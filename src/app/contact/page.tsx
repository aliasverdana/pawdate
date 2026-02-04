import { Box, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function ContactPage() {
  return (
    <Box py="6">
      <Container size="3">
        <Flex direction="column" gap="4">
          <Heading size="7">Contact</Heading>
          <Card>
            <Flex direction="column" gap="3">
              <Text>For now, contact is handled via GitHub issues on the repository.</Text>
              <Text color="gray" size="2">
                Add a real email address here before launch.
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
}
