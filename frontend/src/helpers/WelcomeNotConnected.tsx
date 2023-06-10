import { Paper, Title, Text } from "@mantine/core";
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
  } from '@rainbow-me/rainbowkit';
export function WelcomeNotConnected() {
    const { openConnectModal } = useConnectModal();
  return (
    <>
      <Paper
        onClick={openConnectModal}
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
        <Title order={2}>🦊 Welcome!</Title>
        <Title order={4}>Connect your wallet to get started.</Title>
      </Paper>
    </>
  );
}
