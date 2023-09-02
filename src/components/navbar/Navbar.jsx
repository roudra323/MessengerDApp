import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { Flex, Button, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  return (
    <Flex justify="space-between" align="center" padding="30px" className="Nav">
      <Flex justify="space-evenly">
        <Image
          className="logo"
          boxSize="60px"
          src="logo-bg-rmv.png"
          alt="ChainChat"
          onClick={() => navigate("/")}
          cursor="pointer"
        />
      </Flex>
      <Flex>
        <div className="app">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 12,
            }}
          >
            <ConnectButton
              // onPress={contractInstance}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
            {/* {console.log("state", state)} */}
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default Navbar;
