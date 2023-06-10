import { Paper, Title, Flex } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { formatUnits } from "ethers";
export function TokenOut() {
  function fetchTotalReceived() {
    let sum = orders.reduce((a, b) => a + BigInt(b.receivedAmount), BigInt(0));

    let etherSum = formatUnits(sum.toString(), 18);

    let result = Number(etherSum).toFixed(4);
    return result;
  }

  const orders = useSelector((state: RootState) => state.order.orders);

  const [totalReceived, setTotalReceived] = useState<string>("0");

  useEffect(() => {
    console.log("Something has changed...");
    console.log(orders);
    const total = fetchTotalReceived();
    setTotalReceived(total);
  });

  return (
    <>
      <Paper shadow="xl" radius="md" p="md" withBorder>
        <Flex justify={"space-between"}>
          <div>
            <Title order={4}>Swap To:</Title>
            <Title order={2}>ETH</Title>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Title order={2}>{`+ ${totalReceived}`}</Title>
          </div>
        </Flex>
      </Paper>
      <br />
    </>
  );
}
