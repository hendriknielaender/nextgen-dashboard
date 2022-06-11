import {
  useColorMode,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from '../utils/trpc';

import TodoProvider from '../context/todoContext'
import ToDos from '../pages/ToDos'
import AddTodo from '../components/ToDo/AddToDo'

export default function IndexPage() {
  const [queryClient] = useState(() => new QueryClient());
  // hook which help us to toggle the color modes
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'dark');

  return (
        <Flex align="center" justify="center" bg={bg}>
          <TodoProvider>  
            <h1>My Todos</h1>
            <AddTodo />
            <ToDos />
          </TodoProvider>
        </Flex>
  );
}
