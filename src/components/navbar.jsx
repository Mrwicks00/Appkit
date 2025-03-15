import React, { useState, useEffect } from "react";
import "../Navbar.css";

const Navbar = ({ address, setConnectWalletModal, disconnect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger animation on mount
  }, []);

  const truncateAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <nav className="navbar">
      <div className={`logo ${animate ? "animate-logo" : ""}`} id="app.title">
        CONN3CTIVITY
      </div>

      <div className="nav-actions">
        {!address ? (
          <button
            className="connect-button-nav"
            onClick={() => setConnectWalletModal(true)}
          >
            Launch App 🚀
          </button>
        ) : (
          <div className="dropdown">
            <button
              className="wallet-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {truncateAddress(address)}{" "}
              <span className="dropdown-icon">▼</span>
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button className="disconnect-button-nav" onClick={disconnect}>
                  Disconnect
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
