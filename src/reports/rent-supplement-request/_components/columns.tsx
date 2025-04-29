"use client"; // Enables "use client" mode for a client component in Next.js

import { ColumnDef } from "@tanstack/react-table"; // Imports column definition for the table

// Defines the data type for the rent supplements report
export type rentSupplementsProps = {
  fileId: string;          // File ID associated with the record
  id: string;              // Record ID
  Individual: string;      // Name of the individual
  Notes: string;           // Additional notes
  programOrSite: string;   // Name of the program or site
};

// Table column configuration
export const columns: ColumnDef<rentSupplementsProps>[] = [
  {
    accessorKey: "Individual", // Access the 'Individual' field
    header: "Individual",      // Header displayed in the table
  },
  {
    accessorKey: "Notes",       // Access the 'Notes' field
    header: "Notes",            // Header displayed in the table
  },
  {
    accessorKey: "programOrSite", // Access the 'programOrSite' field
    header: "Program or Site",    // Header displayed in the table
  },
];
