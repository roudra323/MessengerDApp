import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useAccount } from "wagmi";

const CreateAcc = ({ state }) => {
  const { contract } = state;
  const { address, isConnected, isDisconnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [name, setName] = useState("");
  const userRegister = async () => {
    try {
      await contract.createAcc(name); // Pass the name to the function
      onClose(); // Close the modal after successful registration
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value); // Update the name state as the user types
  };
  return (
    <div>
      <Button className="button" variant="outline" onClick={onOpen}>
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Create Account
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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Account Address</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Account Address"
                value={address} // Set the predefined value here
                isDisabled // Disable the input field
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              className="button"
              colorScheme="blue"
              mr={3}
              onClick={userRegister}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateAcc;
