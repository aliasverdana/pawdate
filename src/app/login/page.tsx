import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { PageEnter } from "@/components/PageEnter";
import { DescopeLogin } from "@/components/DescopeLogin";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const projectId = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID;
  const { redirectTo } = await searchParams;

  return (
    <Box py="6">
      <Container size="2">
        <PageEnter>
          <Flex direction="column" gap="4">
            <Heading size="7">Login</Heading>
            <Text color="gray">Sign in to create requests and message owners.</Text>

            {projectId ? (
              <DescopeLogin projectId={projectId} redirectTo={redirectTo || "/dogs"} />
            ) : (
              <Text color="gray">Missing NEXT_PUBLIC_DESCOPE_PROJECT_ID.</Text>
            )}
          </Flex>
        </PageEnter>
      </Container>
    </Box>
  );
}
