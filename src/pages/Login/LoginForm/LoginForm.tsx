import { useForm } from 'react-hook-form';
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
import { signInUser } from '../../../utils/aws-cognito/authentication';

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values: any) {
    console.log({ values });
    await signInUser(values);
  }

  return (
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
              {errors.email && <span role="alert">{errors.email.message}</span>}
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
  );
}
