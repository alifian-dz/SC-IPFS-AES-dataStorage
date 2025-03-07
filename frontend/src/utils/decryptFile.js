import CryptoJS from "crypto-js";

export const decryptFile = (encryptedData, key) => {
  if (!encryptedData) {
    console.error("Data terenkripsi kosong atau tidak ditemukan.");
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (!originalText) {
      console.error("Dekripsi gagal, kemungkinan key salah.");
      return null;
    }

    // Jika hasilnya masih dalam Base64, ubah ke teks biasa
    if (originalText.startsWith("data:text/plain;base64,")) {
      originalText = atob(originalText.replace("data:text/plain;base64,", ""));
    }

    return originalText;
  } catch (error) {
    console.error("Error saat dekripsi:", error);
    return null;
  }
};
