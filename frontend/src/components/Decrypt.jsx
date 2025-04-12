import { useState } from "react";
import { fetchFromIPFS } from "../utils/fetchFromIPFS";
import { decryptFile } from "../utils/decryptFile";

const Decrypt = () => {
  const [cid, setCid] = useState("");
  const [key, setKey] = useState("");
  const [decryptedFile, setDecryptedFile] = useState("");
  const [fileType, setFileType] = useState("");
  const [canDisplayText, setCanDisplayText] = useState(false);

  const mimeToExtension = (mime) => {
    const map = {
      "application/pdf": "pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "application/msword": "doc",
      "application/vnd.ms-excel": "xls",
      "text/plain": "txt",
      "image/png": "png",
      "image/jpeg": "jpg",
      "application/zip": "zip",
    };
    return map[mime] || "bin"; // fallback ke .bin jika tidak dikenali
  };

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

    // Deteksi MIME type dari prefix base64
    const matches = decrypted.match(/^data:([^;]+);base64,/);
    const mime = matches?.[1] || "";
    setFileType(mime);
    setDecryptedFile(decrypted);

    if (mime.startsWith("text/")) {
      // Convert base64 ke teks biasa
      const base64Content = decrypted.split(",")[1];
      const text = atob(base64Content);
      setCanDisplayText(true);
      setDecryptedFile(text);
    } else {
      setCanDisplayText(false);
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
          {canDisplayText ? (
            <pre>{decryptedFile}</pre>
          ) : (
            <>
              <p>File berhasil didekripsi. Silakan unduh:</p>
              <a
                href={decryptedFile}
                download={`decrypted.${mimeToExtension(fileType)}`}
              >
                <button>Download File</button>
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Decrypt;
