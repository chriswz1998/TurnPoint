/**
 * This file handles filtering overdose safety plan data based on form input values.
 * The filtering criteria are:
 * - `individual`: Filters the data based on the individual name.
 * - `programOrSite`: Filters the data based on the program or site name.
 * 
 * The function works with the following parameters:
 * - `form`: A `UseFormReturn` object from `react-hook-form` that contains form values for filtering (individual and programOrSite).
 * - `originalData`: The raw overdose safety plan data to be filtered.
 * 
 * The function filters `originalData` based on the provided `individual` and `programOrSite` form values.
 * It returns the filtered data that matches the criteria.
 * 
 * Modifications:
 * - To adjust the filtering behavior, you can modify the filtering conditions (e.g., add more fields in the form, change `toLowerCase()` comparisons, etc.).
 * - If additional filters are required, simply extend the `FilterParams` interface and adjust the `.filter()` logic to accommodate those new fields.
 * 
 * The function returns:
 * - `overdoseSafetyPlanProps[]`: The filtered overdose safety plan data array.
 */

import { UseFormReturn } from "react-hook-form";
import { overdoseSafetyPlanProps } from "../reports/overdose-safety-plan/_components/columns";

interface FilterParams {
  form: UseFormReturn<{
    individual?: string;
    programOrSite?: string;
  }>;
  originalData: overdoseSafetyPlanProps[];
}

export function filterData({
  form,
  originalData = [],
}: FilterParams): overdoseSafetyPlanProps[] {
  // Check if the individual's name matches (case-insensitive)
  const { individual, programOrSite } = form.getValues();

  return (originalData || []).filter((item) => {
    // Check if the program or site name matches (case-insensitive)
    const matchesIndividual =
      !individual ||
      item.Individual?.toLowerCase().includes(individual.toLowerCase());

    const matchesProgram =
      !programOrSite ||
      item.ProgramOrSite?.toLowerCase().includes(programOrSite.toLowerCase());

      // Return true if both conditions are satisfied
    return matchesIndividual && matchesProgram;
  });
}
