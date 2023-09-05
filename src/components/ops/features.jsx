import { Button, Text, Stack, VStack, HStack } from "@chakra-ui/react";
import React from "react";
import Profile from "../profile/Profile";
import { useNavigate } from "react-router-dom";
import Friends from "./Friends";
import FindFriends from "./FindFriends";
import ReceivedRequ from "./ReceivedRequ";
import SentRequest from "./sentRequest";

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
        <Profile state={state} address={address} />
        <Button className="button" onClick={() => navigate("/chat")}>
          <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
            Chat
          </Text>
        </Button>
        <Friends state={state} />
        <FindFriends state={state} address={address} />
      </Stack>
      <Stack direction={["column", "row"]}>
        <ReceivedRequ state={state} address={address} />
        <SentRequest state={state} address={address} />
      </Stack>
    </VStack>
  );
}

export default Features;
