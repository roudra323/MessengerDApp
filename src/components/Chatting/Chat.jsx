import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Divider, Center, Text, Box, Flex } from "@chakra-ui/react";

function Chat() {
  return (
    <div className="page-container">
      <div className="content-container">
        <Flex>
          <Sidebar />
          <br />
          <Text>This is where all the chats will arrive</Text>
        </Flex>
      </div>
    </div>
  );
}

export default Chat;
