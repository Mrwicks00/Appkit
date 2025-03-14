import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { arbitrum, lisk, mainnet, polygon } from "@reown/appkit/networks";

// 1. Get projectId
const projectId = import.meta.env.VITE_PROJECTID;

// 2. Set the networks
const networks = [arbitrum, polygon, lisk, mainnet];

// 3. Create a metadata object - optional
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create a AppKit instance
export const initAppkit = () =>
  createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    features: {
      analytics: true, // Optional - defaults to your Cloud configuration
    },

    allowUnsupportedChain: true,
    allWallets: "SHOW",
    chainImages: {
      4202: "https://e7.pngegg.com/pngimages/314/92/png-clipart-blockchain-lisk-logo-cryptocurrency-rebranding-others-miscellaneous-angle-thumbnail.png",
    },

    connectorImages: {
      "io.Metamask":
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AMetaMask_Fox.svg&psig=AOvVaw2BAMHc3ujUPA6gsR5iLcKk&ust=1741974273165000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDWv4POh4wDFQAAAAAdAAAAABAE",
    },
    enableWalletConnect: false,
  });
