import axios from "axios";

export const uploadToPinata = async (encryptedFile) => {
  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    { data: encryptedFile },
    { headers: { Authorization: `Bearer ${import.meta.env.VITE_JWT_PINATA}` } }
  );
  return response.data.IpfsHash;
};
