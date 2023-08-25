import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Divider, Center, Text, Box, Flex, Spacer } from "@chakra-ui/react";
import ChatBox from "./ChatBox";

function Chat() {
  return (
    <div className="page-container">
      <div className="content-container">
        <Flex>
          <Sidebar />

          <ChatBox />
        </Flex>
      </div>
    </div>
  );
}

export default Chat;
