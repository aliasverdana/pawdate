import { Box, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function TermsPage() {
  return (
    <Box py="6">
      <Container size="3">
        <Flex direction="column" gap="4">
          <Heading size="7">Terms</Heading>
          <Card>
            <Flex direction="column" gap="3">
              <Text>
                Pawdate is provided as-is. You are responsible for your own meetups and decisions.
              </Text>
              <Text color="gray" size="2">
                This page will be replaced with proper terms before public launch.
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
}
