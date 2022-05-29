import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { OAuthButtonGroup } from './OAuthButtonGroup';
import { PasswordField } from './PasswordField';

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const bg = useColorModeValue('white', 'whiteAlpha.50');

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    id="email"
                    {...register('email', {
                      required: 'required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Entered value does not match email format',
                      },
                    })}
                    type="email"
                  />
                  <FormErrorMessage>
                    {errors.email && (
                      <span role="alert">{errors.email.message}</span>
                    )}
                  </FormErrorMessage>
                </FormControl>
                <PasswordField />
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                  width="full"
                >
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
