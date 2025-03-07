import axios from "axios";

export const fetchFromIPFS = async (cid) => {
  try {
    const url = `${import.meta.env.VITE_PINATA_SERVER}${cid}`;
    const response = await axios.get(url);

    console.log("Response dari IPFS:", response.data); // Debugging

    if (!response.data || !response.data.data) {
      console.error("Data dari IPFS tidak valid:", response.data);
      return null;
    }

    return response.data.data; // Ambil hanya bagian data
  } catch (error) {
    console.error("Gagal mengambil data dari IPFS:", error);
    return null;
  }
};
