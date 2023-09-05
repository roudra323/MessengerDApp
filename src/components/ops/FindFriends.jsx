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

const FriendFriends = ({ state, address }) => {
  const { contract } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [friends, setFriends] = React.useState([]);

  const findFriends = async () => {
    const friends = await contract.getAllUser();
    console.log(friends);
    setFriends(friends);
  };

  const sendRequest = async (friend) => {
    await contract.sendRequest(friend);
    console.log(friend);
  };

  const alreadyFriends = async (owner, addr) => {
    const isAcc = await contract.checkAlreadyFriends(owner, addr);
    return isAcc;
  };

  React.useEffect(() => {
    findFriends();
  }, [contract]); // Call findFriends when the component mounts

  return (
    <div>
      <Button className="button" onClick={onOpen}>
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Find Friends
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
          <ModalHeader>Add Friends</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center>
              <VStack>
                {friends
                  .filter((friend) => {
                    alreadyFriends(address, friend[0]) == true &&
                      friend[3] == false;
                  })
                  .filter((friend) => friend[1] != address)
                  .map((friend, index) => (
                    <React.Fragment key={index}>
                      <HStack key={index} pt={"10px"}>
                        <Image
                          boxSize="50px"
                          src="avatar.png"
                          alt={friend[0]}
                        />
                        <Flex>
                          <VStack>
                            <Text>{friend[0]}</Text>
                            <Text>{friend[1]}</Text>
                            <Button
                              className="button"
                              color="white"
                              onClick={() => sendRequest(friend[1])}
                            >
                              Add
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

export default FriendFriends;
