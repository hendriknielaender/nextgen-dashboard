import * as React from 'react';
import TodoProvider from '../context/todoContext'
import {
  createTable,
  PaginationState,
} from '@tanstack/react-table'
import { TodoContextType, ITodo } from '../types/types.todo';
import { TodoContext } from '../context/todoContext';
import {trpc} from '../utils/trpc';
import { ToDoTable } from '../components/ToDo/Table/Table';

let table = createTable().setRowType<ITodo>()
//@ts-ignore
function PaginatedTable(attr: any) {
  const { todos } = attr;
  console.log({todos});


  const columns = React.useMemo(
    () => [
      table.createGroup({
        header: 'ToDo',
        footer: props => props.column.id,
        columns: [
          table.createDataColumn('title', {
            cell: info => info.getValue(),
            footer: props => props.column.id,
          }),
          table.createDataColumn('description', {
            id: 'description',
            cell: info => info.getValue(),
            header: () => <span>Description</span>,
            footer: props => props.column.id,
          }),
        ],
      }),
    ],
    []
  )

  const [data, setData] = React.useState(() => (todos))

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
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
};  


export default function IndexPage() {
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
    
  const todos = queryAllTodos.data?.pages[0].items as ITodo[]

  return (
    <TodoProvider>  
      <PaginatedTable todos={todos} />
    </TodoProvider>
  );
}
