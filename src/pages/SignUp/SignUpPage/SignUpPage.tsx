import { Box, Container, Stack, useColorModeValue } from '@chakra-ui/react';
import SignUpForm from '../SignUpForm/SignUpForm';

export default function SingUpPage() {
  const bg = useColorModeValue('white', 'whiteAlpha.50');

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={bg}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <SignUpForm />
        </Box>
      </Stack>
    </Container>
  );
}
