'use client'

import React from "react";
import { ChakraProvider } from "@chakra-ui/react"
import Header from './components/Header';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <ChakraProvider>
        <Header/>
        {children}
      </ChakraProvider>
      </body>
    </html>
  )
}