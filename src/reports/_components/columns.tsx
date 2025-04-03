"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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

export const columns: ColumnDef<ColumnsHeaderProps>[] = [
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
    header: "upload time",
  },
  {
    accessorKey: "id",
    header: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                console.log(row.original?.filetype.typename);
              }}
            >
              <Link to={`row.original?.filetype.typename`}> Check Report</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
