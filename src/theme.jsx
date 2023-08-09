// In your Chakra UI theme file (e.g., theme.js)
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          bg: "#1b263b",
        },
      },
    },
  },
});

export default theme;
