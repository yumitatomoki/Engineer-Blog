import { ChakraProvider } from '@chakra-ui/react'
import Footer from './Footer'
import Header from './Header'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ChakraProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </ChakraProvider>
    </>
  )
}

export default Layout
