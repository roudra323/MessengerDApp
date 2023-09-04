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

const SentRequest = ({ state, address }) => {
  const { contract } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [requests, setRequests] = React.useState([]);

  const sentRequest = async () => {
    const requList = await contract.getAllSentRequest();
    return setRequests(requList);
  };

  React.useEffect(() => {
    sentRequest();
  }, [contract, address]);

  return (
    <div>
      <Button className="button" onClick={onOpen}>
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Sent Requests
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
          <ModalHeader>Sent Requests</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center>
              <VStack>
                {requests
                  .filter((friend) => friend[3] == true)
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
                            <Text>{friend[1]}</Text>
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

export default SentRequest;
