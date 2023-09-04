import { Button, Text, Stack, VStack } from "@chakra-ui/react";
import React from "react";
import Profile from "../profile/Profile";
import { useNavigate } from "react-router-dom";
import Friends from "./Friends";
import FindFriends from "./FindFriends";
import ReceivedRequ from "./ReceivedRequ";

function Features({ state, address }) {
  const navigate = useNavigate();
  const { contract } = state;

  return (
    <VStack>
      <Stack
        spacing={4}
        direction={["column", "row"]}
        align="center"
        pb={"10px"}
      >
        <Profile address={address} />
        <Button className="button" onClick={() => navigate("/chat")}>
          <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
            Chat
          </Text>
        </Button>
        <Friends />
        <FindFriends state={state} address={address} />
      </Stack>
      <ReceivedRequ state={state} address={address} />
    </VStack>
  );
}

export default Features;
