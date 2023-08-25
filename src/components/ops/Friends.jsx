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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const Friends = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
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
              <HStack>
                <Image boxSize="50px" src="avatar.png" alt="Dan Abramov" />
                <Flex>
                  <VStack>
                    <Text>Name: Alex Smith</Text>
                    <Text>Address: afjhadhfoiaeifhadbvjadbv</Text>
                  </VStack>
                </Flex>
              </HStack>
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
