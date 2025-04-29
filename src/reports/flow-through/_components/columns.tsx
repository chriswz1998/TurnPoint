/**
 * flowThroughDataProps Type and Columns Definition for React Table
 * 
 * This file defines the structure and columns for displaying data related to individuals
 * in a flow-through program or site. The data includes information such as the individual's
 * program/site, start date, exit date, and exit reason.
 * 
 * `flowThroughDataProps` type defines the following fields:
 * - `fileId`: Unique identifier for the file.
 * - `id`: Unique identifier for the individual.
 * - `individual`: Name or identifier of the individual.
 * - `programOrSite`: The program or site the individual is associated with.
 * - `startDate`: The date when the individual entered the program.
 * - `exitDate`: The date when the individual exited the program.
 * - `exitReason`: The reason for the exit, which can either be "Graduated" or "Transferred".
 * 
 * The `columns` array defines the columns for the table, using the `@tanstack/react-table` library.
 * Each column has:
 * - `accessorKey`: The key that links the column to the corresponding data in `flowThroughDataProps`.
 * - `header`: The display name for the column.
 * - `cell`: A custom rendering function for the cell's content (e.g., formatting dates).
 * 
 * Modifications:
 * - To change the displayed columns, modify the `columns` array by adding, removing, or changing the columns.
 * - To modify the behavior of any column (e.g., format, filter), update the `cell` function for that column.
 * - To add new data fields, update the `flowThroughDataProps` type and adjust the relevant column in the `columns` array.
 */

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

export type flowThroughDataProps = {
  fileId: string;
  id: string;
  individual: string;
  programOrSite: string;
  startDate: Date;
  exitDate: Date;
  exitReason: "Graduated" | "Transferred";
};

export const columns: ColumnDef<flowThroughDataProps>[] = [
  {
    accessorKey: "individual",
    header: "Individual",
  },
  {
    accessorKey: "programOrSite",
    header: "Program or Site",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => formatDate(row.original.startDate),
  },
  {
    accessorKey: "exitDate",
    header: "Exit Date",
    cell: ({ row }) => formatDate(row.original.exitDate),
  },
  {
    accessorKey: "exitReason",
    header: "Exit Reason",
  },
];
