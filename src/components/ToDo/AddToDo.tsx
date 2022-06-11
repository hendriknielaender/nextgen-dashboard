import * as React from 'react';
import { TodoContext } from '../../context/todoContext';
import { TodoContextType, ITodo } from '../../types/types.todo';

const AddTodo: React.FC = () => {
  const { saveTodo } = React.useContext(TodoContext) as TodoContextType;
  const [formData, setFormData] = React.useState<ITodo | {}>();
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  const handleSaveTodo = (e: React.FormEvent, formData: ITodo | any) => {
    e.preventDefault();
    saveTodo(formData);
  };
  return (
    <form className="Form" onSubmit={(e) => handleSaveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor="name">Title</label>
          <input onChange={handleForm} type="text" id="title" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input onChange={handleForm} type="text" id="description" />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
};
export default AddTodo;
