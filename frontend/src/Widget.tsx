import {
  Paper,
  Button,
  Center,
  Divider,
  Text,
  Checkbox,
  TextInput,
  Flex,
  Grid,
  ActionIcon,
} from "@mantine/core";
import { TokenIn } from "./helpers/TokenIn";
import { SquarePlus } from "tabler-icons-react";
import { TokenOut } from "./helpers/TokenOut";
import { WelcomeConnected } from "./helpers/WelcomeConnected";
import { WelcomeNotConnected } from "./helpers/WelcomeNotConnected";
import { useAccount } from "wagmi";
import { useSpotlight } from "@mantine/spotlight";

import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { Spotlight } from "./Spotlight";
import { useSelector, useDispatch } from "react-redux";
import {
  addOrder,
  removeOrder,
  modifyOrder,
  clearOrders,
} from "./reducers/orderSlice";
import { RootState } from "./store";
import { useEffect } from "react";

export function Widget() {
  const { address, isConnecting, isDisconnected } = useAccount({
    onDisconnect: () => {
      dispatch(clearOrders());
    },
  });
  const dispatch = useDispatch();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  const spotlight = useSpotlight();
  const orders = useSelector((state: RootState) => state.order.orders);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const handlePlusIconClick = () => {
    if (address) {
      spotlight.openSpotlight();
      return;
    }
    if (openConnectModal) {
      openConnectModal();
      return;
    }
  };

  return (
    <>
      {/* <div>
        <p>secret debug menu</p>
        <button onClick={openConnectModal}>Connect</button>
        <button onClick={openAccountModal}>Account</button>
        <button onClick={openChainModal}>Chain</button>
        <Spotlight />
      </div> */}
      <Paper
        shadow="xl"
        radius="md"
        p="xl"
        withBorder
        style={{
          width: "600px",
        }}
      >
        {address ? (
          orders.length === 0 ? (
            <WelcomeConnected />
          ) : null
        ) : (
          <WelcomeNotConnected />
        )}
        {orders.map((order, key) => (
          <TokenIn key={key} tokenAddress={order.tokenAddress} />
        ))}

        <Center
          style={{
            padding: "1rem",
          }}
        >
          <ActionIcon size={"xl"} onClick={handlePlusIconClick}>
            <SquarePlus size={"2.5rem"} />
          </ActionIcon>
        </Center>
        <TokenOut />
        <Text fw={700}>Options</Text>
        <Divider my="sm" />
        <Grid>
          <Grid.Col
            span={4}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox label="Custom Recipient" />
          </Grid.Col>
          <Grid.Col
            span={8}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Recipient Address"
              style={{
                width: "100%",
              }}
            />
          </Grid.Col>
        </Grid>
        <Divider my="sm" />

        {address ? (
          <Button fullWidth size="xl">
            Swap
          </Button>
        ) : (
          <Button fullWidth size="xl" onClick={openConnectModal}>
            Connect Wallet
          </Button>
        )}
      </Paper>
    </>
  );
}
