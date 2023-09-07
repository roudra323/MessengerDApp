import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Flex,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer";

const Logo = () => {
  return (
    <Flex>
      <img
        src="logo-bg-rmv.png"
        alt="logo"
        width="100px"
        height="100px"
      />
      <Text fontSize="4xl" pt="20px">
        ChainChat
      </Text>
    </Flex>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg="#1b263b"
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallCentered() {
  return (
    <Box bg="#0d1b2a" color="white">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
        pt="30px"
      >
        <Logo />
        <Stack direction={"row"} spacing={6}>
          <Box as="a" href={"#"}>
            Home
          </Box>
          <Box as="a" href={"#"}>
            About
          </Box>
          <Box as="a" href={"#"}>
            Blog
          </Box>
          <Box as="a" href={"#"}>
            Contact
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        zIndex={500}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2023 ChainChat. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
