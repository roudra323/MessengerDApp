import React from "react";
import { Divider, Center, Text, Box, Flex, Spacer } from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
import { useParams } from "react-router-dom";

function Chat({ state, receiAddr }) {
  const { friendId } = useParams();
  console.log(
    "Friends address: ",
    friendId,
    "\n",
    "Receiver address: ",
    receiAddr,
    "\n"
  );
  return (
    <div className="page-container">
      <div className="content-container">
        <Flex>
          <ChatBox state={state} friendaddr={friendId} receiAddr={receiAddr} />
        </Flex>
      </div>
    </div>
  );
}

export default Chat;
