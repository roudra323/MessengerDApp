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
  VStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import "./Profile.css";
const Profile = ({ state, address }) => {
  const { contract } = state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [friends, setFriends] = React.useState([]);
  const [name, setName] = React.useState("");

  const allFriends = async () => {
    try {
      const friendList = await contract.getAllFriends();
      setFriends(friendList);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const getName = async () => {
    try {
      const name = await contract.userList(address);
      setName(name);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  React.useEffect(() => {
    allFriends();
    getName();
  }, [contract]);
  return (
    <div>
      <Button className="button" onClick={onOpen}>
        <Text pl="10px" color="white" fontSize="xl" fontWeight="extrabold">
          Profile
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
          <ModalHeader>Profile Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center>
              <VStack>
                <Image boxSize="50px" src="avatar.png" alt="Dan Abramov" />
                <Text>{name}</Text>
                <Text>{address}</Text>
                <Text>Total Friends : {friends.length}</Text>
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

export default Profile;
