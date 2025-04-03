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
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/lib/utils.ts";
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
    cell: ({ row }) => formatDate(row.original.uploadtime),
  },
  {
    accessorKey: "id",
    header: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
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
                const typename = row.original?.filetype?.typename;
                const id = row.original?.id;

                if (typename === "Flow Through" && id) {
                  navigate(`/report/flow-through/${id}`);
                }
                if (typename === "Loss of Service" && id) {
                  navigate(`/report/loss-of-service/${id}`);
                }
              }}
            >
              Check Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
