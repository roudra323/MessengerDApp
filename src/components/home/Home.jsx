import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  Center,
  Flex,
  Text,
  Box,
  Image,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import CreateAcc from "../createAcc/createAcc";
import Features from "../ops/features";

function Home({ state }) {
  const { contract } = state;
  const { address, isConnected, isDisconnected } = useAccount();

  const [isRegistered, setIsRegistered] = useState(false); // State to track registration status

  const checkRegistration = async () => {
    if (isConnected) {
      const registered = await isRegi();
      setIsRegistered(registered);
    }
  };

  useEffect(() => {
    checkRegistration(); // Update registration status whenever any relevant state changes
  }, [isConnected, contract, address, isRegistered]);

  const isRegi = async () => {
    const isRegistered = await contract.checkUserExists(address);
    console.log("isRegistered", isRegistered);
    return isRegistered;
  };

  return (
    <Box className="page-container">
      <Flex
        className="content-container"
        alignItems="center"
        justifyContent="space-between"
        pt="80px"
      >
        {/* Left Section: Text */}
        <Center flex="1">
          {isConnected ? (
            <VStack>
              <Text
                pl="10px"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >
                Send Requests
                <br /> Chat
                <br /> And Forge Lasting Bonds!
              </Text>
              {isRegistered ? <Features /> : <CreateAcc state={state} />}
            </VStack>
          ) : (
            <Text
              pl="10px"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              Connect Your Wallet
              <br /> and Unlock
              <br /> A World of Seamless Friendship
            </Text>
          )}
          {/* Right Section: GIF */}
          <div>
            <Image
              pl="100px"
              className="home-img"
              src="gif.jpg"
              alt="GIF"
              width="100%"
            />
          </div>
        </Center>
      </Flex>
    </Box>
  );
}

export default Home;
