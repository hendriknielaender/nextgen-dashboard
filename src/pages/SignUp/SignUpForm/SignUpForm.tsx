import { FormProvider, useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Divider,
  HStack,
  Stack,
  Text,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import { OAuthButtonGroup } from '../../../components/OAuthButtonGroup/OAuthButtonGroup';
import PasswordField from '../../../components/PasswordField/PasswordField';
import 'cross-fetch';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Credentials, useAuth } from '../../../hooks/useAuth';
import { useState } from 'react';

type CredentialsKeys = keyof Credentials;

export default function SignUpForm() {
  const methods = useForm();
  const auth = useAuth();

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  async function onSubmit(credentials: any) {
    console.log({ credentials });
    const key = credentials.email as CredentialsKeys;
    setCredentials({
      ...credentials,
      [key]: credentials,
    });

    const User = await auth.signUp({ ...credentials });
    console.info(User);
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            <FormControl isInvalid={!!methods.formState.errors.name} isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                {...methods.register('name', {
                  required: 'required',
                })}
              />
              <FormErrorMessage>
                {methods.formState.errors.name && (
                  <span role="alert">
                    {methods.formState.errors.name.message}
                  </span>
                )}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack spacing="5">
            <FormControl
              isInvalid={!!methods.formState.errors.email}
              isRequired
            >
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                {...methods.register('email', {
                  required: 'required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
                type="email"
              />
              <FormErrorMessage>
                {methods.formState.errors.email && (
                  <span role="alert">
                    {methods.formState.errors.email.message}
                  </span>
                )}
              </FormErrorMessage>
            </FormControl>
            <PasswordField />
          </Stack>
          <Stack spacing="6">
            <Button
              colorScheme="blue"
              isLoading={methods.formState.isSubmitting}
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
    </FormProvider>
  );
}
