/**
 * This file is responsible for filtering shelter diversion follow-up data based on form input values and additional optional filters.
 * The filtering criteria are:
 * - `community`: Filters based on the community field.
 * - `evictionPrevention`: Filters based on the eviction prevention field.
 * - `successfullDiversion`: Filters based on whether the diversion was successful.
 * - `initialFollowUpDate`: Filters based on the initial follow-up date.
 * - `divertedTo`: Filters based on where the individual was diverted.
 * - `diversionMethod`: Filters based on the method used for diversion.
 * 
 * The function works with the following parameters:
 * - `form`: A `UseFormReturn` object from `react-hook-form` containing form values for filtering (community, evictionPrevention, etc.).
 * - `originalData`: The raw shelter diversion follow-up data to be filtered.
 * - `divertedTo` (optional): Filters based on where the individual was diverted.
 * - `diversionMethod` (optional): Filters based on the method of diversion.
 * 
 * The function filters the `originalData` based on the provided form values and optional filters. 
 * If no values are provided, no filtering is applied to the respective field.
 * 
 * Modifications:
 * - To add new filters, simply extend the `FilterParams` interface and add the respective filter condition in the `.filter()` logic.
 * - If you need to change how a field is filtered (e.g., using a different comparison method or type), adjust the logic within the filter conditions.
 * 
 * The function returns:
 * - `shelterDiversionFollowupProps[]`: The filtered shelter diversion follow-up data array.
 */

import { UseFormReturn } from "react-hook-form";
import { shelderDiversionFollowupProps } from "../reports/shelter-diversion-log/_components/columns";

interface FilterParams {
  form: UseFormReturn<{
    community?: string;
    evictionPrevention?: string;
    successfullDiversion?: string;
    initialFollowUpDate?: Date;
  }>;
  originalData: shelderDiversionFollowupProps[];
  divertedTo?: string;
  diversionMethod?: string;
}

export function filterData({
  form,
  originalData = [],
  divertedTo,
  diversionMethod,
}: FilterParams): shelderDiversionFollowupProps[] {
  const formValues = form.getValues();
  const {
    community,
    evictionPrevention,
    successfullDiversion,
    initialFollowUpDate,
  } = formValues || {};

  return originalData.filter((item) => {
    // Check if the community field matches (case-insensitive)
    const matchesCommunity =
      !community ||
      (item.community || "").toLowerCase().includes(community.toLowerCase());

      // Check if the eviction prevention field matches (case-insensitive)
    const matchesEviction =
      !evictionPrevention ||
      (item.evictionPrevention || "")
        .toLowerCase()
        .includes(evictionPrevention.toLowerCase());

        // Check if the successful diversion field matches (case-insensitive)
    const matchesDiversion =
      !successfullDiversion ||
      (item.successfulDiversion || "")
        .toLowerCase()
        .includes(successfullDiversion.toLowerCase());

        // Check if the initial follow-up date matches (if provided)
    const matchesFollowUpDate =
      !initialFollowUpDate ||
      (item.initialFollowUpDate &&
        new Date(item.initialFollowUpDate) >= new Date(initialFollowUpDate));

        // Check if the divertedTo field matches (case-insensitive)
    const matchesDivertedTo =
      !divertedTo ||
      (item.divertedTo || "").toLowerCase().includes(divertedTo.toLowerCase());

      // Check if the diversionMethod field matches (case-insensitive)
    const matchesDiversionMethod =
      !diversionMethod ||
      (item.diversionMethod || "")
        .toLowerCase()
        .includes(diversionMethod.toLowerCase());

    return (
      matchesCommunity &&
      matchesEviction &&
      matchesDiversion &&
      matchesFollowUpDate &&
      matchesDivertedTo &&
      matchesDiversionMethod
    );
  });
}
