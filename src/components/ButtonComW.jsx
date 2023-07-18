import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function ButtonComW(props) {
  const title = props.title;
  const result = props.res;
  const msg = props.msg;
  const isLoading = props.isLoading;
  const isSuccess = props.isSuccess;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleButtonClick = async () => {
    await props.func();
    onOpen();
  };

  return (
    <>
      <Button colorScheme="blackAlpha" onClick={handleButtonClick}>
        {title}
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="center" align="center" direction="column" h="100%">
              {isLoading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : isSuccess ? (
                <>
                  <Text fontWeight="bold">{msg}</Text>
                  <Text>{result}</Text>
                </>
              ) : (
                <Text>An error occurred.</Text>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ButtonComW;
