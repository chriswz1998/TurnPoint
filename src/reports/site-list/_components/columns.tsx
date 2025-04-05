"use client";

import { ColumnDef } from "@tanstack/react-table";

export type siteListProps = {
  fileId: string;
  id: string;
  address: string;
  city: string;
  housingType: string;
  managerOrSite: string;
  managerPhoneNumber: number;
  site: string;
  sitePhoneNumber: number;
};

export const columns: ColumnDef<siteListProps>[] = [
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "housingType",
    header: "Housing Type",
  },
  {
    accessorKey: "managerOrSite",
    header: "Manager Or Site",
  },
  {
    accessorKey: "managerPhoneNumber",
    header: "Manager's Phone Number",
  },
  {
    accessorKey: "site",
    header: "Site",
  },
  {
    accessorKey: "sitePhoneNumber",
    header: "Site Phone Number",
  },
];
