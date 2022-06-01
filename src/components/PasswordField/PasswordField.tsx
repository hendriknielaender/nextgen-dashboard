import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>(
  (props) => {
    const { register } = useFormContext();

    const { isOpen, onToggle } = useDisclosure();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    return (
      <FormControl isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="link"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
            {...props}
            {...register('password')}
          />
        </InputGroup>
      </FormControl>
    );
  },
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
