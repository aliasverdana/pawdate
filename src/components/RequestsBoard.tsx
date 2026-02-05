"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Badge, Box, Button, Card, Flex, Heading, Inset, Separator, Text } from "@radix-ui/themes";
import { formatNeighborhood } from "@/lib/dogFormat";

export type RequestWithDog = {
  id: string;
  neighborhood: string;
  placeName: string;
  startsAt: string;
  endsAt: string | null;
  note: string;
  dog: { name: string };
};

function formatTimeRange(startsAt: Date, endsAt: Date | null) {
  const start = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(
    startsAt
  );
  if (!endsAt) return start;
  const end = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(endsAt);
  return `${start}–${end}`;
}

export function RequestsBoard({ requests }: { requests: RequestWithDog[] }) {
  const [openId, setOpenId] = React.useState<string | null>(requests[0]?.id ?? null);

  if (requests.length === 0) {
    return (
      <Card>
        <Text color="gray">No open requests yet. Create a dog profile to post one.</Text>
      </Card>
    );
  }

  return (
    <Flex direction="column" gap="3">
      {requests.map(r => {
        const isOpen = openId === r.id;
        return (
          <Card key={r.id} asChild>
            <motion.div layout transition={{ duration: 0.18, ease: "easeOut" }}>
              <Flex direction="column" gap="2">
                <Flex justify="between" align="center" wrap="wrap" gap="2">
                  <Flex direction="column" gap="1">
                    <Heading size="4">
                      {r.dog.name} @ {r.placeName}
                    </Heading>
                    <Text size="2" color="gray">
                      {formatTimeRange(new Date(r.startsAt), r.endsAt ? new Date(r.endsAt) : null)}
                    </Text>
                  </Flex>

                  <Flex gap="2" align="center" wrap="wrap">
                    <Badge variant="soft" color="gray">
                      {formatNeighborhood(r.neighborhood)}
                    </Badge>
                    <Button size="2" variant={isOpen ? "solid" : "soft"} onClick={() => setOpenId(isOpen ? null : r.id)}>
                      {isOpen ? "Hide" : "Details"}
                    </Button>
                  </Flex>
                </Flex>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <Inset side="x" mt="2">
                        <Separator size="4" />
                      </Inset>
                      <Box pt="3">
                        {r.note ? (
                          <Text>{r.note}</Text>
                        ) : (
                          <Text color="gray">No note. Start with a short leash intro in a public spot.</Text>
                        )}
                        <Flex mt="3" gap="2" wrap="wrap">
                          <Button size="2">Message owner</Button>
                          <Button size="2" variant="soft">
                            Save
                          </Button>
                        </Flex>
                      </Box>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Flex>
            </motion.div>
          </Card>
        );
      })}
    </Flex>
  );
}
