import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return React.createElement(
    Box,
    { minH: "100vh", bg: useColorModeValue("gray.100", "gray.900") },
    React.createElement(SidebarContent, {
      onClose: () => onClose,
      display: { base: "none", md: "block" },
    }),
    React.createElement(
      Drawer,
      {
        isOpen: isOpen,
        placement: "left",
        onClose: onClose,
        returnFocusOnClose: false,
        onOverlayClick: onClose,
        size: "full",
      },
      React.createElement(
        DrawerContent,
        {},
        React.createElement(SidebarContent, { onClose: onClose })
      )
    ),
    React.createElement(MobileNav, {
      display: { base: "flex", md: "none" },
      onOpen: onOpen,
    }),
    React.createElement(
      Box,
      { ml: { base: 0, md: 60 }, p: "4" }
      // Content
    )
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return React.createElement(
    Box,
    {
      bg: useColorModeValue("white", "gray.900"),
      borderRight: "1px",
      borderRightColor: useColorModeValue("gray.200", "gray.700"),
      w: { base: "full", md: 60 },
      pos: "fixed",
      h: "full",
      ...rest,
    },
    React.createElement(
      Flex,
      {
        h: "20",
        alignItems: "center",
        mx: "8",
        justifyContent: "space-between",
      },
      React.createElement(
        Text,
        { fontSize: "2xl", fontFamily: "monospace", fontWeight: "bold" },
        "Logo"
      ),
      React.createElement(CloseButton, {
        display: { base: "flex", md: "none" },
        onClick: onClose,
      })
    ),
    LinkItems.map((link) =>
      React.createElement(
        NavItem,
        { key: link.name, icon: link.icon },
        link.name
      )
    )
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return React.createElement(
    Box,
    {
      as: "a",
      href: "#",
      style: { textDecoration: "none" },
      _focus: { boxShadow: "none" },
    },
    React.createElement(
      Flex,
      {
        align: "center",
        p: "4",
        mx: "4",
        borderRadius: "lg",
        role: "group",
        cursor: "pointer",
        _hover: {
          bg: "cyan.400",
          color: "white",
        },
        ...rest,
      },
      icon &&
        React.createElement(Icon, {
          mr: "4",
          fontSize: "16",
          _groupHover: { color: "white" },
          as: icon,
        }),
      children
    )
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return React.createElement(
    Flex,
    {
      ml: { base: 0, md: 60 },
      px: { base: 4, md: 24 },
      height: "20",
      alignItems: "center",
      bg: useColorModeValue("white", "gray.900"),
      borderBottomWidth: "1px",
      borderBottomColor: useColorModeValue("gray.200", "gray.700"),
      justifyContent: "flex-start",
      ...rest,
    },
    React.createElement(IconButton, {
      variant: "outline",
      onClick: onOpen,
      "aria-label": "open menu",
      icon: React.createElement(FiMenu, null),
    }),
    React.createElement(
      Text,
      { fontSize: "2xl", ml: "8", fontFamily: "monospace", fontWeight: "bold" },
      "Logo"
    )
  );
};
