import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginPage from './pages/Login/LoginPage/LoginPage';
import { trpc } from './utils/trpc';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:3001/trpc',
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <LoginPage />
      </Flex>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App
