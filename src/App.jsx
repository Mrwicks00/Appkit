import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { initAppkit } from "./config/WalletConnections/appKit";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import {
  mainnet,
  sepolia,
  lisk,
  liskSepolia,
  base,
  polygon,
} from "wagmi/chains";

function App() {
  const [connectWallet, setConectWallet] = useState(false);
  const [connector, setConnector] = useState(null);
  const accounts = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const supportedChains = [mainnet, sepolia, lisk, liskSepolia, base, polygon];

  useEffect(() => {
    if (!connector) {
      return;
    }

    if (accounts.address === undefined) return;

    setConectWallet(false);
  }, [accounts.connector]);

  const connectConnector = (connector) => {
    connect({ connector: connector });
    console.log("ACCOUNTS:,", accounts);
    console.log("CONNECTORS:,", connectors);
  };

  const letConnect = () => {
    setConectWallet(true);
  };

  const disconnectWallet = () => {
    if (connector) {
      disconnect();
      setConectWallet(false);
      setConnector(null);
    }
  };

  // const handleSwitchChain = (id) => {
  //   switchChain({ chainId: Number(id) });
  // };

  return (
    <>
      {!connector ? (
        <div>
          {!connectWallet ? (
            <button onClick={letConnect}>Connect Wallet</button>
          ) : (
            <div>
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connectConnector(connector)}
                >
                  {connector.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Address: {accounts.address}</p>
          <p>{accounts.isConnected ? "Connected Succesfully" : ""}</p>
          <p> Chain: {accounts.chain.name}</p>
          {/* <select
            value={accounts.chain.id}
            onChange={(e) => handleSwitchChain(e.target.value)}
          >
            {supportedChains ? (
              supportedChains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))
            ) : (
              <option>No Chains</option>
            )}
          </select> */}
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      )}
    </>
  );
}

export default App;
