import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { PageEnter } from "@/components/PageEnter";
import { LoginPanel } from "@/components/LoginPanel";

export default function LoginPage() {
  return (
    <Box py="6">
      <Container size="2">
        <PageEnter>
          <Flex direction="column" gap="4">
            <Heading size="7">Login</Heading>
            <Text color="gray">
              Keep your dog profile private until you&apos;re ready. Login enables posting requests and messaging.
            </Text>
            <LoginPanel />
          </Flex>
        </PageEnter>
      </Container>
    </Box>
  );
}
