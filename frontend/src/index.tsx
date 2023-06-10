import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Provider } from "react-redux";
import { store } from "./store";

import { Button, Group } from "@mantine/core";
import { SpotlightProvider, spotlight } from "@mantine/spotlight";
import type { SpotlightAction } from "@mantine/spotlight";
import {
  IconHome,
  IconDashboard,
  IconFileText,
  IconSearch,
} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { addOrder } from "./reducers/orderSlice";
import { addOrderFromSpotlight } from "./helpers/AddOrderFromSpotlight";

const { chains, publicClient } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: "gOvDBVILBb_mWDoSCskHGKJAfNmZO4Yn" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "KitsuneFinance",
  projectId: "16d4b1c9eb69c3da8391eb428468856a",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const actions: SpotlightAction[] = [
  {
    title: "UNI",
    description: "Uniswap - 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    onTrigger: () =>
      addOrderFromSpotlight("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"),
  },
  {
    title: "WETH",
    description: "Wrapped Ether - 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    onTrigger: () =>
      addOrderFromSpotlight("0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"),
  },
];

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#f05c0c",
          borderRadius: "small",
        })}
        coolMode
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
            primaryColor: "orange",
          }}
        >
          <SpotlightProvider
            actions={actions}
            searchIcon={<IconSearch size="1.2rem" />}
            searchPlaceholder="Search for Tokens"
            nothingFoundMessage="Nothing found..."
          >
            <App />
          </SpotlightProvider>
        </MantineProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
