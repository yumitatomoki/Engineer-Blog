import { ChakraProvider } from "@chakra-ui/react"
import Header  from '@/components/Header'

export default function Home() {
  return (
    <>
      <ChakraProvider>
        <Header/>
      </ChakraProvider>
    </>
  )
}
