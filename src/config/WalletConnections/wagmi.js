import { http, createConfig, useConnectors } from "wagmi";
import {
  mainnet,
  sepolia,
  liskSepolia,
  lisk,
  polygon,
  base,
} from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

const projectId = import.meta.env.VITE_PROJECTID;

export const config = createConfig({
  chains: [mainnet, sepolia, liskSepolia, lisk, polygon, base],
  multiInjectedProviderDiscovery: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId,
    }),
  ],
});
