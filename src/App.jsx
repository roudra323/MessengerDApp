import abi from "../artifacts/contracts/Storage.sol/WagmiTest.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Button,
  Spacer,
  VStack,
  Grid,
  GridItem,
  Center,
  Divider,
} from "@chakra-ui/react";

import Read from "./components/Read";
import Write from "./components/Write";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const { address, isConnected, isDisconnected } = useAccount();
  const [balance, setBalance] = useState(0);

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

        const ContractBalance = await contract.contractBalance();
        const balEth = ethers.formatEther(ContractBalance);
        console.log("Contract balance (eth)", balEth);
        setBalance(balEth);
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
        <ConnectButton onPress={contractInstance} />
        {console.log("state", state)}
      </div>
      <div align="center" className="home">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          pb="50px"
        >
          Welcome to wagmi test DApp
        </Text>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
          pb="100px"
        >
          Contract Balance: {balance.toString()} eth
        </Text>

        <VStack pb="50px">
          <Read state={state} />
          <Spacer />
          <Write state={state} />
        </VStack>
      </div>
    </div>
  );
}

export default App;
