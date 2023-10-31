import "./App.css";
import { useState } from "react";
import WalletInputs from "./components/WalletInputs";

function App() {
  const [wallet, setWallet] = useState("");
  const [chain, setChain] = useState("0x1");

  return (
    <div className="App">
      <WalletInputs
        wallet={wallet}
        setWallet={setWallet}
        chain={chain}
        setChain={setChain}
      />
    </div>
  );
}

export default App;
