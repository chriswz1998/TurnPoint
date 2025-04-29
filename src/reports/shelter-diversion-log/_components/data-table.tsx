/**
 * DataTable Component
 *
 * This is a generic, reusable table component built using the TanStack React Table library.
 * It accepts columns and data as props, and renders a table with dynamic headers and rows.
 * The table's rows and cells are rendered based on the configuration provided by the columns.
 * This component is designed to be flexible, allowing it to handle any type of data structure by 
 * passing the appropriate column definitions and data.
 *
 * How to modify:
 * - To modify the appearance or behavior of the table, you can adjust the `columns` and `data` props.
 * - You can customize the table headers, cells, and rows by modifying the column definitions and rendering logic.
 * - The table can be extended by adding additional functionality like sorting, pagination, etc.
 * 
 * Props:
 * - `columns`: Column definitions for the table, which include how the data is displayed and formatted.
 * - `data`: The actual data to display in the table, which should match the structure defined by the column definitions.
 */

"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// DataTable component, generic for any data type and column definition
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// DataTable component definition
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
