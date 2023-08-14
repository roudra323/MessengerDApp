import React from "react";
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

function Home() {
  const { isConnected, isDisconnected } = useAccount();

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
              {}
              <CreateAcc />
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
