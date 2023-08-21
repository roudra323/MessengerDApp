import { Button, Text, Stack } from "@chakra-ui/react";
import React from "react";
import Profile from "../profile/Profile";

function Features({ state, address }) {
  const { contract } = state;

  const [name, setName] = React.useState("Alex");

  const getName = async () => {
    const name = await contract.getUserName(address);
    console.log("name", "name");
    return name;
  };
  return (
    <Stack spacing={4} direction={["column", "row"]} align="center">
      <Profile address={address} />
      <Button className="button">
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Chat
        </Text>
      </Button>
      <Button className="button">
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Friends
        </Text>
      </Button>
      <Button className="button">
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Find Friends
        </Text>
      </Button>
    </Stack>
  );
}

export default Features;
