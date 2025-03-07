import { useState } from "react";
import ConnectButton from "./components/ConnectButton";
import UploadFile from "./components/UploadFile";
import Explore from "./components/Explore";
import Decrypt from "./components/Decrypt";

function App() {
  const [userAddress, setUserAddress] = useState("");

  return (
    <div className="app">
      <header>
        <h1>IPFS & AES-256 DApp</h1>
        <ConnectButton setUserAddress={setUserAddress} />
      </header>
      <main>
        <UploadFile />
        <Explore />
        <Decrypt />
      </main>
    </div>
  );
}

export default App;
