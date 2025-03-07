const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Ambil kontrak factory
  const FileStorage = await hre.ethers.getContractFactory("FileStorage");

  // Deploy kontrak
  const fileStorage = await FileStorage.deploy();
  await fileStorage.waitForDeployment();

  // Ambil alamat kontrak yang telah dideploy
  const contractAddress = await fileStorage.getAddress();
  console.log("Contract deployed to:", contractAddress);

  // Path file .env
  const envPath = path.join(__dirname, "../.env");

  // Periksa apakah .env sudah ada
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, ""); // Buat file .env jika belum ada
  }

  // Baca isi .env yang sudah ada
  let envContent = fs.readFileSync(envPath, "utf-8");

  // Hapus baris lama CONTRACT_ADDRESS jika ada
  envContent = envContent.replace(/^CONTRACT_ADDRESS=.*$/m, "");

  // Tambahkan CONTRACT_ADDRESS baru
  envContent += `\nCONTRACT_ADDRESS=${contractAddress}\n`;

  // Tulis kembali ke .env
  fs.writeFileSync(envPath, envContent.trim(), "utf-8");

  console.log(".env updated with contract address.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
