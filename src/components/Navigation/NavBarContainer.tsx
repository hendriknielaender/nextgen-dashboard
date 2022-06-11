import { Flex, useColorModeValue } from '@chakra-ui/react';

const NavBarContainer = ({ children, ...extraStyles }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={useColorModeValue('gray.100', 'dark')}
      {...extraStyles}
    >
      {children}
    </Flex>
  );
};

export default NavBarContainer;
