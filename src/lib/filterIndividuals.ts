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

import { individualsReportProp } from "@/reports/individuals-report/_components/columns.tsx";

interface FilterParams {
  individual?: string;
  program?: string;
  birth?: Date;
  originalData: individualsReportProp[];
}

export function filterData({
  individual,
  program,
  birth, // 你的拼写是 brith，我保留了原拼写，如果是 birth，需要改名
  originalData,
}: FilterParams): individualsReportProp[] {
  let filteredData = originalData ?? [];

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

  if (birth) {
    const brithDate = new Date(birth);
    const brithLocal = formatDateLocal(brithDate); // 选中的日期

    filteredData = filteredData.filter((data) => {
      if (!data.dateOfBirth) return false;
      const dataBirthLocal = formatDateLocal(data.dateOfBirth);
      return dataBirthLocal.includes(brithLocal);
    });
  }

  return filteredData;
}

const formatDateLocal = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-CA"); // e.g., "2024-08-26"
};
