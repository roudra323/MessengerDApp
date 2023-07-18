import { Box, Button, useDisclosure, Collapse } from "@chakra-ui/react";

function ButtonCom(props) {
  const title = props.title;
  const result = props.res;
  const msg = props.msg;

  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="blackAlpha"
        onClick={() => {
          props.func();
          onToggle();
        }}
      >
        {title}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          <h3>
            {msg}
            {result}
          </h3>
        </Box>
      </Collapse>
    </>
  );
}

export default ButtonCom;
