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
  Spinner,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useWaitForTransaction } from "wagmi";

const ReceivedRequ = ({ state, address }) => {
  const { contract } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [requests, setRequests] = useState([]);
  const [tx, setTx] = useState("");
  const [ac, setAc] = useState(false);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: tx.hash });

  const receivedRequ = async () => {
    const requList = await contract.getAllReceivedRequest();
    console.log(requList);

    const filteredRequests = await Promise.all(
      requList.map(async (friend) => {
        const isAccepted = await isAc(friend[0]);
        return { friend, isAccepted };
      })
    );

    const unacceptedRequests = filteredRequests.filter(
      (friend) => !friend.isAccepted
    );

    setRequests(unacceptedRequests);
  };

  const isAc = async (addr) => {
    const isAcc = await contract.checkIfAccepted(addr);
    console.log("Is accepted request? =", addr, isAcc);
    setAc(isAcc);
    return isAcc;
  };

  const accptRequ = async (friend) => {
    try {
      const tx = await contract.acceptRequest(friend.friend[0]);
      console.log("tx", tx);
      setTx(tx);
    } catch (err) {
      console.log("Got an error while accepting the request", err);
    }
  };

  useEffect(() => {
    receivedRequ();
  }, [contract, address, isLoading, isSuccess]);

  return (
    <div>
      <Button className="button" onClick={onOpen}>
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Received Requests
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
          <ModalHeader>Requests</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center>
              <VStack>
                {requests.map((friend, index) => (
                  <React.Fragment key={index}>
                    <HStack key={index} pt={"10px"}>
                      <Image
                        boxSize="50px"
                        src="avatar.png"
                        alt={friend.friend[0]}
                      />
                      <Flex>
                        <VStack>
                          <Text>{friend.friend[0]}</Text>

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
                              Accepted
                            </Button>
                          ) : (
                            <Button
                              className="button"
                              color="white"
                              onClick={() => {
                                accptRequ(friend);
                              }}
                            >
                              Accept
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

export default ReceivedRequ;
