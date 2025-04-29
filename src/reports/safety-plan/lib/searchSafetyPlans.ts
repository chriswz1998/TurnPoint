/**
 * searchSafetyPlans Function
 * 
 * This function is designed to search through a list of safety plans based on optional filter criteria.
 * The function accepts an array of safety plan data and an object containing optional filter parameters 
 * for the `individual` and `programOrSite`. It filters the data to match these criteria and returns 
 * a list of safety plans that meet the search conditions.
 * 
 * How to modify:
 * - You can add more search filters by expanding the `options` object to include additional fields, 
 *   and then modify the filter logic accordingly.
 */

import { safetyPlanProps } from "@/reports/safety-plan/_components/columns.tsx";

// Function to search through safety plans based on optional parameters
export const searchSafetyPlans = (
  data: safetyPlanProps[],
  options: {
    individual?: string;
    programOrSite?: string;
  },
): safetyPlanProps[] => {
  const { individual, programOrSite } = options;

    // Normalize the search inputs to lowercase for case-insensitive comparison
  const individualKeyword = individual?.trim().toLowerCase() ?? "";
  const programKeyword = programOrSite?.trim().toLowerCase() ?? "";

  return data.filter((item) => {
        // Check if the individual field matches the search term, or if no search term, match all
    const matchesIndividual = individualKeyword
      ? item.individual?.toLowerCase().includes(individualKeyword)
      : true;

        // Check if the programOrSite field matches the search term, or if no search term, match all
    const matchesProgram = programKeyword
      ? item.programOrSite?.toLowerCase().includes(programKeyword)
      : true;

        // Return true if both conditions are met, meaning the item matches both filters
    return matchesIndividual && matchesProgram;
  });
};
