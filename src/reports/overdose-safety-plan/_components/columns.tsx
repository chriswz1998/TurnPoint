"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils.ts";

export type overdoseSafetyPlanProps = {
  fileId: string;
  id: string;
  crisisContacts: string;
  individual: string;
  programOrSite: string;
  riskFactors: string;
  riskReductionActions: string;
  staffMember: string;
  supportPeople: string;
  todaysDate: Date;
  wellnessHabits: string;
};

export const columns: ColumnDef<overdoseSafetyPlanProps>[] = [
  {
    accessorKey: "crisisContact",
    header: "Crisis Contact",
  },
  {
    accessorKey: "individual",
    header: "Individual",
  },
  {
    accessorKey: "programOrSite",
    header: "Program or Site",
  },
  {
    accessorKey: "riskFactors",
    header: "Risk Factors",
  },
  {
    accessorKey: "riskReuctionActions",
    header: "Risk Reduction Actions",
  },
  {
    accessorKey: "staffMember",
    header: "Staff Member",
  },
  {
    accessorKey: "supportPeople",
    header: "Support People",
  },
  {
    accessorKey: "todaysDate",
    header: "Today's Date",
    cell: ({ row }) => formatDate(row.original.todaysDate),
  },
  {
    accessorKey: "wellnessHabits",
    header: "Wellness Habits",
  },
];
