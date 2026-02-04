import { Box, Button, Card, Container, Flex, Heading, Select, Text, TextField } from "@radix-ui/themes";

const neighborhoods = [
  "Södermalm",
  "Kungsholmen",
  "Vasastan",
  "Östermalm",
  "Norrmalm",
  "Gamla Stan",
  "Bromma",
  "Hägersten-Liljeholmen",
  "Enskede-Årsta-Vantör",
  "Skarpnäck",
];

export default function NewDogPage() {
  return (
    <Box py="6">
      <Container size="3">
        <Flex direction="column" gap="4">
          <Heading size="7">Create dog profile</Heading>

          <Card>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">
                  Dog name
                </Text>
                <TextField.Root placeholder="Luna" />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">
                  Size
                </Text>
                <Select.Root defaultValue="m">
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="s">Small</Select.Item>
                    <Select.Item value="m">Medium</Select.Item>
                    <Select.Item value="l">Large</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">
                  Energy level
                </Text>
                <Select.Root defaultValue="med">
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="low">Low</Select.Item>
                    <Select.Item value="med">Medium</Select.Item>
                    <Select.Item value="high">High</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">
                  Neighborhood
                </Text>
                <Select.Root defaultValue={neighborhoods[0]}>
                  <Select.Trigger />
                  <Select.Content>
                    {neighborhoods.map(n => (
                      <Select.Item key={n} value={n}>
                        {n}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Button disabled>Create (coming soon)</Button>
              <Text size="2" color="gray">
                Next step: wire this to a database, add photos, and add play style tags.
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
}
