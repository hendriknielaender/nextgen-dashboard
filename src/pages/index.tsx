import * as React from 'react';
import TodoProvider from '../context/todoContext';
import { createTable, PaginationState } from '@tanstack/react-table';
import { TodoContextType, ITodo } from '../types/types.todo';
import { TodoContext } from '../context/todoContext';
import { trpc } from '../utils/trpc';
import { ToDoTable } from '../components/ToDo/Table/Table';

const table = createTable().setRowType<ITodo>();
//@ts-ignore
function PaginatedTable(attr: any) {
  const { todos } = attr;

  console.log({ attr });

  const columns = React.useMemo(
    () => [
      table.createGroup({
        header: 'ToDo',
        footer: (props) => props.column.id,
        columns: [
          table.createDataColumn('id', {
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          }),
          table.createDataColumn('title', {
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          }),
          table.createDataColumn('status', {
            header: 'Completed',
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
    [],
  );

  const [data, setData] = React.useState(() => attr.todos.pages[0].items);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  return (
    <>
      <ToDoTable
        {...{
          data,
          columns,
          pagination,
          setPagination,
        }}
      />
    </>
  );
}

export default function IndexPage() {
  const queryAllTodos = trpc.useInfiniteQuery(
    [
      'infiniteTodos',
      {
        limit: 100,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  if (!queryAllTodos.data) {
    return <>"Loading..."</>;
  }

  const todosQuery = queryAllTodos.data;

  return (
    <TodoProvider>
      <PaginatedTable todos={todosQuery} />
    </TodoProvider>
  );
}
