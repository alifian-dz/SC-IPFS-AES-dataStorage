import { ethers } from "ethers";
import contractABI from "../contracts/FileStorage.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const uploadToBlockchain = async (cid) => {
  if (!window.ethereum) return alert("MetaMask tidak ditemukan!");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    signer
  );

  try {
    const tx = await contract.uploadFile(cid);
    await tx.wait();
    alert("CID berhasil disimpan di blockchain!");
  } catch (error) {
    console.error("Gagal menyimpan CID:", error);
  }
};
