import { Box, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function SafetyPage() {
  return (
    <Box py="6">
      <Container size="3">
        <Flex direction="column" gap="4">
          <Heading size="7">Safety</Heading>
          <Card>
            <Flex direction="column" gap="3">
              <Text>
                Use common sense and prioritize safety. Pawdate is not a vetting service.
              </Text>
              <Text weight="medium">First meeting checklist</Text>
              <Text as="div" color="gray" size="2">
                <ul style={{ paddingLeft: 18, margin: 0, display: "grid", gap: 8 }}>
                  <li>Meet in a public place, ideally a familiar park.</li>
                  <li>Start on leash, keep distance, and allow sniff time.</li>
                  <li>Keep the first session short, then repeat if it goes well.</li>
                  <li>Do not bring high value toys or food on first meetings.</li>
                  <li>If either dog shows stress, end early and try another match.</li>
                </ul>
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
}
