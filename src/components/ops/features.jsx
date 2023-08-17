import { Button, Text, Stack } from "@chakra-ui/react";
import React from "react";

function Features() {
  return (
    <Stack spacing={4} direction="row">
      <Button className="button">
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Profile
        </Text>
      </Button>
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
