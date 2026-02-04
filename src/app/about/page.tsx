import { Box, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function AboutPage() {
  return (
    <Box py="6">
      <Container size="3">
        <Flex direction="column" gap="4">
          <Heading size="7">About</Heading>
          <Card>
            <Flex direction="column" gap="3">
              <Text>
                Pawdate Stockholm is a simple directory for dog playdates. The goal is to make it easier
                to find compatible matches based on size, energy, play style, and neighborhood.
              </Text>
              <Text color="gray" size="2">
                This is an early version. Expect changes.
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
}
