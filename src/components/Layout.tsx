import Header from './Header';
import Footer from './Footer';
import { ChakraProvider } from "@chakra-ui/react"

const Layout = ({ children }) => {
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

export default Layout;