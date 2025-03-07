import CryptoJS from "crypto-js";

export const encryptFile = (file, key) => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = () => {
      const encrypted = CryptoJS.AES.encrypt(reader.result, key).toString();
      resolve(encrypted);
    };
    reader.readAsDataURL(file);
  });
};
