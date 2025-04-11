import CryptoJS from "crypto-js";

export const decryptFile = (encryptedData, key) => {
  if (!encryptedData) {
    console.error("Data terenkripsi kosong atau tidak ditemukan.");
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (!originalText) {
      console.error("Dekripsi gagal, kemungkinan key salah.");
      return null;
    }

    return originalText;
  } catch (error) {
    console.error("Error saat dekripsi:", error);
    return null;
  }
};
