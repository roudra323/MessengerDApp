import React from "react";
import ConnectButton from "../connectButton/ConnectButton";
import { Flex } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <Flex justify="space-between" align="center" padding="30px" className="Nav">
      <Flex>Navbar</Flex>
      <Flex>
        <ConnectButton />
      </Flex>
    </Flex>
  );
};

export default Navbar;
