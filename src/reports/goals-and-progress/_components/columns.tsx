//
// This file defines the column configurations for displaying data in a table related to goals progress.
// The `columns` array is used in a table component, and it specifies the properties and headers for each column.
// The `goalsProgressProps` type defines the shape of the data that will be displayed in the table.
//
// To modify:
// 1. **Changing Column Headers**:
//    - To change the text that appears in a column's header, modify the `header` property for the corresponding column.
//    - Example: To change the "Completion Date" header to "Date Completed", you would change:
//      ```tsx
//      header: "Date Completed"
//      ```
  
// 2. **Modifying Column Data (Cell)**:
//    - To change how the data for a particular column is displayed, modify the `cell` function for that column.
//    - The `cell` function receives a `row` object, which contains the current row's data.
//    - For example, if you want to display the `completionDate` as a different format, you can modify the `formatDate` function or replace it with a custom function.
//      Example:
//      ```tsx
//      cell: ({ row }) => new Date(row.original.completionDate).toLocaleDateString()
//      ```
  
// 3. **Adding New Columns**:
//    - To add a new column, simply add a new object to the `columns` array with the desired `accessorKey` (which maps to a property in the data) and a `header`.
//    - Example: To add a new column for "Goal Status", you could add the following:
//      ```tsx
//      {
//        accessorKey: "goalStatus",
//        header: "Goal Status",
//      }
//      ```


"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

// Defining the structure of the data used in the goals progress table
export type goalsProgressProps = {
  fileId: string;
  id: string;
  completionDate: Date;
  discontinuedDate: Date;
  goalDescription: string;
  goalTitle: string;
  goalType: string;
  individual: string;
  personalOutcome: string;
  programResidence: string;
  startDate: Date;
};

// Column definitions for the goals progress table
export const columns: ColumnDef<goalsProgressProps>[] = [
  {
    accessorKey: "completionDate",
    header: "Completion Date",
    cell: ({ row }) => formatDate(row.original.completionDate),
  },
  {
    accessorKey: "discontinuedDate",
    header: "Discontinued Date",
    cell: ({ row }) => formatDate(row.original.discontinuedDate),
  },
  {
    accessorKey: "goalDescription",
    header: "Goal Description",
  },
  {
    accessorKey: "goalTitle",
    header: "Goal Title",
  },
  {
    accessorKey: "goalType",
    header: "Goal Type",
  },
  {
    accessorKey: "individual",
    header: "Individual",
  },
  {
    accessorKey: "personalOutcome",
    header: "Personal Outcome",
  },
  {
    accessorKey: "programResidence",
    header: "Program or Residence",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => formatDate(row.original.startDate),
  },
];
