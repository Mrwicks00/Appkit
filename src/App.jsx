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
import Navbar from "./components/navbar";

// Default wallet logo
const defaultWalletIcon =
  "https://images.mirror-media.xyz/publication-images/Lx_fohJ8ttprQ3DmDKU9N.png?height=2048&width=2048";

function App() {
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [copying, setCopying] = useState(false);
  const [selectedChain, setSelectedChain] = useState(mainnet.id);
  const [connectingId, setConnectingId] = useState(null);

  const { address, chainId, connector: activeConnector } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const supportedChains = [mainnet, sepolia, lisk, liskSepolia, base, polygon];

  // Determine eligibility
  const isEligible =
    address &&
    (address.toLowerCase().startsWith("0x1") ||
      address?.toLowerCase().endsWith("7"));

  // Function to truncate address
  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    if (address && activeConnector) {
      // Store connected wallet info including name and icon
      setConnectedWallet({
        name: activeConnector.name,
        icon: activeConnector.icon || defaultWalletIcon,
      });
      setConnectWalletModal(false);
      setConnectingId(null);
    }
  }, [address, activeConnector]);

  const connectConnector = (connector) => {
    if (connector) {
      setConnectingId(connector.id);
      connect({ connector }).catch(() => {
        setConnectingId(null);
      });
    }
  };

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopying(true);
      setTimeout(() => setCopying(false), 1500);
    }
  };

  const handleChainChange = (e) => {
    const chainId = Number(e.target.value);
    setSelectedChain(chainId);
    switchChain({ chainId });
  };

  return (
    <>
      <Navbar
        address={address}
        setConnectWalletModal={setConnectWalletModal}
        disconnect={disconnect}
      />

      <div id="root">
        <h1 className="app-title">CONN3CTIVITY</h1>
        <p className="app-subtitle">Securely connect and manage your wallet</p>

        {!address ? (
          <button
            className="connect-button"
            onClick={() => setConnectWalletModal(true)}
          >
            Connect Wallet
          </button>
        ) : (
          <div className="connected-wallet">
            <h2>Connected Wallet</h2>
            <div className="wallet-info">
              <div className="wallet-provider">
                <div className="wallet-icon-container">
                  {connectedWallet?.icon && (
                    <img
                      src={connectedWallet.icon}
                      alt={connectedWallet.name || "Wallet"}
                      className="wallet-icon"
                    />
                  )}
                </div>
                <span className="wallet-name">
                  {connectedWallet?.name || "Unknown Wallet"}
                </span>
              </div>

              <div className="address-display">
                <div className="address-status">
                  <div className="status-indicator"></div>
                  <span className="status-text">Connected</span>
                </div>
                <span className="address-value">
                  {truncateAddress(address)}
                </span>
                <button className="copy-button" onClick={handleCopy}>
                  {copying ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className={isEligible ? "eligible" : "not-eligible"}>
                {isEligible ? "✓ Eligible for Airdrop" : "✗ Not Eligible"}
              </div>
            </div>

            {/* Chain Selector */}
            <div className="chain-selector">
              <label htmlFor="chain-select">Network:</label>
              <div className="select-wrapper">
                <select
                  id="chain-select"
                  value={selectedChain || chainId}
                  onChange={handleChainChange}
                >
                  {supportedChains.map((chain) => (
                    <option key={chain.id} value={chain.id}>
                      {chain.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="disconnect-button" onClick={() => disconnect()}>
              Disconnect Wallet
            </button>
          </div>
        )}

        {/* Modal for Wallet Selection */}
        {connectWalletModal && (
          <div className="Modal">
            <div className="modal-header">
              <h2>Connect Wallet</h2>
              <p className="modal-subheading">Choose your preferred wallet</p>
            </div>

            <button
              className="cancel"
              onClick={() => {
                setConnectWalletModal(false);
                setConnectingId(null);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
