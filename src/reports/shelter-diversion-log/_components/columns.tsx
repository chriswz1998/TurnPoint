/**
 * ShelderDiversionFollowup Column Definitions
 * 
 * This file defines the structure for the data displayed in a table for shelter diversion follow-ups.
 * It includes various columns like community, current goals, diversion methods, and follow-up logs, 
 * with a special formatting for the "Initial Follow-Up Date" column. The data type and column 
 * definitions are used to build a table with specific behaviors and headers for each column.
 * 
 * How to modify:
 * - You can add more columns by appending additional entries to the `columns` array.
 * - If new data fields are introduced in the data type `shelderDiversionFollowupProps`, 
 *   add them to this array and ensure proper formatting (e.g., dates, numeric values).
 * - Modify or add custom render logic for specific columns in the `cell` property (like formatting a date).
 */

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

// Defining the data type for shelter diversion follow-up entries
export type shelderDiversionFollowupProps = {
  fileId: string;
  id: string;
  community: string;
  currentGoals: string;
  currentGoalsDescription: string;
  diversionCost: number;
  diversionMethod: string;
  divertedTo: string;
  evictionPrevention: string;
  followUpLog: string;
  initialFollowUpDate: Date;
  referralLog: string;
  successfulDiversion: string;
};

// Defining the columns for the table
export const columns: ColumnDef<shelderDiversionFollowupProps>[] = [
  {
    accessorKey: "community",
    header: "Community",
  },
  {
    accessorKey: "currentGoals",
    header: "Current Goals",
  },
  {
    accessorKey: "currentGoalsDescription",
    header: "Current Goals Description",
  },
  {
    accessorKey: "diversionCost",
    header: "Diversion Cost",
  },
  {
    accessorKey: "diversionMethod",
    header: "Diversion Method",
  },
  {
    accessorKey: "divertedTo",
    header: "Diverted To",
  },
  {
    accessorKey: "evictionPrevention",
    header: "Eviction Prevention",
  },
  {
    accessorKey: "followUpLog",
    header: "Follow-Up Log",
  },
  {
    accessorKey: "initialFollowUpDate",
    header: "Initial Follow-Up Date",
    cell: ({ row }) => formatDate(row.original.initialFollowUpDate),
  },
  {
    accessorKey: "referralLog",
    header: "Referral Log",
  },
  {
    accessorKey: "successfulDiversion",
    header: "Successfull Diversion",
  },
];
