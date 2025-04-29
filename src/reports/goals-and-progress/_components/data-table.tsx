// Data-table.tsx
//
// This file defines a generic `DataTable` component that takes in a list of columns and data,
// and renders a table using the provided information. The table is built using the `@tanstack/react-table`
// library, and it provides features like rendering data dynamically, handling row selection, and displaying
// a "No results" message when there is no data.
//
// To modify:
// 1. **Changing Column Definitions**:
//    - The `columns` prop defines the structure of the table columns. You can modify the column headers or data rendering logic by updating the `columns` array that is passed into the component.
//    - For example, to change the header of a column, simply modify the `header` property of the corresponding column object.
//
// 2. **Modifying Data Rendering**:
//    - To modify how the data is displayed in each cell, update the `cell` property of each column object in the `columns` array.
//    - The `flexRender` function is used to dynamically render the content of each cell, which allows you to use custom rendering functions for cells.


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
