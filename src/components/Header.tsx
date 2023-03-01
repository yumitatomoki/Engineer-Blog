import React, { FC } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Stack,
  useDisclosure,
  Container,
  ListItem,
  UnorderedList
} from "@chakra-ui/react";
import useMedia from "use-media";
import Link from 'next/link';

const Navigation = () => {
  const isWide = useMedia({ minWidth: "767px" });
  return (
    <>
      {isWide ? 
        <UnorderedList listStyleType="none" m={0}>
          <HStack p={3} spacing={6}>
            <ListItem _hover={{ opacity: 0.7 }}>
              <Link href="/">Home</Link>
            </ListItem>
            <ListItem _hover={{ opacity: 0.7 }}>
              <Link href="/about">About</Link>
            </ListItem>
            <ListItem _hover={{ opacity: 0.7 }}>
              <Link href="/blog/">Blog</Link>
            </ListItem>
          </HStack>
        </UnorderedList>
        :
        <UnorderedList listStyleType="none" m={0}>
          <Stack>
            <ListItem _hover={{ opacity: 0.7 }}>
              <Link href="/">Home</Link>
            </ListItem>
            <ListItem _hover={{ opacity: 0.7 }}>
              <Link href="/about">About</Link>
            </ListItem>
            <ListItem _hover={{ opacity: 0.7 }}>
              <Link href="/blog/">Blog</Link>
            </ListItem>
          </Stack>
        </UnorderedList>
      }
    </>
  )
}

const DrawerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              Menu
            </DrawerHeader>
            <DrawerBody>
              <Navigation />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

type Props = {
  children?: React.ReactNode;
};

const Header : FC<Props> = ({ children }) => {
  return (
    <Container maxW="1200px">
      <Stack>
        <HStack p={5} alignItems="start" justifyContent="space-between" >
          <Heading>
            <Link href="/">Tomoki Yumita</Link>
          </Heading>
          <HStack alignItems="start" >
            <Box display={{ base: "none", md: "block" }} >
              <Navigation />
            </Box>
            <Box>{children}</Box>
          </HStack>
          <Box display={{ base: "block", md: "none", }}>
            <DrawerMenu />
          </Box>
        </HStack>
      </Stack>
    </Container>
  )
}

export default Header
