import { useState } from "react";
import { fetchFromIPFS } from "../utils/fetchFromIPFS";
import { decryptFile } from "../utils/decryptFile";

const Decrypt = () => {
  const [cid, setCid] = useState("");
  const [key, setKey] = useState("");
  const [decryptedFile, setDecryptedFile] = useState("");
  const [fileType, setFileType] = useState("");

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

    const match = decrypted.match(/^data:(.*?);base64,/);
    const type = match ? match[1] : "text/plain";

    setFileType(type);
    setDecryptedFile(decrypted);
  };

  const renderDecryptedOutput = () => {
    if (fileType.startsWith("text")) {
      const base64Content = decryptedFile.split(",")[1];
      const plainText = atob(base64Content);
      return <pre>{plainText}</pre>;
    } else if (fileType.startsWith("image")) {
      return <img src={decryptedFile} alt="Hasil Dekripsi" />;
    } else {
      return (
        <a
          href={decryptedFile}
          download={`decrypted.${fileType.split("/")[1]}`}
        >
          <button>Download File</button>
        </a>
      );
    }
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
          {renderDecryptedOutput()}
        </div>
      )}
    </div>
  );
};

export default Decrypt;
