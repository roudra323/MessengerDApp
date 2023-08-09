import abi from "../../../artifacts/contracts/Messenger.sol/Messenger.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const { address, isConnected, isDisconnected } = useAccount();

  const contractInstance = async () => {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({ provider, signer, contract });
      } else {
        alert("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      contractInstance();
      console.log("Connected");
    }
  }, [isConnected]);

  return (
    <div className="app">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
        }}
      >
        <ConnectButton
          onPress={contractInstance}
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
        {console.log("state", state)}
      </div>
    </div>
  );
}

export default App;
