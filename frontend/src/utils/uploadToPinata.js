// uploadToPinata.js
import axios from "axios";

const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const jwt = import.meta.env.VITE_JWT_PINATA;

export const uploadToPinata = async (
  fileBlob,
  originalFileName = "encrypted.txt"
) => {
  const formData = new FormData();
  formData.append("file", fileBlob, originalFileName);

  // Tambahkan metadata opsional (namafile di dashboard pinata)
  const metadata = JSON.stringify({
    name: originalFileName,
  });
  formData.append("pinataMetadata", metadata);

  try {
    const response = await axios.post(pinataEndpoint, formData, {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Gagal upload ke Pinata:", error);
    throw error;
  }
};
