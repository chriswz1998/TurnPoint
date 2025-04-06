"use client";

import { ColumnDef } from "@tanstack/react-table";

export type rentSupplementsProps = {
  fileId: string;
  id: string;
  individual: string;
  notes: string;
  programOrSite: string;
};

export const columns: ColumnDef<rentSupplementsProps>[] = [
  {
    accessorKey: "individual",
    header: "Individual",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "programOrSite",
    header: "Program or Site",
  },
];
