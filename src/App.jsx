import { useEffect, useState } from "react";
import "./App.css";
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
  const [connectWallet, setConnectWallet] = useState(false);
  const [connector, setConnector] = useState(null);
  const accounts = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const supportedChains = [mainnet, sepolia, lisk, liskSepolia, base, polygon];

  useEffect(() => {
    if (accounts.address) {
      setConnector(accounts.connector);
      setConnectWallet(false);
    }
  }, [accounts.address, accounts.connector]);

  const connectConnector = (_connector) => {
    if (_connector) {
      connect({ connector: _connector });
      setConnector(_connector);
    }
  };

  const letConnect = () => {
    setConnectWallet(true);
  };

  const disconnectWallet = () => {
    if (connector) {
      disconnect();
      setConnector(null);
      setConnectWallet(false);
    }
  };

  const handleSwitchChain = (id) => {
    if (id) switchChain({ chainId: Number(id) });
  };

  return (
    <>
      {!connector ? (
        <div>
          {!connectWallet ? (
            <button onClick={letConnect}>Connect Wallet</button>
          ) : connectors.length > 0 ? (
            <div>
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connectConnector(connector)}
                >
                  {connector.name}
                </button>
              ))}
              <button onClick={() => setConnectWallet(false)}>Cancel</button>
            </div>
          ) : (
            <p>No available connectors</p>
          )}
        </div>
      ) : (
        <div>
          <p>Address: {accounts.address}</p>
          <p>{accounts.isConnected ? "Connected Successfully" : ""}</p>
          <p>Chain: {accounts.chain?.name}</p>
          <select
            value={accounts.chain?.id}
            onChange={(e) => handleSwitchChain(e.target.value)}
          >
            {supportedChains.length > 0 ? (
              supportedChains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))
            ) : (
              <option>No Chains</option>
            )}
          </select>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      )}
    </>
  );
}

export default App;
