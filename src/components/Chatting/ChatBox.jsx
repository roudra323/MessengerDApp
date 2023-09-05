import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  IconButton,
  Divider,
  VStack,
  Center,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import "./Chat.css";
import { useAccount } from "wagmi";

const Message = ({ text, sender }) => {
  const { address, isConnected, isDisconnected } = useAccount();
  return (
    <Flex justify={sender == address ? "flex-end" : "flex-start"} my="2">
      <Box
        maxW="80%" // Adjust the maximum width for message
        bg={sender == address ? "teal.500" : "gray.200"}
        color={sender == address ? "white" : "black"}
        borderRadius="lg"
        borderBottomColor="whitesmoke"
        p="3"
      >
        {text}
      </Box>
    </Flex>
  );
};

const ChatBox = ({ state, receiAddr, friendId }) => {
  const { isConnected, isDisconnected } = useAccount();
  const { contract } = state;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef(null); // Create a ref for the chat box container

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    await contract.sendMessage(
      "0xCCa8F0cD5b870DD7De3942F06B4b72c71504cfBC",
      newMessage
    );
    // setMessages([...messages, { text: newMessage, sender: "user" }]); // here implement the logic to send message to the node
    setNewMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const readMSG = async () => {
    const allMsg = await contract.readMessage(friendId);
    setMessages(allMsg);
    console.log(allMsg);
  };

  useEffect(() => {
    readMSG();
  }, [
    messages,
    contract,
    newMessage,
    receiAddr,
    friendId,
    isConnected,
    isDisconnected,
  ]);

  // Scroll to the bottom when messages are updated
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box w="100%" bg="#1b263b" color="white">
      <Box
        ref={chatBoxRef} // Assign the ref to the chat box container
        overflowY="auto"
        height="70vh"
        pr="50px"
      >
        {messages.map((message, index) => (
          <Message key={index} text={message.msge} sender={message.sender} />
        ))}
      </Box>

      <Divider my="2" />
      <Flex p="2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
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
