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
  Spinner,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useWaitForTransaction } from "wagmi";

const ReceivedRequ = ({ state, address }) => {
  const { contract } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [requests, setRequests] = React.useState([]);
  const [tx, setTx] = React.useState("");
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: tx.hash });

  const receivedRequ = async () => {
    const requList = await contract.getAllReceivedRequest();
    console.log(requList);
    return setRequests(requList);
  };

  const accptRequ = async (friend) => {
    try {
      const tx = await contract.acceptRequest(friend);
      console.log("tx", tx);
      setTx(tx);
    } catch (err) {
      console.log("Got error in accepting request", err);
    }
  };

  React.useEffect(() => {
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
                {requests
                  .filter((friend) => friend[2] == false)
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

                            {/* <Button
                              className="button"
                              color="white"
                              onClick={() => {
                                // Show the spinner when the "Accept" button is clicked
                                accptRequ(friend[0]);
                              }}
                            >
                              Accept
                            </Button> */}

                            {isLoading ? (
                              <Button className="button" color="white">
                                <Spinner
                                  thickness="4px"
                                  speed="0.65s"
                                  emptyColor="gray.200"
                                  color="blue.500"
                                  size="xl"
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
                                  accptRequ(friend[0]);
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
