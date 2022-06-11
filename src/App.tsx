import { Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './utils/trpc';
import IndexPage from './pages/index';

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
        <IndexPage />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
