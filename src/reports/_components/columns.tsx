/**
 * This file defines the columns structure and actions for a data table that displays various report files.
 *
 * It includes:
 *
 * 1. **ColumnsHeaderProps** interface:
 *    - Describes the shape of each row of data in the table, which includes the id, filename, filetypeId,
 *      uploadtime, and filetype (which itself is an object containing id, typename, and createAt).
 *
 * 2. **columns array**:
 *    - Defines the columns for the table used with the @tanstack/react-table library.
 *    - Each column is defined with an accessorKey (which is the key in the data), a header (display name), and
 *      a cell (optional function to format data).
 *
 *    Key columns:
 *      - **filename**: Displays the name of the file.
 *      - **filetypeId**: Displays the file type ID.
 *      - **uploadtime**: Displays the time when the file was uploaded, formatted using the formatDate function.
 *      - **actions**: Provides a menu with options to view the corresponding report based on the filetype.
 *
 * 3. **DropdownMenu**:
 *    - Each row includes a "More" button that triggers a dropdown menu.
 *    - The dropdown menu includes a "Check Report" item that navigates to the specific report based on the filetype
 *      of the file. The navigation is done using useNavigate from React Router.
 *    - Different file types have specific URLs for their corresponding reports (e.g., "Flow Through", "Loss of Service",
 *      "Goals and Progress", etc.).
 *
 * 4. **formatDate** function:
 *    - Used to format the uploadtime into a more user-friendly string (e.g., YYYY-MM-DD HH:mm).
 */

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/lib/utils.ts";

// This type is used to define the shape of our data.
export interface ColumnsHeaderProps {
  id: string;
  filename: string;
  filetypeId: string;
  uploadtime: Date;
  filetype: {
    id: string;
    typename: string;
    createAt: Date;
  };
}

// Column definitions for the data table
export const columns: ColumnDef<ColumnsHeaderProps>[] = [
  // Move the actions column to the first position
  {
    accessorKey: "filename",
    header: "File Name",
  },
  {
    accessorKey: "filetypeId",
    header: "Filetype Id",
  },
  {
    accessorKey: "uploadtime",
    header: "Upload Time",
    cell: ({ row }) => formatDate(row.original.uploadtime),
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <Button
          onClick={() => {
            const typename = row.original?.filetype?.typename;
            const id = row.original?.id;

            // Navigate to the corresponding report page based on filetype
            if (typename === "Flow Through" && id) {
              navigate(`/report/flow-through/${id}`);
            }
            if (typename === "Loss of Service" && id) {
              navigate(`/report/loss-of-service/${id}`);
            }
            if (typename === "Goals and Progress" && id) {
              navigate(`/report/goals-and-progress/${id}`);
            }
            if (typename === "Incident Report" && id) {
              navigate(`/report/incident-report/${id}`);
            }
            if (typename === "Individuals" && id) {
              navigate(`/report/individuals-report/${id}`);
            }
            if (typename === "Overdose Safety Plan" && id) {
              navigate(`/report/overdose-safety-plan/${id}`);
            }
            if (typename === "Safety Plan" && id) {
              navigate(`/report/safety-plan/${id}`);
            }
            if (typename === "Rent Supplement Request" && id) {
              navigate(`/report/rent-supplement-request/${id}`);
            }
            if (typename === "Shelter Diversion Follow-Up Log" && id) {
              navigate(`/report/shelter-diversion-log/${id}`);
            }
            if (typename === "Site List" && id) {
              navigate(`/report/site-list/${id}`);
            }
          }}
        >
          check report
        </Button>
      );
    },
  },
];
