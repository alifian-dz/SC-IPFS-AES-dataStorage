import CryptoJS from "crypto-js";

export const encryptFile = async (file, key) => {
  if (!file || file.size === 0) {
    throw new Error("File kosong atau tidak valid!");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const base64 = reader.result; // ← sudah data:...;base64,...
        const encrypted = CryptoJS.AES.encrypt(base64, key).toString();
        const blob = new Blob([encrypted], { type: "text/plain" });
        resolve(blob);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file); // ← gunakan DataURL agar base64
  });
};
