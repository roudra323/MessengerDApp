import React from "react";
import ConnectButton from "../connectButton/ConnectButton";
import { Flex } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <Flex justify="space-between" align="center" padding="30px" className="Nav">
      <Flex>
        <Image
          className="logo"
          boxSize="60px"
          src="result.png"
          alt="Dan Abramov"
        />
      </Flex>
      <Flex>
        <ConnectButton />
      </Flex>
    </Flex>
  );
};

export default Navbar;
