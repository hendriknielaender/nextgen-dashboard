import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  useColorMode,
  useColorModeValue,
  Flex,
  Spacer,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToDoTable } from '../components/Table/Table';
import { trpc } from '../utils/trpc';

export function Todos() {
  const queryAllTodos = trpc.useInfiniteQuery(
    [
      'infiniteTodos',
      {
        limit: 10,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  if (!queryAllTodos.data) return <div>Loading...</div>;
  return (
    <div>
      <ToDoTable data={queryAllTodos.data} />
    </div>
  );
}

export default function IndexPage() {
  const [queryClient] = useState(() => new QueryClient());
  // hook which help us to toggle the color modes
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'dark');

  return (
        <Flex align="center" justify="center" bg={bg}>
          <Todos />
        </Flex>
  );
}
