import * as React from 'react';
import { TodoContextType, ITodo } from '../types/types.todo';
import { TodoContext } from '../context/todoContext';
import ToDo from '../components/ToDo/ToDo';

const ToDos = () => {
  const { todos, updateTodo } = React.useContext(TodoContext) as TodoContextType;
  return (
    <>
      {todos.map((todo: ITodo) => (
        <ToDo key={todo.id} updateTodo={updateTodo} todo={todo} />
      ))}
    </>
  );
};

export default ToDos;
