import {
  Box,
  Flex,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginPage from './pages/Login/LoginPage/LoginPage';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { trpc } from './utils/trpc';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:3001/trpc',
    }),
  );
  // hook which help us to toggle the color modes
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'dark');

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Flex bg={bg}>
          <Spacer />
          <Box>
            <IconButton
              m={4}
              aria-label="Toggle Mode"
              onClick={toggleColorMode}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </Box>
        </Flex>
        <Flex align="center" justify="center" bg={bg}>
          <LoginPage />
        </Flex>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
