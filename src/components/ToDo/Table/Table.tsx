import React from 'react';
import ReactDOM from 'react-dom';

import {
  Box,
  VStack,
  Flex,
  Table,
  Tr,
  Th,
  Tbody,
  Thead,
  Container,
} from '@chakra-ui/react';

import {
  createTable,
  Column,
  TableInstance,
  PaginationState,
  useTableInstance,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
} from '@tanstack/react-table';

import { ITodo } from '../../../types/types.todo';

const table = createTable().setRowType<ITodo>();

export function ToDoTable({
  data,
  columns,
  pagination,
  setPagination,
}: {
  data: ITodo[];
  columns: ColumnDef<typeof table.generics>[];
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
}) {
  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  });

  return (
    <VStack spacing={4}>
      <Container maxW="container.sm" centerContent={true}>
        <Box w="100%">
          <Table>
            <Thead>
              {instance.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {header.renderHeader()}
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter
                                  column={header.column}
                                  instance={instance}
                                />
                              </div>
                            ) : null}
                          </div>
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {instance.getRowModel().rows.map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return <td key={cell.id}>{cell.renderCell()}</td>;
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
        <Box w="100%">
          <div>{instance.getRowModel().rows.length} Rows</div>
          <button
            className="border rounded p-1"
            onClick={() => instance.setPageIndex(0)}
            disabled={!instance.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => instance.previousPage()}
            disabled={!instance.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => instance.nextPage()}
            disabled={!instance.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => instance.setPageIndex(instance.getPageCount() - 1)}
            disabled={!instance.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {instance.getState().pagination.pageIndex + 1} of{' '}
              {instance.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={instance.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                instance.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={instance.getState().pagination.pageSize}
            onChange={(e) => {
              instance.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Box>
      </Container>
    </VStack>
  );
}
function Filter({
  column,
  instance,
}: {
  column: Column<any>;
  instance: TableInstance<any>;
}) {
  const firstValue = instance
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}

export default ToDoTable;
