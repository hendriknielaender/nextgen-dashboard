import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Stack, useColorMode } from '@chakra-ui/react';

const ToggleLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack direction={'row'} spacing={7}>
      <Button onClick={toggleColorMode}>
        {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Stack>
  );
};

export default ToggleLayout;
