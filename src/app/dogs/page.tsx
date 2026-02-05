import { Box, Card, Container, Flex, Heading, Link as RadixLink, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DogsGallery } from "@/components/DogsGallery";
import { PageEnter } from "@/components/PageEnter";

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
        <PageEnter>
          <Flex direction="column" gap="4">
            <Flex align="center" justify="between" wrap="wrap" gap="3">
              <Heading size="7">Dogs</Heading>
              <RadixLink asChild>
                <Link href="/dogs/new">Create dog profile</Link>
              </RadixLink>
            </Flex>

            {dogs.length === 0 ? (
              <Card>
                <Text color="gray">No dogs yet. Create the first profile.</Text>
              </Card>
            ) : (
              <DogsGallery dogs={dogs} />
            )}

            <Separator size="4" />
          </Flex>
        </PageEnter>
      </Container>
    </Box>
  );
}
