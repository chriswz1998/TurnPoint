/**
 * siteListProps Type
 *
 * This type defines the structure of each site entry in the table. Each property represents 
 * a specific detail about the site, such as its address, city, housing type, manager's information, etc.
 * The fields are as follows:
 * - `fileId`: Unique identifier for the file.
 * - `id`: Unique identifier for the site.
 * - `Address`: The physical address of the site.
 * - `City`: The city where the site is located.
 * - `HousingType`: The type of housing (e.g., apartment, single-family home, etc.).
 * - `ManagerOrSite`: Name of the site manager or the site name.
 * - `ManagerPhoneNumber`: The phone number of the site manager.
 * - `Site`: The name of the site.
 * - `SitePhoneNumber`: The phone number of the site.
 */

"use client";

import { ColumnDef } from "@tanstack/react-table";

/**
 * Columns configuration array for the site list table.
 * Each object represents a column in the table.
 */

export type siteListProps = {
  fileId: string;
  id: string;
  Address: string;
  City: string;
  HousingType: string;
  ManagerOrSite: string;
  ManagerPhoneNumber: number;
  Site: string;
  SitePhoneNumber: number;
};

export const columns: ColumnDef<siteListProps>[] = [
  {
    accessorKey: "Address",
    header: "Address",
  },
  {
    accessorKey: "City",
    header: "City",
  },
  {
    accessorKey: "HousingType",
    header: "Housing Type",
  },
  {
    accessorKey: "ManagerOrSite",
    header: "Manager Or Site",
  },
  {
    accessorKey: "ManagerPhoneNumber",
    header: "Manager's Phone Number",
  },
  {
    accessorKey: "Site",
    header: "Site",
  },
  {
    accessorKey: "SitePhoneNumber",
    header: "Site Phone Number",
  },
];
