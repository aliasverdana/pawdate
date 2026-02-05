"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

type Step = "methods" | "email";

export function LoginPanel() {
  const [step, setStep] = React.useState<Step>("methods");
  const [email, setEmail] = React.useState("");

  const projectId = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_DESCOPE_BASE_URL || "https://api.descope.com";

  const descopeHosted = projectId
    ? `https://app.descope.com/${projectId}/login`
    : null;

  return (
    <Card size="4">
      <AnimatePresence mode="wait" initial={false}>
        {step === "methods" ? (
          <motion.div
            key="methods"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Flex direction="column" gap="4">
              <Heading size="6">Log in</Heading>
              <Text color="gray">Sign in to create requests and message owners.</Text>

              <Flex direction="column" gap="2">
                <Button disabled>Continue with Google</Button>
                <Button disabled variant="soft">
                  Continue with Apple
                </Button>

                {descopeHosted ? (
                  <Button asChild variant="soft">
                    <a href={descopeHosted}>Continue with email</a>
                  </Button>
                ) : (
                  <Button variant="soft" onClick={() => setStep("email")}>
                    Continue with email
                  </Button>
                )}
              </Flex>

              <Text size="2" color="gray">
                Auth is powered by Descope.
              </Text>
            </Flex>
          </motion.div>
        ) : (
          <motion.div
            key="email"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Flex direction="column" gap="4">
              <Flex align="center" gap="2">
                <Button variant="ghost" onClick={() => setStep("methods")}>
                  <ArrowLeftIcon />
                  Back
                </Button>
              </Flex>

              <Heading size="6">Email login</Heading>
              <Text color="gray">This route uses Descope. Use hosted login in production.</Text>

              <Flex direction="column" gap="2">
                <TextField.Root
                  aria-label="Email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Button disabled>
                  Send magic link (disabled)
                </Button>
              </Flex>

              <Text size="2" color="gray">
                Base URL: {baseUrl}
              </Text>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
