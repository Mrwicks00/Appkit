import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WagmiProvider } from "wagmi";
import { config } from "./config/WalletConnections/wagmi.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// let queryClient = QueryClient | null;

const queryClient = new QueryClient();
// const getQueryClient = () => {
//   if (!queryClient) {
//     queryClient = new QueryClient();
//   }

//   queryClient;
// };

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
