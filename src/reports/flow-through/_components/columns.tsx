"use client";

import { ColumnDef } from "@tanstack/react-table";

export type flowThroughDataProps = {
  individual: string;
  programOrSite: string;
  startDate: string;
  exitDate: string;
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
  },
  {
    accessorKey: "exitDate",
    header: "Exit Date",
  },
  {
    accessorKey: "exitReason",
    header: "Exit Reason",
  },
];
