/**
 * Loss of Service Data Columns Configuration
 * 
 * This file defines the structure and format for the columns in the "Loss of Service" report table. It exports the `columns`
 * array, which contains the column definitions used by TanStack React Table to render the data in the table. Each column definition
 * specifies how to access the data, the column header, and any necessary transformations or formatting (e.g., date formatting).
 * 
 * Key Features:
 * - The columns represent various attributes of a "Loss of Service" record.
 * - Date fields such as `EndDateTimeOfLOS` and `StartDateTimeOfLOS` are formatted using the `formatDate` function.
 * 
 * How to Modify:
 * - To add or remove columns, simply modify the `columns` array by adding/removing objects with the necessary column properties.
 * - To change how any data is displayed, adjust the `cell` property in the column definition.
 * - To format other fields or change headers, modify the `accessorKey`, `header`, or `cell` properties for the relevant columns.
 */

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts"; // Utility function for formatting dates

// Define the type for the data structure representing "Loss of Service" records
export type losOfServiceProps = {
  EndDateTimeOfLOS: string;
  Individual: string;
  ManagerApproved: string;
  ProgramOrSite: string;
  RationaleForLOSMore48Hours: string;
  ReasonAndRationaleForRestriction: string;
  ReviewForTPCSLOS: string;
  StaffReporting: string;
  StartDateTimeOfLOS: string;
  WasThisRelatedToACriticalIncident: string;
  fileId: string;
  id: string;
};

// Define the column structure for the table using TanStack React Table's ColumnDef
export const columns: ColumnDef<losOfServiceProps>[] = [
  {
    accessorKey: "Individual", // Key for accessing the data in the table
    header: "Individual", // Column header label
  },
  {
    accessorKey: "EndDateTimeOfLOS", // Key for accessing End Date of Loss of Service
    header: "End Date", // Column header label
    // Format the End Date field
    cell: ({ row }) => formatDate(new Date(row.original.EndDateTimeOfLOS)),
  },
  {
    accessorKey: "ManagerApproved",
    header: "Manager Approved",
  },
  {
    accessorKey: "ProgramOrSite",
    header: "Program or Site",
  },
  {
    accessorKey: "RationaleForLOSMore48Hours",
    header: "Rationale LOS",
  },
  {
    accessorKey: "ReasonAndRationaleForRestriction",
    header: "Reason Restriction",
  },
  {
    accessorKey: "ReviewForTPCSLOS",
    header: "Review TPCSLOS",
  },
  {
    accessorKey: "StaffReporting",
    header: "Staff Reporting",
  },
  {
    accessorKey: "StartDateTimeOfLOS",
    header: "Start Date",
    // Format the Start Date field
    cell: ({ row }) => formatDate(new Date(row.original.StartDateTimeOfLOS)),
  },
  {
    accessorKey: "WasThisRelatedToACriticalIncident",
    header: "Related to Incident",
  },
];
