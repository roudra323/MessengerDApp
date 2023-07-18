import { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import ButtonCom from "./ButtonCom";

const Read = ({ state }) => {
  const { contract } = state;
  const [balance, setBalance] = useState(0);
  const [owner, setOwner] = useState("");
  const [msg, setMsg] = useState("");

  const getBalance = async () => {
    const ContractBalance = await contract.contractBalance();
    console.log("Contract balance", ContractBalance);
    setBalance(ContractBalance);
  };
  const getOwner = async () => {
    const owner = await contract.owner();
    console.log("Owner", owner);
    setOwner(owner);
  };

  const viewMsg = async () => {
    const msg = await contract.viewMessage();
    console.log("Msg", msg);
    setMsg(msg);
  };

  useEffect(() => {
    getBalance();
  }, [contract]);

  return (
    <Box>
      <Text fontSize="4xl">Read</Text>

      <hr />
      <VStack pt="20px">
        <ButtonCom
          title="Owner"
          msg="The owner is: "
          func={getOwner}
          res={owner}
        />
        <ButtonCom
          title="View Message"
          msg="The msg is: "
          func={viewMsg}
          res={msg}
        />
      </VStack>
    </Box>
  );
};

export default Read;
