"use client";

import { ColumnDef } from "@tanstack/react-table";

export type losOfServiceProps = {
  endDateTime: string;
  individual: string;
  managerApproved: string;
  programOrSite: string;
  rationaleLOS: string;
  reasonRestriction: string;
  reviewTPCSLOS: string;
  staffReporting: string;
  startDateTime: string;
  relatedToIncident: string;
};

export const columns: ColumnDef<losOfServiceProps>[] = [
  {
    accessorKey: "individual",
    header: "Individual",
  },
  {
    accessorKey: "endDateTime",
    header: "End Date",
  },
  {
    accessorKey: "managerApproved",
    header: "Manager Approved",
  },
  {
    accessorKey: "programOrSite",
    header: "Program or Site",
  },
  {
    accessorKey: "rationaleLOS",
    header: "Rationale LOS",
  },
  {
    accessorKey: "reasonRestriction",
    header: "Reason Restriction",
  },
  {
    accessorKey: "reviewTPCSLOS",
    header: "Review TPCSLOS",
  },
  {
    accessorKey: "staffReporting",
    header: "Staff Reporting",
  },
  {
    accessorKey: "startDateTime",
    header: "Start Date",
  },
  {
    accessorKey: "relatedToIncident",
    header: "Related to Incident",
  },
];
