// fetchFromIPFS.js
export const fetchFromIPFS = async (cid) => {
  try {
    const url = `${import.meta.env.VITE_PINATA_SERVER}${cid}`;
    const response = await fetch(url);
    const encryptedText = await response.text(); // ← ambil sebagai string
    return encryptedText;
  } catch (error) {
    console.error("Gagal mengambil data dari IPFS:", error);
    return null;
  }
};
