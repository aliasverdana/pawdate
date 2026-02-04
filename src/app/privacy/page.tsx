import { Box, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function PrivacyPage() {
  return (
    <Box py="6">
      <Container size="3">
        <Flex direction="column" gap="4">
          <Heading size="7">Privacy</Heading>
          <Card>
            <Flex direction="column" gap="3">
              <Text>
                This is a prototype. Do not share sensitive information. Dog profiles should be kept
                minimal.
              </Text>
              <Text color="gray" size="2">
                If you want something removed, use the contact page.
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
}
