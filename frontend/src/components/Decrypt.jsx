import { useState } from "react";
import { fetchFromIPFS } from "../utils/fetchFromIPFS";
import { decryptFile } from "../utils/decryptFile";

const Decrypt = () => {
  const [cid, setCid] = useState("");
  const [key, setKey] = useState("");
  const [decryptedFile, setDecryptedFile] = useState("");

  const handleDecrypt = async () => {
    const encryptedData = await fetchFromIPFS(cid);
    if (!encryptedData) return alert("Gagal mengambil data dari IPFS!");

    const decrypted = decryptFile(encryptedData, key);
    if (!decrypted) return alert("Key salah atau dekripsi gagal!");

    setDecryptedFile(decrypted);
  };

  return (
    <div>
      <h2>Dekripsi File</h2>
      <input
        type="text"
        placeholder="Masukkan CID"
        onChange={(e) => setCid(e.target.value)}
      />
      <input
        type="password"
        placeholder="Masukkan key"
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleDecrypt}>Dekripsi</button>
      {decryptedFile && (
        <div>
          <h3>Hasil Dekripsi:</h3>
          <p>{decryptedFile}</p>
        </div>
      )}
    </div>
  );
};

export default Decrypt;
