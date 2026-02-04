import { Box, Card, Container, Flex, Heading, Link as RadixLink, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatEnergy, formatNeighborhood, formatPlayStyles, formatSize } from "@/lib/dogFormat";

export const dynamic = "force-dynamic";

export default async function DogsPage() {
  const dogs = await prisma.dog.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { playStyles: true },
  });

  return (
    <Box py="6">
      <Container size="3">
        <Flex direction="column" gap="4">
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Heading size="7">Dogs</Heading>
            <RadixLink asChild>
              <Link href="/dogs/new">Create dog profile</Link>
            </RadixLink>
          </Flex>

          <Separator size="4" />

          {dogs.length === 0 ? (
            <Card>
              <Text color="gray">No dogs yet. Create the first profile.</Text>
            </Card>
          ) : (
            <Flex direction="column" gap="3">
              {dogs.map(dog => (
                <Card key={dog.id}>
                  <Flex direction="column" gap="2">
                    <Flex justify="between" wrap="wrap" gap="2">
                      <Heading size="5">{dog.name}</Heading>
                      <Text color="gray" size="2">
                        {formatNeighborhood(dog.neighborhood)}
                      </Text>
                    </Flex>

                    {dog.bio ? <Text>{dog.bio}</Text> : null}

                    <Text color="gray" size="2">
                      {formatSize(dog.size)} • {formatEnergy(dog.energy)} energy
                      {dog.playStyles.length ? ` • ${formatPlayStyles(dog.playStyles).join(", ")}` : ""}
                    </Text>

                    {dog.notes ? (
                      <Text color="gray" size="2">
                        Notes: {dog.notes}
                      </Text>
                    ) : null}
                  </Flex>
                </Card>
              ))}
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
