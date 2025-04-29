/**
 * Filter data based on the given filter parameters.
 * 
 * This function filters the provided `data` based on a combination of the following filters:
 * - `programOrSite`: Filters data where the `programOrSite` contains the specified string (case-insensitive).
 * - `exitReason`: Filters data where the `exitReason` contains the specified string (case-insensitive).
 * - `from`: Filters data by the `startDate`, keeping only records with a `startDate` on or after the `from` date.
 * - `to`: Filters data by the `exitDate`, keeping only records with an `exitDate` on or before the `to` date.
 * 
 * Modifications:
 * - To add more filters, you can extend the `FilterParams` interface and adjust the filtering logic accordingly.
 * - To change the filtering behavior (e.g., modify date comparison), you can edit the filter conditions in this function.
 */

import { flowThroughDataProps } from "@/reports/flow-through/_components/columns.tsx";

interface DateRange {
  from?: Date;
  to?: Date;
}

interface FilterParams extends DateRange {
  programOrSite?: string;
  exitReason?: string;
}

export function filterData(
  data: flowThroughDataProps[],
  { from, to, programOrSite, exitReason }: FilterParams,
): flowThroughDataProps[] | undefined {
  let filteredData = data;

  // Filter by programOrSite if present
  if (programOrSite && programOrSite.trim() !== "") {
    filteredData = filteredData.filter((item) =>
      item.programOrSite?.toLowerCase().includes(programOrSite.toLowerCase())
    );
  }

 // Filter by exitReason if present
  if (exitReason && exitReason.trim() !== "") {
    filteredData = filteredData.filter((item) =>
      item.exitReason?.toLowerCase().includes(exitReason.toLowerCase())
    );
  }

  // If no dates, return the filtered data so far
  if (!from && !to) {
    return filteredData;
  }

  // If only 'from' is present
  if (from && !to) {
    return filteredData.filter((item) => {
      const startDate = new Date(item.startDate);
      return startDate >= from;
    });
  }

  // If only 'to' is present
  if (!from && to) {
    return filteredData.filter((item) => {
      const exitDate = item.exitDate ? new Date(item.exitDate) : null;
      return exitDate ? exitDate <= to : false;
    });
  }

  // If both 'from' and 'to' are present
  if (from && to) {
    return filteredData.filter((item) => {
      const startDate = new Date(item.startDate);
      const exitDate = item.exitDate ? new Date(item.exitDate) : null;
      return startDate >= from && (exitDate !== null && exitDate <= to);
    });
  }
}
