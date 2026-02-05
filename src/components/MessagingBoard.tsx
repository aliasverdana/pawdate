"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Badge, Box, Button, Card, Flex, Heading, Inset, Separator, Text, TextArea } from "@radix-ui/themes";
export type Message = {
  id: string;
  createdAt: string;
  body: string;
};

export type ThreadPreview = {
  id: string;
  updatedAt: string;
  messages: Message[];
};

function formatTimestamp(d: Date) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(d);
}

export function MessagingBoard({ threads }: { threads: ThreadPreview[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(threads[0]?.id ?? null);
  const active = threads.find(t => t.id === activeId) ?? null;

  if (threads.length === 0) {
    return (
      <Card>
        <Heading size="4">No messages yet</Heading>
        <Text color="gray" mt="2">
          When you message a request owner, the conversation appears here.
        </Text>
      </Card>
    );
  }

  return (
    <Flex gap="4" direction={{ initial: "column", sm: "row" }}>
      <Box style={{ flex: 1, minWidth: 280 }}>
        <Card>
          <Heading size="4">Threads</Heading>
          <Inset side="x" my="3">
            <Separator size="4" />
          </Inset>

          <Flex direction="column" gap="2">
            {threads.map(t => {
              const last = t.messages[0];
              const isActive = t.id === activeId;
              return (
                <Button
                  key={t.id}
                  variant={isActive ? "solid" : "soft"}
                  color={isActive ? "green" : undefined}
                  onClick={() => setActiveId(t.id)}
                  style={{ justifyContent: "space-between" }}
                >
                  <Flex direction="column" align="start" gap="1" style={{ textAlign: "left" }}>
                    <Text weight="medium">Conversation</Text>
                    <Text size="2" color="gray">
                      {last ? last.body : "(no messages yet)"}
                    </Text>
                  </Flex>
                  {last ? (
                    <Badge color="gray" variant="soft">
                      {formatTimestamp(new Date(last.createdAt))}
                    </Badge>
                  ) : null}
                </Button>
              );
            })}
          </Flex>
        </Card>
      </Box>

      <Box style={{ flex: 2, minWidth: 320 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active?.id ?? "empty"}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Card>
              <Flex direction="column" gap="3">
                <Flex justify="between" align="center" wrap="wrap" gap="2">
                  <Heading size="4">Chat</Heading>
                  <Badge variant="soft" color="gray">
                    v0
                  </Badge>
                </Flex>

                <Inset side="x">
                  <Separator size="4" />
                </Inset>

                <Box style={{ minHeight: 180 }}>
                  {active?.messages.length ? (
                    <Flex direction="column" gap="2">
                      {[...active.messages]
                        .slice()
                        .reverse()
                        .map(m => (
                          <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.16, ease: "easeOut" }}
                          >
                            <Card variant="surface">
                              <Text size="2" color="gray">
                                {formatTimestamp(new Date(m.createdAt))}
                              </Text>
                              <Text mt="1">{m.body}</Text>
                            </Card>
                          </motion.div>
                        ))}
                    </Flex>
                  ) : (
                    <Text color="gray">Select a thread to view messages.</Text>
                  )}
                </Box>

                <TextArea aria-label="Message" placeholder="Write a message…" />

                <Flex gap="2" justify="end" wrap="wrap">
                  <Button variant="soft">Attach</Button>
                  <Button>Send</Button>
                </Flex>

                <Text size="2" color="gray">
                  Tip: keep intros short and meet in a public place.
                </Text>
              </Flex>
            </Card>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Flex>
  );
}
