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
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { trpc } from './utils/trpc';
import IndexPage from './pages/index';

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
        <Flex align="center" justify="center" bg={bg}>
          <IndexPage />
        </Flex>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
