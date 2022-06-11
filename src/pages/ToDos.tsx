import * as React from 'react';
import { TodoContextType, ITodo } from '../types/types.todo';
import { TodoContext } from '../context/todoContext';
import ToDo from '../components/ToDo/ToDo';
import {trpc} from '../utils/trpc';

const ToDos = () => {
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
      return <>"Loading..."</>;
    };
    
  todos = queryAllTodos.data?.pages[0].items as any
  return (
    <>
      {todos.map((todo: ITodo) => (
        <ToDo key={todo.id} updateTodo={updateTodo} todo={todo} />
      ))}
    </>
  );
};

export default ToDos;
