/**
 * Generic DataTable Component
 *
 * This file defines a reusable `DataTable` component built using TanStack React Table and a custom Table UI.
 * It renders a table based on provided column definitions and data, supporting dynamic rows and headers.
 *
 * Key Features:
 * - Renders tables dynamically based on generic types `TData` and `TValue`.
 * - Handles empty states gracefully by displaying a "No results" message.
 * - Uses TanStack's `useReactTable` to manage rows, headers, and core table models.
 * - Utilizes a custom `Table`, `TableHead`, `TableBody`, `TableRow`, and `TableCell` components for styling.
 *
 * How to Modify:
 * - To change table styling, edit the wrapper `<div>` or the imported `Table` component styles.
 * - To add new functionality (sorting, pagination, etc.), extend the `useReactTable` configuration.
 * - To customize cell rendering globally, modify how `flexRender` is used inside `TableCell`.
 * - To adapt the component for different UI libraries, swap out the imported table components accordingly.
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
