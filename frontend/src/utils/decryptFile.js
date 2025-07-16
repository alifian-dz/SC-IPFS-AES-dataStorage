import CryptoJS from "crypto-js";

export const decryptFile = (encryptedData, key) => {
  if (!encryptedData) {
    console.error("Data terenkripsi kosong atau tidak ditemukan.");
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const base64DataURL = bytes.toString(CryptoJS.enc.Utf8);

    if (!base64DataURL.startsWith("data:")) {
      console.error("Dekripsi berhasil, tapi format tidak valid.");
      return null;
    }

    return base64DataURL; // ← hasil data:image/png;base64,... atau sejenis
  } catch (error) {
    console.error("Error saat dekripsi:", error);
    return null;
  }
};
