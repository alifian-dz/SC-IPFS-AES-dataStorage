import CryptoJS from "crypto-js";

export const decryptFile = (encryptedData, key) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Dekripsi gagal:", error);
    return null;
  }
};
