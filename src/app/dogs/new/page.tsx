import { Box, Button, Card, CheckboxGroup, Container, Flex, Heading, Select, Text, TextArea, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { createDog } from "./actions";

export const dynamic = "force-dynamic";

const neighborhoods = [
  { value: "SODERMALM", label: "Södermalm" },
  { value: "KUNGSHOLMEN", label: "Kungsholmen" },
  { value: "VASASTAN", label: "Vasastan" },
  { value: "OSTERMALM", label: "Östermalm" },
  { value: "NORRMALM", label: "Norrmalm" },
  { value: "GAMLA_STAN", label: "Gamla Stan" },
  { value: "BROMMA", label: "Bromma" },
  { value: "HAGERSTEN_LILJEHOLMEN", label: "Hägersten-Liljeholmen" },
  { value: "ENSKEDE_ARSTA_VANTOR", label: "Enskede-Årsta-Vantör" },
  { value: "SKARPNACK", label: "Skarpnäck" },
] as const;

export default async function NewDogPage() {
  return (
    <Box py="6">
      <Container size="3">
        <Flex direction="column" gap="4">
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Heading size="7">Create dog profile</Heading>
            <Button asChild variant="soft">
              <Link href="/dogs">Back to dogs</Link>
            </Button>
          </Flex>

          <Card>
            <form action={createDog}>
              <Flex direction="column" gap="4">
                <Flex direction="column" gap="2">
                  <Text size="2" weight="medium">
                    Dog name
                  </Text>
                  <TextField.Root name="name" aria-label="Dog name" placeholder="Luna" required />
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" weight="medium">
                    Short bio
                  </Text>
                  <TextArea name="bio" aria-label="Short bio" placeholder="Friendly, enjoys calm walks." />
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" weight="medium">
                    Notes
                  </Text>
                  <TextArea name="notes" aria-label="Notes" placeholder="Triggers, boundaries, introduction preferences." />
                </Flex>

                <Flex gap="4" wrap="wrap">
                  <Flex direction="column" gap="2" style={{ minWidth: 220 }}>
                    <Text size="2" weight="medium">
                      Size
                    </Text>
                    <Select.Root name="size" defaultValue="M">
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Item value="S">Small</Select.Item>
                        <Select.Item value="M">Medium</Select.Item>
                        <Select.Item value="L">Large</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Flex>

                  <Flex direction="column" gap="2" style={{ minWidth: 220 }}>
                    <Text size="2" weight="medium">
                      Energy
                    </Text>
                    <Select.Root name="energy" defaultValue="MED">
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Item value="LOW">Low</Select.Item>
                        <Select.Item value="MED">Medium</Select.Item>
                        <Select.Item value="HIGH">High</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Flex>

                  <Flex direction="column" gap="2" style={{ minWidth: 260 }}>
                    <Text size="2" weight="medium">
                      Neighborhood
                    </Text>
                    <Select.Root name="neighborhood" defaultValue={neighborhoods[0].value}>
                      <Select.Trigger />
                      <Select.Content>
                        {neighborhoods.map(n => (
                          <Select.Item key={n.value} value={n.value}>
                            {n.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </Flex>
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" weight="medium">
                    Play style
                  </Text>
                  <CheckboxGroup.Root name="playStyles" defaultValue={["GENTLE"]}>
                    <CheckboxGroup.Item value="GENTLE">Gentle</CheckboxGroup.Item>
                    <CheckboxGroup.Item value="CHASE">Chase</CheckboxGroup.Item>
                    <CheckboxGroup.Item value="WRESTLE">Wrestle</CheckboxGroup.Item>
                  </CheckboxGroup.Root>
                </Flex>

                <Flex gap="3" wrap="wrap">
                  <Button type="submit">Create</Button>
                  <Button asChild variant="soft">
                    <Link href="/dogs">Cancel</Link>
                  </Button>
                </Flex>

                <Text size="2" color="gray">
                  This is v0. Use public meeting spots and do a short intro on leash.
                </Text>
              </Flex>
            </form>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
}
