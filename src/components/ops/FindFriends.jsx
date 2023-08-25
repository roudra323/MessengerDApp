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

const FriendFriends = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
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
                <HStack pt={"10px"}>
                  <Image boxSize="50px" src="avatar.png" alt="Dan Abramov" />
                  <Flex>
                    <VStack>
                      <Text>Name: Alex Smith</Text>
                      <Text>Address: afjhadhfoiaeifhadbvjadbv</Text>
                      <Button className="button" color="white">
                        Add
                      </Button>
                    </VStack>
                  </Flex>
                </HStack>
                <Divider orientation="horizontal" />
                <HStack pt={"10px"}>
                  <Image boxSize="50px" src="avatar.png" alt="Dan Abramov" />
                  <Flex>
                    <VStack>
                      <Text>Name: Alex Smith</Text>
                      <Text>Address: afjhadhfoiaeifhadbvjadbv</Text>
                      <Button className="button" color="white">
                        Add
                      </Button>
                    </VStack>
                  </Flex>
                </HStack>
                <Divider orientation="horizontal" />
                <HStack pt={"10px"}>
                  <Image boxSize="50px" src="avatar.png" alt="Dan Abramov" />
                  <Flex>
                    <VStack>
                      <Text>Name: Alex Smith</Text>
                      <Text>Address: afjhadhfoiaeifhadbvjadbv</Text>
                      <Button className="button" color="white">
                        Add
                      </Button>
                    </VStack>
                  </Flex>
                </HStack>
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
