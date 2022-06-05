import usePagination from '../../hooks/usePagination';
import {
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Table,
} from '@chakra-ui/react';
import { useState } from 'react';

export const ToDoTable = (props: any) => {
  const { pages } = props.data;
  const [toDos, setToDos] = useState(pages[0].items);

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 5,
    count: pages[0].items.length,
  });

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>List of all ToDos</TableCaption>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>ToDo</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {toDos
            .slice(firstContentIndex, lastContentIndex)
            .map((x: any, i: any) => {
              const { id, content, status } = x;
              return (
                <Tr key={i}>
                  <Td>{id}</Td>
                  <Td>{content}</Td>
                  <Td>{status}</Td>
                </Tr>
              );
            })}
        </Tbody>
        <Tfoot>
          <p className="text">
            {page}/{totalPages}
          </p>
          <button
            onClick={prevPage}
            className={`page ${page === 1 && 'disabled'}`}
          >
            &larr;
          </button>
          {/* @ts-ignore */}
          {[...Array(totalPages).keys()].map((el) => (
            <button
              onClick={() => setPage(el + 1)}
              key={el}
              className={`page ${page === el + 1 ? 'active' : ''}`}
            >
              {el + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            className={`page ${page === totalPages && 'disabled'}`}
          >
            &rarr;
          </button>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
