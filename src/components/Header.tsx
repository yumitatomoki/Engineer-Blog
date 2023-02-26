import React, { FC } from "react"
import { HamburgerIcon } from "@chakra-ui/icons"
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
  Link,
  LinkProps,
  Stack,
  useDisclosure,
  Container
} from "@chakra-ui/react"
import useMedia from "use-media";

const HoverLink = (props: LinkProps) => <Link rounded="base" _hover={{bg:"gray.200"}} p={2} {...props } />

const Navigation = () => {
  const isWide = useMedia({ minWidth: "767px" });
  return (
    <>
      {isWide ? 
      <HStack as="nav">
        <HoverLink>About</HoverLink>
        <HoverLink>Works</HoverLink>
        <HoverLink>Blog</HoverLink>
        <HoverLink>Contact</HoverLink>
      </HStack>
      : 
      <Stack as="nav">
        <HoverLink>About</HoverLink>
        <HoverLink>Works</HoverLink>
        <HoverLink>Blog</HoverLink>
        <HoverLink>Contact</HoverLink>
      </Stack>
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
          <Heading>Tomoki Yumita</Heading>
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