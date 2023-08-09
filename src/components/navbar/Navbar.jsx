import React from "react";
import ConnectButton from "../connectButton/ConnectButton";
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <Flex justify="space-between" align="center" padding="30px" className="Nav">
      <Flex justify="space-evenly">
        <Image
          className="logo"
          boxSize="60px"
          src="logo-bg-rmv.png"
          alt="ChainChat"
        />
      </Flex>
      <Flex>
        <ConnectButton />
      </Flex>
    </Flex>
  );
};

export default Navbar;
