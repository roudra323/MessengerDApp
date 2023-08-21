import abi from "../artifacts/contracts/Messenger.sol/Messenger.json";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Chat from "./components/Chatting/Chat";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
function App() {
  const { address, isConnected, isDisconnected } = useAccount();

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home state={state} />} />
        <Route path="/chat" element={<Chat state={state} />} />
      </Routes>
      {console.log("This is from the App.jsx", state)}
      <Footer />
    </div>
  );
}

export default App;
