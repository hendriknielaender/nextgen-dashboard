// theme.ts

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: (props: Dict<any>) => ({
      body: {
        bg: mode('gray.100', 'dark')(props),
      },
    }),
  },
});

export default theme;
