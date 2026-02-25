import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

const ROWS_PER_PAGE = 20;

function DataList({ words = [], onDelete }) {
  const [page, setPage] = useState(0);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const paginatedWords =
    ROWS_PER_PAGE > 0
      ? words.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
      : words;

  const totalPages = Math.max(1, Math.ceil(words.length / ROWS_PER_PAGE));

  return (
    <div className="flex flex-col gap-4 md:gap-5 mt-4 md:mt-6">
      <div className="-mx-4 px-4 md:mx-0 md:px-0">
        <div className="w-full overflow-x-auto">
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              minWidth: 720,
            }}
          >
            <Table
              sx={{
                minWidth: 650,
                backgroundColor: 'rgb(9 9 11)',
                '& th': { borderBottomColor: 'rgba(63,63,70,0.6)' },
              }}
              aria-label="tabela de palavras"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 500 }}>
                    Palavra
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 500 }} align="right">
                    Tradução
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 500 }} align="right">
                    Dificuldade
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 500 }} align="right">
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedWords.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? 'rgb(24 24 27)' : 'rgb(15 15 23)',
                      '&:last-child td, &:last-child th': { borderBottom: 0 },
                    }}
                  >
                    <TableCell
                      sx={{ color: 'white', borderBottomColor: 'rgba(39,39,42,0.9)' }}
                      component="th"
                      scope="row"
                    >
                      {row.word}
                    </TableCell>
                    <TableCell
                      sx={{ color: 'white', borderBottomColor: 'rgba(39,39,42,0.9)' }}
                      align="right"
                    >
                      {row.translation}
                    </TableCell>
                    <TableCell
                      sx={{ color: 'white', borderBottomColor: 'rgba(39,39,42,0.9)' }}
                      align="right"
                    >
                      {row.rating}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottomColor: 'rgba(39,39,42,0.9)' }}
                      align="right"
                    >
                      {typeof onDelete === 'function' && (
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          className="inline-flex items-center gap-1 rounded-full border border-red-500/40 bg-red-500/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-red-300 hover:bg-red-500/20 hover:border-red-400/70 transition-colors"
                        >
                          <span>Excluir</span>
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3">
        <p className="text-xs md:text-sm text-zinc-500">
          Total de palavras cadastradas: {words.length}. Página {page + 1} de{' '}
          {totalPages}.
        </p>
        <TablePagination
          component="div"
          count={words.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={ROWS_PER_PAGE}
          rowsPerPageOptions={[ROWS_PER_PAGE]}
          labelRowsPerPage=""
          sx={{
            color: 'rgb(161 161 170)',
            '.MuiTablePagination-toolbar': { paddingX: 0 },
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              margin: 0,
            },
          }}
        />
      </div>
    </div>
  );
}

export default DataList;
