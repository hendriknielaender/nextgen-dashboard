import * as React from 'react';
import TodoProvider from '../context/todoContext'
import ToDos from '../pages/ToDos'
import AddTodo from '../components/ToDo/AddToDo'

export default function IndexPage() {
  return (
        <>
          <TodoProvider>  
            <h1>My Todos</h1>
            <AddTodo />
            <ToDos />
          </TodoProvider>
        </>
  );
}
