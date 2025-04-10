"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

export type individualsReportProp = {
  fileId: string;
  id: string;
  ClientPhoto: string;
  person: string;
  dateOfBirth: Date;
  site: string;
  programs: string;
  dateEnteredIntoSystem: Date;
};

export const columns: ColumnDef<individualsReportProp>[] = [
  {
    accessorKey: "ClientPhoto",
    header: "Client Photo",
  },
  {
    accessorKey: "person",
    header: "Individual",
  },
  {
    accessorKey: "datOfBirth",
    header: "Date of Birth",
    cell: ({ row }) => formatDate(row.original.dateOfBirth),
  },
  {
    accessorKey: "site",
    header: "Site",
  },
  {
    accessorKey: "programs",
    header: "Programs",
  },
  {
    accessorKey: "dateEnteredIntoSystem",
    header: "Date Entered into System",
    cell: ({ row }) => formatDate(row.original.dateEnteredIntoSystem),
  },
];
