import * as React from 'react';
import { TodoContextType, ITodo } from '../types/types.todo';
import { TodoContext } from '../context/todoContext';
import {trpc} from '../utils/trpc';


export const getTodos = () => {
  let { todos, updateTodo } = React.useContext(TodoContext) as TodoContextType;

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
    if (!queryAllTodos.data) {
      console.log("Loading...");
    };
    
   return queryAllTodos.data?.pages[0].items as any
};

