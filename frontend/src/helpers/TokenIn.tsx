import {
  Paper,
  Title,
  NumberInput,
  Flex,
  CloseButton,
  Center,
} from "@mantine/core";
import { Network, Alchemy } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits, parseUnits } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrder,
  removeOrder,
  modifyOrder,
  clearOrders,
  setReceivedAmount
} from "../reducers/orderSlice";
import { RootState } from "../store";
import { fetch0xPrice } from "./Fetch0xPrice";

const settings = {
  apiKey: "gOvDBVILBb_mWDoSCskHGKJAfNmZO4Yn", // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};
const alchemy = new Alchemy(settings);

interface TokenInfo {
  decimals: number;
  logo: string | null;
  name: string | null;
  symbol: string | null;
}

export function TokenIn({ tokenAddress }: { tokenAddress: string }) {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();
  const [tokenBalance, setTokenBalance] = useState<string>();
  const [userFriendlyBalance, setUserFriendlyBalance] = useState<Number>();
  const [wantToSellAmount, setWantToSellAmount] = useState<Number | "">(0);
  const { address, isConnecting, isDisconnected } = useAccount();
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.order.orders);
  function handleClose() {
    dispatch(removeOrder(tokenAddress));
  }

  useEffect(() => {

    

    if (wantToSellAmount === '') {
      return
    }

    const parsed = parseUnits(String(wantToSellAmount), 18).toString();

    if (parsed === "0") {
      dispatch(
        setReceivedAmount({
          tokenAddress: tokenAddress,
          receivedAmount: "0",
        })
      )
      return;
    }

    console.log(typeof parsed);
    dispatch(
      modifyOrder({
        tokenAddress: tokenAddress,
        amount: parsed,
      })
    );

    console.log(orders);
    fetch0xPrice(tokenAddress, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', parsed)
  }, [wantToSellAmount]);

  useEffect(() => {
    alchemy.core
      .getTokenMetadata(tokenAddress)
      .then((tokenInfo) => {
        console.log(tokenInfo);
        setTokenInfo({
          decimals: tokenInfo.decimals ?? 0,
          logo: tokenInfo.logo,
          name: tokenInfo.name,
          symbol: tokenInfo.symbol,
        });
      })
      .then(() => {
        if (address) {
          alchemy.core
            .getTokenBalances(address, [tokenAddress])
            .then((tokenBalance) => {
              if (tokenBalance.tokenBalances[0].tokenBalance) {
                const balance = BigInt(
                  tokenBalance.tokenBalances[0].tokenBalance
                ).toString();
                console.log("Token balance " + balance);

                setTokenBalance(balance);

                const userFriendlyBalance = formatUnits(
                  balance,
                  tokenInfo?.decimals
                );

                console.log(userFriendlyBalance);
                setUserFriendlyBalance(
                  Math.floor(Number(userFriendlyBalance) * 10000) / 10000
                );
              }
            });
        }
      });
  }, []);

  return (
    <>
      <br />
      <Paper shadow="xl" radius="md" p="md" withBorder>
        <Flex justify={"space-between"}>
          <div style={{}}>
            <Title order={2}>{tokenInfo?.symbol ?? "Loading..."}</Title>
            <Title order={4}>{`Balance: ${
              userFriendlyBalance ? userFriendlyBalance : "Loading..."
            }`}</Title>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <NumberInput
              label="Amount"
              placeholder="0.00"
              defaultValue={0}
              min={0}
              precision={4}
              hideControls
              style={{
                width: "100%",
              }}
              onChange={setWantToSellAmount}
            />

            <CloseButton onClick={handleClose} />
          </div>
        </Flex>
      </Paper>
    </>
  );
}
