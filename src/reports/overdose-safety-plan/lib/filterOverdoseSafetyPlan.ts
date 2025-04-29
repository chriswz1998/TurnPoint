/**
 * filterData
 *
 * Utility function to filter a list of `overdoseSafetyPlanProps` based on optional criteria:
 * - `individual`: Filters entries where the `Individual` field matches (case-insensitive, partial match).
 * - `programOrSite`: Filters entries where the `ProgramOrSite` field matches (case-insensitive, partial match).
 *
 * Parameters:
 * - `data`: Array of `overdoseSafetyPlanProps` to be filtered.
 * - `individual` (optional): A string to match against the `Individual` field.
 * - `programOrSite` (optional): A string to match against the `ProgramOrSite` field.
 *
 * Returns:
 * - A filtered array containing only the entries that match all provided criteria.
 *
 * Example:
 * ```ts
 * const filtered = filterData({
 *   data: overdosePlans,
 *   individual: "John",
 *   programOrSite: "Downtown Clinic",
 * });
 * ```
 *
 * Notes:
 * - If no filter value is provided for a field, that field is not used to restrict the results.
 * - Matching is case-insensitive and supports partial matches (i.e., `includes`).
 */

import { overdoseSafetyPlanProps } from "@/reports/overdose-safety-plan/_components/columns";

interface FilterOptions {
  data: overdoseSafetyPlanProps[];
  individual?: string;
  programOrSite?: string;
}

export function filterData({
  data,
  individual,
  programOrSite,
}: FilterOptions): overdoseSafetyPlanProps[] {
  return data.filter((item) => {
    const matchesIndividual = individual
      ? item.Individual?.toLowerCase().includes(individual.toLowerCase())
      : true;

    const matchesProgram = programOrSite
      ? item.ProgramOrSite?.toLowerCase().includes(programOrSite.toLowerCase())
      : true;

    return matchesIndividual && matchesProgram;
  });
}
