import { ethers } from "ethers";
import contractABI from "../../../backend/artifacts/contracts/FileStorage.sol/FileStorage.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const getFiles = async () => {
  if (!window.ethereum) return alert("MetaMask tidak ditemukan!");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    signer
  );

  try {
    const files = await contract.getFiles();
    return files.map((file) => ({
      cid: file.cid,
      timestamp: new Date(file.timestamp * 1000).toLocaleString(),
    }));
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return [];
  }
};
