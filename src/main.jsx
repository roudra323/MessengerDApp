import "./polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import { polygon, optimism, arbitrum, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./App.css";

const { chains, publicClient } = configureChains(
  [sepolia, polygon, optimism, arbitrum, zora],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "BoilerPlateV2",
  projectId: import.meta.env.VITE_RAINBOWKIT_KEY,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={midnightTheme({
          accentColor: "#7928CA",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
