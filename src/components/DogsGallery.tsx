"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Select,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { formatEnergy, formatNeighborhood, formatPlayStyles, formatSize, type DogWithStyles } from "@/lib/dogFormat";

function includesCI(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

type DogsGalleryProps = {
  dogs: DogWithStyles[];
};

export function DogsGallery({ dogs }: DogsGalleryProps) {
  const [query, setQuery] = React.useState("");
  const [neighborhood, setNeighborhood] = React.useState<string>("ALL");

  const neighborhoods = React.useMemo(() => {
    const values = Array.from(new Set(dogs.map(d => d.neighborhood))).sort((a, b) => a.localeCompare(b));
    return values;
  }, [dogs]);

  const filtered = React.useMemo(() => {
    const q = query.trim();
    return dogs.filter(dog => {
      const matchesNeighborhood = neighborhood === "ALL" ? true : dog.neighborhood === neighborhood;
      const matchesQuery =
        q.length === 0 ||
        includesCI(dog.name, q) ||
        (dog.bio ? includesCI(dog.bio, q) : false) ||
        (dog.notes ? includesCI(dog.notes, q) : false);
      return matchesNeighborhood && matchesQuery;
    });
  }, [dogs, neighborhood, query]);

  return (
    <Flex direction="column" gap="4">
      <Flex align="end" gap="3" wrap="wrap">
        <Box style={{ flex: 1, minWidth: 260 }}>
          <Text as="label" size="2" weight="medium">
            Search
          </Text>
          <TextField.Root
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Name, bio, notes…"
            mt="2"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>
        </Box>

        <Box style={{ minWidth: 240 }}>
          <Text as="label" size="2" weight="medium">
            Neighborhood
          </Text>
          <Select.Root value={neighborhood} onValueChange={setNeighborhood}>
            <Select.Trigger mt="2" />
            <Select.Content>
              <Select.Item value="ALL">All</Select.Item>
              {neighborhoods.map(n => (
                <Select.Item key={n} value={n}>
                  {formatNeighborhood(n)}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Box>

        <Box>
          <Text size="2" color="gray">
            Showing {filtered.length} of {dogs.length}
          </Text>
        </Box>
      </Flex>

      <Separator size="4" />

      {filtered.length === 0 ? (
        <Card>
          <Text color="gray">No matches. Try a different search.</Text>
        </Card>
      ) : (
        <motion.div layout>
          <Flex direction="column" gap="3">
            <AnimatePresence initial={false}>
              {filtered.map(dog => (
                <motion.div
                  key={dog.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <Card>
                    <Flex direction="column" gap="2">
                      <Flex justify="between" wrap="wrap" gap="2" align="center">
                        <Heading size="5">{dog.name}</Heading>
                        <Badge color="gray" variant="soft">
                          {formatNeighborhood(dog.neighborhood)}
                        </Badge>
                      </Flex>

                      {dog.bio ? <Text>{dog.bio}</Text> : null}

                      <Flex gap="2" wrap="wrap" align="center">
                        <Badge color="green" variant="soft">
                          {formatSize(dog.size)}
                        </Badge>
                        <Badge color="green" variant="soft">
                          {formatEnergy(dog.energy)} energy
                        </Badge>
                        {dog.playStyles.length
                          ? formatPlayStyles(dog.playStyles).map(s => (
                              <Badge key={s} color="gray" variant="soft">
                                {s}
                              </Badge>
                            ))
                          : null}
                      </Flex>

                      {dog.notes ? (
                        <Text color="gray" size="2">
                          Notes: {dog.notes}
                        </Text>
                      ) : null}
                    </Flex>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Flex>
        </motion.div>
      )}
    </Flex>
  );
}
