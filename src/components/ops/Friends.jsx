import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Image,
  Box,
  Center,
  HStack,
  VStack,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Friends = ({ state }) => {
  const navigate = useNavigate();
  const { contract } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [friends, setFriends] = React.useState([]);

  const allFriends = async () => {
    try {
      const friendList = await contract.getAllFriends();
      setFriends(friendList);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const handleChatClick = (friendId) => {
    // Redirect to the chat page with the friend's identifier
    navigate(`/chat/${friendId}`);
  };

  React.useEffect(() => {
    allFriends();
  }, [contract]);

  return (
    <div>
      <Button className="button" onClick={onOpen}>
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Friends
        </Text>
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent color="white" bg="gray.800">
          <ModalHeader>Friends Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center>
              <VStack>
                {friends.map((friend, index) => (
                  <React.Fragment key={index}>
                    <HStack key={index} pt={"10px"}>
                      <Image boxSize="50px" src="avatar.png" alt={friend[0]} />
                      <Flex>
                        <VStack>
                          <Text>{friend[1]}</Text>
                          <Text>{friend[0]}</Text>
                          <Button
                            className="button"
                            color="white"
                            onClick={() => handleChatClick(friend[0])}
                          >
                            Chat
                          </Button>
                        </VStack>
                      </Flex>
                    </HStack>
                    <Divider orientation="horizontal" />
                  </React.Fragment>
                ))}
              </VStack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Friends;
