export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0]; // Mengembalikan alamat wallet pertama
    } catch (error) {
      console.error("User rejected the request", error);
      return null;
    }
  } else {
    alert("MetaMask tidak terdeteksi. Install MetaMask terlebih dahulu.");
    return null;
  }
};
