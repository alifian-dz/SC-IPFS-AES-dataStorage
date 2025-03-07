import { useState } from "react";
import { encryptFile } from "../utils/encryptFile";
import { uploadToPinata } from "../utils/uploadToPinata";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");

  const handleUpload = async () => {
    const encryptedFile = await encryptFile(file, key);
    const cid = await uploadToPinata(encryptedFile);
    alert(`File berhasil diunggah ke IPFS dengan CID: ${cid}`);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="password"
        placeholder="Masukkan key"
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFile;
