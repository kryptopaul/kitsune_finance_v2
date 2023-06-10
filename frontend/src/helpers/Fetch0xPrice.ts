import { setReceivedAmount } from "../reducers/orderSlice";
import { store } from "../store";

export function fetch0xPrice(
  soldToken: string,
  boughtToken: string,
  amount: string
) {
  const handlePriceUpdate = (price: string) => {
    store.dispatch(
      setReceivedAmount({
        tokenAddress: soldToken,
        receivedAmount: price,
      })
    );
    console.log(`Price updated for ${soldToken} -> ${boughtToken}`);
    console.log(
      "New Order Array " + JSON.stringify(store.getState().order.orders)
    );
  };
  try {
    if (amount === "0") {
      return;
    }

    const url = `https://goerli.api.0x.org/swap/v1/quote?sellToken=${soldToken}&buyToken=${boughtToken}&sellAmount=${amount}`;
    console.log(
      `Fetching 0x price for ${soldToken} -> ${boughtToken} (${amount})`
    );
    fetch(url, {
      //   headers: {
      //     "0x-api-key": "07b13ccc-170f-4bb2-867b-ee6f95716b43",
      //   },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        handlePriceUpdate(res.buyAmount);
        console.log(
          `0x price for ${soldToken} -> ${boughtToken} is ${res.buyAmount}`
        );
        return res;
      });
  } catch (error) {
    console.log(error);
  }
}
