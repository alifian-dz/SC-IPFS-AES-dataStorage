import { useEffect, useState } from "react";
import { connectWallet } from "../utils/connectWallet";

const ConnectButton = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    // Cek apakah wallet sudah terhubung saat halaman dimuat
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  const handleConnectWallet = async () => {
    const account = await connectWallet();
    if (account) {
      setWalletAddress(account);
    }
  };

  return (
    <button
      onClick={handleConnectWallet}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {walletAddress
        ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
};

export default ConnectButton;
