import { Box, Flex, IconButton, Spacer, useColorMode } from '@chakra-ui/react';
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
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Flex bg="gray.100">
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
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
          <LoginPage />
        </Flex>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
