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
import { useAccount, useWaitForTransaction } from "wagmi";
const CreateAcc = (props) => {
  const { contract } = props.state;
  const { address, isConnected, isDisconnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tx, setTx] = React.useState("");
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: tx.hash });
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [name, setName] = useState("");

  const userRegister = async () => {
    try {
      const tx = await contract.createAcc(name);
      console.log(tx); // Pass the name to the function
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
                Created
              </Button>
            ) : (
              <Button
                className="button"
                color="white"
                onClick={userRegister}
                mr={3}
              >
                Create
              </Button>
            )}
            {/* <Button
              className="button"
              colorScheme="blue"
              mr={3}
              onClick={userRegister}
            >
              Create
            </Button> */}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateAcc;
