/**
 * DataTable Component for displaying data in a table format using React Table.
 * 
 * This component is designed to render a table with customizable columns and data. 
 * It uses the `@tanstack/react-table` library for handling the table logic, such as 
 * rendering rows and columns dynamically, handling selection, and managing the table state.
 * 
 * The table renders a header based on the provided `columns` definition, and it will 
 * dynamically render rows based on the `data` passed as props. Each row represents 
 * an individual record, and cells are rendered based on the provided column definitions.
 * 
 * Key points to modify:
 * - To change the table structure (e.g., columns), modify the `columns` prop, which 
 *   contains a list of column definitions. Each column is defined by an `accessorKey` 
 *   and a `header`, and optionally, a custom render function for the `cell`.
 * - To modify the appearance of the table, update the UI components like `Table`, 
 *   `TableRow`, `TableCell`, etc., inside the JSX.
 * - To manage pagination or other table behaviors (like filtering), additional hooks 
 *   or logic from `react-table` can be integrated.
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

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