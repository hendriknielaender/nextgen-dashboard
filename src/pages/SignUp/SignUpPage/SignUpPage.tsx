import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import 'cross-fetch';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { OAuthButtonGroup } from '../../../components/OAuthButtonGroup/OAuthButtonGroup';
import { PasswordField } from '../../../components/PasswordField/PasswordField';

const userPool = new CognitoUserPool({
  endpoint: 'http://localhost:9229/',
  UserPoolId: 'local_1NR6Eyrw',
  ClientId: 'dv80c8pqrbrxeqbcsgcwlstva',
});

export default function SingUpPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const bg = useColorModeValue('white', 'whiteAlpha.50');

  function onSubmit(values: any) {
    console.log({ values });
    const email = values.email;
    const password = values.password;
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      if (result) {
        console.log('user name is ' + result.user.getUsername());
        console.log('call result: ' + { result });
      }
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
              <Stack spacing="6">
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                  <Heading size={useBreakpointValue({ base: 'xl', md: 'md' })}>
                    Create an account
                  </Heading>
                  <HStack spacing="1" justify="center">
                    <Text color="muted">Already have an account?</Text>
                    <Button variant="link" colorScheme="blue">
                      Log in
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
              <Stack spacing="5">
                <FormControl isInvalid={!!errors.name} isRequired>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    {...register('name', {
                      required: 'required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && (
                      <span role="alert">{errors.name.message}</span>
                    )}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack spacing="5">
                <FormControl isInvalid={!!errors.email} isRequired>
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
              <Stack spacing="6">
                <Button
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                  width="full"
                >
                  Create Account
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or sign up with
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
