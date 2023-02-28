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
} from "@chakra-ui/react";
import useMedia from "use-media";
import Link from 'next/link';
import styled from "styled-components";

const StyledLink = styled.p`
  :hover {
    opacity:0.7;
  }
  `;


const Navigation = () => {
  const isWide = useMedia({ minWidth: "767px" });
  return (
    <>
      {isWide ? 
        <HStack p={3} spacing={6}>
          <StyledLink>
            <Link href="/">Home</Link>
          </StyledLink>
          <StyledLink>
            <Link href="/about">About</Link>
          </StyledLink>
          <StyledLink>
          <Link href="/blog/">Blog</Link>
          </StyledLink>
        </HStack>
        :
        <Stack>
          <StyledLink>
            <Link href="/">Home</Link>
          </StyledLink>
          <StyledLink>
            <Link href="/about">About</Link>
          </StyledLink>
          <StyledLink>
            <Link href="/blog/">Blog</Link>
          </StyledLink>
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
