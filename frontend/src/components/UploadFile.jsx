import { useState } from "react";
import { encryptFile } from "../utils/encryptFile";
import { uploadToPinata } from "../utils/uploadToPinata";
import { uploadToBlockchain } from "../utils/uploadToBlockchain";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !key) {
      alert("Mohon pilih file dan masukkan key terlebih dahulu!");
      return;
    }

    try {
      setIsUploading(true);
      setMessage("🔐 Mengenkripsi file...");

      // 1. Enkripsi file
      const encryptedBlob = await encryptFile(file, key);

      // 2. Upload ke IPFS via Pinata
      setMessage("🚀 Mengunggah ke IPFS...");
      const cid = await uploadToPinata(encryptedBlob, file.name);

      alert(`✅ File berhasil diunggah ke IPFS\nCID: ${cid}`);

      // 3. Upload CID ke smart contract (akan trigger MetaMask!)
      setMessage("🧾 Mengirim CID ke blockchain...");
      await uploadToBlockchain(cid);

      alert("📦 CID berhasil disimpan ke smart contract.");
      setMessage(
        "✅ File berhasil dienkripsi, disimpan di IPFS, dan dicatat di blockchain!"
      );

      // Opsional: refresh halaman untuk tampilkan data terbaru di Explore
      window.location.reload();
    } catch (error) {
      console.error("❌ Gagal upload:", error);
      alert("Terjadi kesalahan saat upload. Cek console.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="password"
        placeholder="Masukkan key"
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {/* Status Pesan */}
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default UploadFile;
