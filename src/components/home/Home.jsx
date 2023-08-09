import "./Home.css";
import { Center, Flex, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import Footer from "../footer/Footer";

function Home() {
  const { address, isConnected, isDisconnected } = useAccount();

  return (
    <div className="home-bg">
      <Flex alignItems="center" justifyContent="space-between" pt="80px">
        {/* Left Section: Text */}
        <Center flex="1">
          {isConnected ? (
            <Text
              pl="10px"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              Send Requests,
              <br /> Chat,
              <br /> and Forge Lasting Bonds!
            </Text>
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
        </Center>

        {/* Right Section: GIF */}
        <div>
          <img className="home-img" src="gif.jpg" alt="GIF" width="100%" />
        </div>
      </Flex>
      <Footer />
    </div>
  );
}

export default Home;
