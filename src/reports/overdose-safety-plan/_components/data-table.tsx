/**
 * Generic DataTable Component
 *
 * This component renders a dynamic and reusable table using `@tanstack/react-table`
 * and a custom UI table system.
 *
 * Features:
 * - Dynamically generates the table header and body based on the provided column definitions and data.
 * - Gracefully handles empty data with a "No results" fallback.
 * - Supports selection state for rows.
 *
 * Props:
 * - `columns`: An array of column definitions (`ColumnDef`) describing how each column should be rendered.
 * - `data`: An array of data entries to populate the table rows.
 *
 * How to Use:
 * - Import and pass the `columns` and `data` props according to your table structure.
 * - Columns must match the keys of your data model.
 *
 * Example:
 * ```tsx
 * <DataTable columns={userColumns} data={userData} />
 * ```
 *
 * Notes:
 * - This component focuses only on displaying data. For features like pagination, sorting, and filtering, extend the `useReactTable` configuration.
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
