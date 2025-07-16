import { ethers } from "ethers";
import contractABI from "../contracts/FileStorage.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const getFiles = async () => {
  if (!window.ethereum) return [];

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      signer
    );

    const rawFiles = await contract.getFiles();

    // Karena struct dari Solidity keluar sebagai array, parse manual
    const files = rawFiles.map((file) => {
      return {
        cid: file.cid, // atau file[1]
        timestamp: new Date(Number(file.timestamp) * 1000).toLocaleString(),
        owner: file.owner, // kalau ingin pakai juga
      };
    });

    return files;
  } catch (error) {
    console.error("Gagal fetch data file:", error);
    return [];
  }
};
