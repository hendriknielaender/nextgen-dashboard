import { Box, Flex } from "@chakra-ui/react";
import NavBar from '../NavBar/NavBar';

export default function Layout({ children }) {
    return (
        <>
            <Box>
                <NavBar />
                {/* <Center  bg={useColorModeValue('gray.50', 'gray.800')}> */}
                <Flex w='100%' p={4}>
                  {children}
                </Flex>
            </Box>
        </>
    )
}
