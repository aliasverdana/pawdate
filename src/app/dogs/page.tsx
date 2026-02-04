import { Badge, Box, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function DogsPage() {
  return (
    <Box py="6">
      <Container size="3">
        <Flex direction="column" gap="4">
          <Flex align="center" gap="3">
            <Heading size="7">Dogs</Heading>
            <Badge variant="soft">v0</Badge>
          </Flex>

          <Card>
            <Text color="gray">
              Placeholder. Next step: store dog profiles (name, size, energy, play style,
              neighborhood) and add basic filters.
            </Text>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
}
