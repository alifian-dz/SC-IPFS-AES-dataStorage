import { ethers } from "ethers";
import contractABI from "../contracts/FileStorage.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const uploadToBlockchain = async (cid) => {
  if (!window.ethereum) {
    alert("❌ MetaMask tidak ditemukan! Harap install atau aktifkan.");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Debug: Pastikan ABI dan Address tersedia
    if (!contractABI.abi) {
      console.error("❌ ABI tidak ditemukan dalam FileStorage.json");
      alert(
        "ABI tidak ditemukan. Pastikan file ABI sudah disalin dengan benar."
      );
      return;
    }

    if (!contractAddress) {
      console.error("❌ Alamat kontrak tidak ditemukan di .env");
      alert("Alamat kontrak tidak ditemukan di .env");
      return;
    }

    const contract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      signer
    );

    console.log("📦 CID yang akan dikirim ke blockchain:", cid);
    const tx = await contract.uploadFile(cid);

    console.log("🕓 Menunggu konfirmasi transaksi...");
    await tx.wait();
    console.log("✅ Transaksi berhasil!");

    alert("✅ CID berhasil disimpan di blockchain!");
  } catch (error) {
    console.error("❌ Gagal menyimpan CID ke blockchain:", error);

    // Jika error MetaMask ditolak user
    if (error.code === 4001) {
      alert("Transaksi dibatalkan oleh pengguna.");
    } else {
      alert("Gagal menyimpan CID ke blockchain. Cek console untuk detail.");
    }

    throw error; // lempar ulang agar bisa di-handle oleh UploadFile.jsx
  }
};
