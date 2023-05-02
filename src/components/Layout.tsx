import Header from './Header';
import Footer from './Footer';
import { ChakraProvider } from "@chakra-ui/react"

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

export default Layout;