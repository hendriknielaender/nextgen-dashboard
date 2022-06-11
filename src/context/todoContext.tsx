import * as React from 'react';
import { TodoContextType, ITodo } from '../types/types.todo';
import { trpc } from '../utils/trpc';

export const TodoContext = React.createContext<TodoContextType | null>(null);
export const useTodos = () => React.useContext(TodoContext);

const TodoProvider: React.FC<any> = ({ children }) => {
  //TODO fix any use ITodo or even better use the generated prisma types here.
  const [todos, setTodos] = React.useState<any[]>([]);

  const saveTodo = (todo: ITodo) => {
    const newTodo: ITodo = {
      id: Math.random(), // not really unique - but fine for this example
      title: todo.title,
      description: todo.description,
      status: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number) => {
    todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.status = true;
        setTodos([...todos]);
      }
    });
  };

  return (
    <TodoContext.Provider value={{ todos, saveTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
