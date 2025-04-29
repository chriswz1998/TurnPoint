/**
 * Overdose Safety Plan - Table Columns Definition
 *
 * This file defines the columns for displaying Overdose Safety Plan records 
 * in a data table using `@tanstack/react-table`.
 *
 * Features:
 * - Specifies column headers for each key field from `overdoseSafetyPlanProps`.
 * - Formats the `TodaysDate` field using a custom `formatDate` utility for better readability.
 *
 * How to Modify:
 * - To add a new field, add a new object to the `columns` array with the appropriate `accessorKey` and `header`.
 * - To change how a field is displayed, modify the `cell` function inside the corresponding column definition.
 * - To rearrange column order, change the order of entries in the `columns` array.
 * - If adding new fields to the database, ensure `overdoseSafetyPlanProps` is updated accordingly.
 */

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

export type overdoseSafetyPlanProps = {
  fileId: string;
  id: string;
  CrisisContacts: string;
  Individual: string;
  ProgramOrSite: string;
  RiskFactors: string;
  RiskReductionActions: string;
  StaffMember: string;
  SupportPeople: string;
  TodaysDate: Date;
  WellnessHabits: string;
};

export const columns: ColumnDef<overdoseSafetyPlanProps>[] = [
  {
    accessorKey: "CrisisContacts",
    header: "Crisis Contact",
  },
  {
    accessorKey: "Individual",
    header: "Individual",
  },
  {
    accessorKey: "ProgramOrSite",
    header: "Program or Site",
  },
  {
    accessorKey: "RiskFactors",
    header: "Risk Factors",
  },
  {
    accessorKey: "RiskReductionActions",
    header: "Risk Reduction Actions",
  },
  {
    accessorKey: "StaffMember",
    header: "Staff Member",
  },
  {
    accessorKey: "SupportPeople",
    header: "Support People",
  },
  {
    accessorKey: "TodaysDate",
    header: "Today's Date",
    cell: ({ row }) => formatDate(row.original.TodaysDate),
  },
  {
    accessorKey: "WellnessHabits",
    header: "Wellness Habits",
  },
];
