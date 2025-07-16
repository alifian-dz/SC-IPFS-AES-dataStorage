const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const FileStorage = await hre.ethers.getContractFactory("FileStorage");
  const fileStorage = await FileStorage.deploy();
  await fileStorage.waitForDeployment();

  const contractAddress = await fileStorage.getAddress();
  console.log("✅ Contract deployed to:", contractAddress);

  // 🔁 Path ke .env di frontend/src
  const envPath = path.join(__dirname, "../../frontend/src/.env");

  // Buat file .env kalau belum ada
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, "", "utf-8");
  }

  let envContent = fs.readFileSync(envPath, "utf-8");

  // Pisahkan per baris dan update hanya baris VITE_CONTRACT_ADDRESS
  let lines = envContent.split("\n").filter(Boolean);
  let found = false;

  lines = lines.map((line) => {
    if (line.startsWith("VITE_CONTRACT_ADDRESS=")) {
      found = true;
      return `VITE_CONTRACT_ADDRESS=${contractAddress}`;
    }
    return line;
  });

  if (!found) {
    lines.push(`VITE_CONTRACT_ADDRESS=${contractAddress}`);
  }

  fs.writeFileSync(envPath, lines.join("\n"), "utf-8");
  console.log("✅ .env updated with VITE_CONTRACT_ADDRESS");

  // 🔁 Salin ABI ke frontend/src/contracts/
  const abiSrc = path.resolve(
    __dirname,
    "../artifacts/contracts/FileStorage.sol/FileStorage.json"
  );
  const abiDest = path.resolve(
    __dirname,
    "../../frontend/src/contracts/FileStorage.json"
  );
  fs.copyFileSync(abiSrc, abiDest);
  console.log("✅ ABI copied to frontend/src/contracts");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
