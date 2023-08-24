import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import "./Sidebar.css";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  return (
    <>
      <Button
        leftIcon={<EmailIcon />}
        colorScheme="blackAlpha"
        onClick={onOpen}
        size="md"
        marginRight={5}
      >
        ChatList
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent
          bg="#0d1b2a" // Set the background color of the drawer
          color="white" // Set the text color
        >
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">ChatList</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">{/* ... (existing code) ... */}</Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {/* ... (existing code) ... */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
