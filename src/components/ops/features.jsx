import { Button, Text, Stack } from "@chakra-ui/react";
import React from "react";
import Profile from "../profile/Profile";
import { useNavigate } from "react-router-dom";
import Friends from "./Friends";
import FindFriends from "./FindFriends";

function Features({ state, address }) {
  const navigate = useNavigate();
  const { contract } = state;

  return (
    <Stack spacing={4} direction={["column", "row"]} align="center">
      <Profile address={address} />
      <Button className="button" onClick={() => navigate("/chat")}>
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Chat
        </Text>
      </Button>
      <Friends />
      <FindFriends />
    </Stack>
  );
}

export default Features;
