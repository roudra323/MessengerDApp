import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ButtonComW from "./ButtonComW";
import { useWaitForTransaction } from "wagmi";

const Write = ({ state }) => {
  const { contract } = state;
  const { signer } = state;

  const [tx, setTx] = useState("");
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: tx.hash });

  // contract.on("sentToContract", (from, to, amount) => {
  //   console.log(from, to, amount.toString());
  // });
  // contract.removeAllListeners("sentToContract");

  // console.log("listeners", contract.listeners("sentToContract"));

  // contract.off("sentToContract", callback);

  // Send ether to the contract
  const sendEther = async () => {
    try {
      const tx = await signer.sendTransaction({
        to: "0xE2EdF80596F08ffD6d69415781B391a2C0333dA3",
        value: ethers.parseUnits("0.00001", "ether"),
      });

      console.log("Transaction mined =", tx);
      setTx(tx);
    } catch (error) {
      console.error("Error sending ether:", error);
    }
  };

  // Set message
  const setMsg = async () => {
    try {
      const currentTime = new Date().toLocaleTimeString();
      const tx = await contract.setMessage(currentTime);

      console.log("Transaction mined =", tx);
      setTx(tx);
    } catch (error) {
      console.error("Error sending ether to owner:", error);
    }
  };

  // Send ether to owner
  const sendEtherTo = async () => {
    try {
      const tx = await contract.sendContractBal(
        "0xCb62E7568819fd5C67A4A44cC485388a2969E42C",
        ethers.parseUnits("0.00001", "ether")
      );

      console.log("Transaction mined =", tx);
      setTx(tx);
    } catch (error) {
      console.error("Error sending ether to owner:", error);
    }
  };

  useEffect(() => {
    console.log(isLoading, isSuccess);
  }, [isLoading, isSuccess]);

  return (
    <Box>
      <Text fontSize="4xl">Write</Text>
      <hr />
      <VStack pt="20px">
        <ButtonComW
          title="Send 0.00001 Ether"
          msg="Successful transaction"
          func={sendEther}
          res={tx.hash}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        <ButtonComW
          title="Set Message"
          msg="Successful set msg"
          func={setMsg}
          res={tx.hash} // Update this to tx.hash
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        {/* <Button onClick={setMsg}>Test</Button> */}
        <ButtonComW
          title="Send ether to owner"
          msg="Successfully Sent"
          func={sendEtherTo}
          res={tx.hash}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </VStack>
    </Box>
  );
};

export default Write;
