// filterData.ts
/**
 * This file is responsible for filtering the goals progress data based on various parameters.
 * The filtering is applied to specific columns such as start date, completion date, discontinued date,
 * and also based on form values like individual, program site, and goal type.
 * 
 * The function accepts the following parameters:
 * - `startDate`: The start date to filter records that are equal to or after this date.
 * - `completionDate`: The completion date to filter records that are equal to or before this date.
 * - `discontinuedDate`: The discontinued date to filter records that are equal to or before this date.
 * - `form`: A `UseFormReturn` object that provides form values to filter the data by individual, program site, and goal type.
 * - `originalData`: The raw data to filter, based on the filtering conditions.
 * 
 * The function will return an array of filtered data based on the conditions:
 * - Filters records by `startDate`, `completionDate`, and `discontinuedDate` if the dates are provided.
 * - Filters records based on the `individual` and `programSite` values entered in the form.
 * - Filters records by `goalType` if it is specified in the form.
 * 
 * To modify the filtering process:
 * - Adjust the field names in the filtering logic (e.g., `startDate`, `completionDate`, `goalType`).
 * - You can change the date fields or form values used for filtering as per your dataset and requirements.
 * 
 * The function will return:
 * - `filteredData`: The filtered array of data based on the applied conditions.
 */

import { UseFormReturn } from "react-hook-form";
import { goalsProgressProps } from "@/reports/goals-and-progress/_components/columns.tsx";

interface FilterParams {
  startDate?: Date;
  completionDate?: Date;
  discontinuedDate?: Date;
  form: UseFormReturn<{
    individual: string;
    programSite: string;
    goalType?: string;
  }>;
  originalData: goalsProgressProps[];
}

export function filterData({
  startDate,
  completionDate,
  discontinuedDate,
  form,
  originalData,
}: FilterParams): goalsProgressProps[] {
  let filteredData = originalData ?? [];

  // Filter data based on startDate if provided
  if (startDate) {
    filteredData = filteredData.filter((data) => {
      const itemStartDate = new Date(data.startDate);
      return itemStartDate >= startDate;
    });
  }

  // Filter data based on completionDate if provided
  if (completionDate) {
    filteredData = filteredData.filter((data) => {
      const itemCompletionDate = new Date(data.completionDate);
      return itemCompletionDate <= completionDate;
    });
  }

  // Filter data based on discontinuedDate if provided
  if (discontinuedDate) {
    filteredData = filteredData.filter((data) => {
      const itemDiscontinuedDate = new Date(data.discontinuedDate);
      return itemDiscontinuedDate <= discontinuedDate;
    });
  }

  // Filter data based on the 'individual' value from the form
  if (form.getValues().individual) {
    filteredData = filteredData.filter((data) =>
      data.individual
        .toLowerCase()
        .includes(form.getValues().individual.toLowerCase()),
    );
  }

  // Filter data based on the 'programSite' value from the form
  if (form.getValues().programSite) {
    filteredData = filteredData.filter((data) =>
      data.programResidence
        .toLowerCase()
        .includes(form.getValues().programSite.toLowerCase()),
    );
  }

  // Filter data based on the 'goalType' value from the form
  const goalTypeValue = form.getValues().goalType?.trim();

  if (goalTypeValue) {
    filteredData = filteredData.filter((data) => {
      return (
        data.goalType &&
        data.goalType.toLowerCase().includes(goalTypeValue.toLowerCase())
      );
    });
  }

  return filteredData;
}
