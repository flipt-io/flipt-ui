import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { IAuthToken } from '~/types/auth/Token';

type TokenTableProps = {
  tokens: IAuthToken[];
};

export default function TokenTable(props: TokenTableProps) {
  const { tokens } = props;

  const pageSize = 20;
  const searchThreshold = 10;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20
  });

  const columnHelper = createColumnHelper<IAuthToken>();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
      meta: {
        className:
          'truncate whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-600'
      }
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => info.getValue(),
      meta: {
        className: 'truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500'
      }
    }),
    columnHelper.accessor(
      (row) => format(parseISO(row.createdAt), 'MM/dd/yyyy'),
      {
        header: 'Created',
        id: 'createdAt',
        meta: {
          className: 'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
        }
      }
    ),
    columnHelper.accessor(
      (row) => {
        if (!row.expiresAt) {
          return '';
        }
        return format(parseISO(row.expiresAt), 'MM/dd/yyyy');
      },
      {
        header: 'Expires',
        id: 'expiresAt',
        meta: {
          className:
            'truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500'
        }
      }
    )
  ];

  const table = useReactTable({
    data: tokens,
    columns,
    state: {
      sorting,
      pagination
    },
    globalFilterFn: 'includesString',
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <table className="min-w-full table-fixed divide-y divide-gray-300">
      <thead className="bg-gray-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) =>
              header.column.getCanSort() ? (
                <th
                  key={header.id}
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  <a
                    href="#"
                    className="group inline-flex"
                    onClick={(e) => {
                      e.preventDefault();
                      header.column.getToggleSortingHandler();
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                      {{
                        asc: (
                          <ChevronUpIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        ),
                        desc: (
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        )
                      }[header.column.getIsSorted() as string] ?? null}
                    </span>
                  </a>
                </th>
              ) : (
                <th
                  key={header.id}
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              )
            )}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={cell.column.columnDef?.meta?.className}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
