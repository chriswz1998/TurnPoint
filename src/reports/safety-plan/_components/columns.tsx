/**
 * This module defines the structure for a safety plan and the columns for displaying it in a table.
 * 
 * The `safetyPlanProps` type represents the data for an individual safety plan, including various fields
 * such as the individual's name, their program or site, self-soothing strategies, reasons for living, 
 * support connections, and safe spaces.
 * 
 * The `columns` array defines the column structure for the data table, using the `accessorKey` to map each
 * field of the `safetyPlanProps` type to a corresponding column in the table. The headers of the table are 
 * labeled according to each of the properties in the `safetyPlanProps` type.
 * 
 * How to modify:
 * - To add or remove columns, modify the `columns` array by adding or removing objects with the `accessorKey`
 *   and `header` properties.
 * - To modify the data structure (e.g., adding new fields), update the `safetyPlanProps` type and adjust the
 *   `columns` accordingly.
 */

"use client";

import { ColumnDef } from "@tanstack/react-table";

// Define the type for the safety plan data structure
export type safetyPlanProps = {
  fileId: string;
  id: string;
  individual: string;
  programOrSite: string;
  selfSoothingStrategies: string;
  reasonsForLiving: string;
  supportConnections: string;
  safeSpaces: string;
};

// Define the columns for the table displaying the safety plan data
export const columns: ColumnDef<safetyPlanProps>[] = [
  {
    accessorKey: "individual",
    header: "Individual",
  },
  {
    accessorKey: "programOrSite",
    header: "Program or Site",
  },
  {
    accessorKey: "selfSoothingStrategies",
    header: "Self-soothing Strategies",
  },
  {
    accessorKey: "reasonsForLiving",
    header: "Reasons For Living",
  },
  {
    accessorKey: "supportConnections",
    header: "Support Connections",
  },
  {
    accessorKey: "safeSpaces",
    header: "Safe Spaces",
  },
];
