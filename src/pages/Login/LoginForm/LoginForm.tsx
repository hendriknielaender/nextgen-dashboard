import { FormProvider, useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Checkbox,
  Divider,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { OAuthButtonGroup } from '../../../components/OAuthButtonGroup/OAuthButtonGroup';
import PasswordField from '../../../components/PasswordField/PasswordField';
import { Credentials, useAuth } from '../../../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CredentialsKeys = keyof Credentials;

export default function LoginForm() {
  const methods = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

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

    await auth
      .logIn(credentials)
      .then((user) => {
        console.log(`successfully logged in ${JSON.stringify(user, null, 4)}`);
        navigate(`/private`);
      })
      .catch((err) => {
        console.error({
          message: 'Error',
          description: err.message,
        });

        console.log(err);
      });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isInvalid={!!methods.formState.errors.email}>
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
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="blue" size="sm">
              Forgot password?
            </Button>
          </HStack>
          <Stack spacing="6">
            <Button
              colorScheme="blue"
              isLoading={methods.formState.isSubmitting}
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
    </FormProvider>
  );
}
