/**
 * This file handles filtering individual report data based on specific form parameters.
 * The filtering checks against the following criteria:
 * - `individual`: Filters the report based on the individual name (person).
 * - `program`: Filters the report based on the program (site).
 * 
 * The function accepts the following parameters:
 * - `form`: A `UseFormReturn` object from `react-hook-form` containing form values for filtering (individual and program).
 * - `originalData`: The raw data to filter, which contains individuals report information.
 * 
 * The function will return an array of filtered individuals report data based on the provided parameters.
 * 
 * To modify the filtering:
 * - Adjust the field names or the filtering logic used in the `.filter()` methods. 
 * - If new filter criteria are required (such as another field in the form), you can add additional checks in the `if` conditions.
 * 
 * The function will return:
 * - `filteredData`: The filtered array of individuals report data based on the applied criteria.
 */

import { UseFormReturn } from "react-hook-form";
import { individualsReportProp } from "@/reports/individuals-report/_components/columns.tsx";

interface FilterParams {
  form: UseFormReturn<{
    individual?: string;
    program?: string;
  }>;
  originalData: individualsReportProp[];
}

export function filterData({
  form,
  originalData,
}: FilterParams): individualsReportProp[] {
  let filteredData = originalData ?? [];

  // Get the values from the form
  const { individual, program } = form.getValues();

  // Filter by individual if specified
  if (individual) {
    filteredData = filteredData.filter((data) =>
      data.person.toLowerCase().includes(individual.toLowerCase()),
    );
  }

  // Filter by program if specified
  if (program) {
    filteredData = filteredData.filter((data) => {
      const siteValue = data.site ? data.site.toLowerCase() : "";
      return siteValue.includes(program.toLowerCase());
    });
  }

  return filteredData;
}
