import { useForm } from 'react-hook-form'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack
  } from "@chakra-ui/react";
  
  export default function LoginPage() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit(values: any) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            resolve()
          }, 3000)
        })
      }

    return (
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md" w={64}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4} align="flex-start">
                <FormControl>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                        id="email"
                        placeholder='your@email.com'
                        {...register("email", {
                            required: "required",
                            pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Entered value does not match email format"
                            }
                        })}
                        type="email" 
                     />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id='password'
                        placeholder='password'
                        {...register('password', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Minimum password length should be 4' },
                        })}
                        type="password"
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>
                  <Button mt={4} isLoading={isSubmitting} type="submit" width="full">
                    Login
                  </Button>
                </VStack>
            </form> 
        </Box>
      </Flex>
    );
  }