import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  IconButton,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import "./Chat.css";

const Message = ({ text, sender }) => {
  return (
    <Flex justify={sender === "user" ? "flex-end" : "flex-start"} my="2">
      <Box
        maxW="80%" // Adjust the maximum width for message
        bg={sender === "user" ? "teal.500" : "gray.200"}
        color={sender === "user" ? "white" : "black"}
        borderRadius="lg"
        borderBottomColor="whitesmoke"
        p="3"
      >
        {text}
      </Box>
    </Flex>
  );
};

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages([...messages, { text: newMessage, sender: "user" }]);
    setNewMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Box w="80%" bg="#1b263b" color="white">
      <Box overflowY="auto" height="70vh" pr="50px">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
      </Box>

      <Divider my="2" />
      <Flex p="2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Add the onKeyDown event listener
          placeholder="Type a message..."
        />
        <IconButton
          icon={<ArrowForwardIcon />}
          colorScheme="teal"
          ml="2"
          onClick={sendMessage}
        />
      </Flex>
    </Box>
  );
};

export default ChatBox;
