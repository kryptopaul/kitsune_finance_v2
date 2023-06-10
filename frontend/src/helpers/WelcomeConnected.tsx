import { Paper, Title, Text } from "@mantine/core";
import { useSpotlight } from "@mantine/spotlight";

export function WelcomeConnected() {
  const spotlight = useSpotlight();

  return (
    <>
      <Paper
        onClick={() => spotlight.openSpotlight()}
        shadow="xl"
        radius="md"
        p="md"
        withBorder
        sx={(theme) => ({
          cursor: "pointer",

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
      >
        <Title order={2}>💱 Select your first token!</Title>
        <Title order={4}>Click here to start your trade!</Title>
      </Paper>
    </>
  );
}
