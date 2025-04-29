/**
 * This file is responsible for filtering data based on a date range.
 * It processes the data according to the specified rows and columns 
 * for each particular file. The function filters the data by checking 
 * if the start date and optionally the exit date fall within the provided 
 * date range. Additionally, it can return the count of filtered data 
 * if requested by the control object.
 * 
 * The function accepts:
 * - `data`: The raw data to filter.
 * - `control`: Contains the date range (`from` and `to`) and a flag `totalResponse`
 *   which determines if the count of filtered data should be calculated.
 * - `includeExitDate`: A flag to determine if the `exitDate` field should be considered
 *   in the filtering (default is `false`).
 * 
 * To modify how the rows and columns are processed:
 * - The filtering logic uses the `startDate` and `exitDate` from the data entries.
 * - To modify the rows or columns being filtered, adjust the field names like `startDate` or `exitDate`
 *   in the function or pass in the appropriate fields for your dataset.
 * 
 * The function returns:
 * - `filteredData`: An array of data that matches the date range (and `exitDate` if specified).
 * - `count`: The number of matching records, or `null` if `totalResponse` is `false`.
 */

import { flowThroughDataProps } from "@/reports/flow-through/_components/columns.tsx";

interface DateRange {
  from: Date;
  to: Date;
}

interface FilterControl {
  dateRange: DateRange;
  totalResponse: boolean;
}

interface FilterResult {
  filteredData: flowThroughDataProps[];
  count: number | null;
}

/**
 * Filters the data based on the dateRange and optionally includes exitDate in the filtering.
 * Additionally, if totalResponse is true, it calculates the count of the filtered data.
 * 
 * @param data - The raw data to be filtered.
 * @param control - Filter control object, which includes the dateRange and the totalResponse flag.
 * @param includeExitDate - Whether to include the exitDate in the filter (default is false).
 * 
 * @returns { filteredData, count }
 *   - filteredData: The data that matches the date range (and exitDate if specified).
 *   - count: The number of matching records, or null if totalResponse is false.
 */
export function filterDataAndCount(
  data: flowThroughDataProps[],
  control: FilterControl,
  includeExitDate: boolean = false,
): FilterResult {
  const { dateRange, totalResponse } = control;

  // Filter the data based on the start date and optionally the exit date
  const filteredData = data.filter((item) => {
    const start = new Date(item.startDate); // Convert startDate to Date object
    const isStartValid = start >= dateRange.from && start <= dateRange.to; // Check if startDate is within range

    // If exitDate should not be included, return the validity of the start date
    if (!includeExitDate) return isStartValid;

    const exit = item.exitDate ? new Date(item.exitDate) : null; // Handle exitDate, if exists
    const isExitValid = exit
      ? exit >= dateRange.from && exit <= dateRange.to // Check if exitDate is within range
      : true; // If no exitDate, consider it valid

    // Return true if both startDate and exitDate (if checked) are valid
    return isStartValid && isExitValid;
  });

  // If totalResponse is true, return the count of filtered data
  const count = totalResponse ? filteredData.length : null;

  // Return the filtered data and the count (if totalResponse is true)
  return {
    filteredData,
    count,
  };
}
