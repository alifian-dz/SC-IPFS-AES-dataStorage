import axios from "axios";

export const fetchFromIPFS = async (cid) => {
  try {
    const url = `${import.meta.env.VITE_PINATA_SERVER}${cid}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data dari IPFS:", error);
    return null;
  }
};
