import React, { useEffect, useState } from "react";
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
import { useWaitForTransaction } from "wagmi";

const FriendFriends = ({ state, address }) => {
  const { contract } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [friends, setFriends] = React.useState([]);
  const [tx, setTx] = React.useState("");
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: tx.hash });

  const alreadyFriends = async (owner, addr) => {
    const alreadyFriends = await contract.checkAlreadyFriends(owner, addr);
    return alreadyFriends;
  };

  const filterFriends = async (friendsList) => {
    const filteredFriends = [];
    for (const friend of friendsList) {
      const isAlreadyFriend = await alreadyFriends(address, friend[1]);
      if (!isAlreadyFriend && friend[1] !== address) {
        filteredFriends.push(friend);
      }
    }
    return filteredFriends;
  };

  const findFriends = async () => {
    const friendsList = await contract.getAllUser();
    console.log(friendsList);
    const filteredFriends = await filterFriends(friendsList);
    console.log("Filtered Friends:", filteredFriends);
    setFriends(filteredFriends);
  };

  const sendRequest = async (friend) => {
    const tx = await contract.sendRequest(friend);
    console.log(friend);
    setTx(tx);
  };

  useEffect(() => {
    findFriends();
  }, [contract, address]);

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
                {friends.map((friend, index) => (
                  <React.Fragment key={index}>
                    <HStack key={index} pt={"10px"}>
                      <Image boxSize="50px" src="avatar.png" alt={friend[0]} />
                      <Flex>
                        <VStack>
                          <Text>{friend[0]}</Text>
                          <Text>{friend[1]}</Text>
                          {isLoading ? (
                            <Button className="button" color="white">
                              <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="sm"
                              />
                            </Button>
                          ) : isSuccess ? (
                            <Button className="button" color="white">
                              Sent Request
                            </Button>
                          ) : (
                            <Button
                              className="button"
                              color="white"
                              onClick={() => sendRequest(friend[1])}
                            >
                              Add
                            </Button>
                          )}
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
