import { useState } from "react";
import { fetchFromIPFS } from "../utils/fetchFromIPFS";
import { decryptFile } from "../utils/decryptFile";

const Decrypt = () => {
  const [cid, setCid] = useState("");
  const [key, setKey] = useState("");
  const [decryptedFile, setDecryptedFile] = useState("");

  const handleDecrypt = async () => {
    if (!cid || !key) {
      alert("CID dan key harus diisi!");
      return;
    }

    const encryptedData = await fetchFromIPFS(cid);
    if (!encryptedData) {
      alert("Gagal mengambil data dari IPFS! Pastikan CID benar.");
      return;
    }

    const decrypted = decryptFile(encryptedData, key);
    if (!decrypted) {
      alert("Key salah atau dekripsi gagal!");
      return;
    }

    setDecryptedFile(`data: ${decrypted}`); // Tambahkan label "data: "
  };

  return (
    <div>
      <h2>Dekripsi File</h2>
      <input
        type="text"
        placeholder="Masukkan CID"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
      />
      <input
        type="password"
        placeholder="Masukkan key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleDecrypt}>Dekripsi</button>
      {decryptedFile && (
        <div>
          <h3>Hasil Dekripsi:</h3>
          <pre>{decryptedFile}</pre>{" "}
          {/* Gunakan <pre> agar format tetap rapi */}
        </div>
      )}
    </div>
  );
};

export default Decrypt;
