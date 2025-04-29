/**
 * This file handles filtering incident report data based on various form parameters.
 * The filtering checks against the following criteria:
 * - `individual`: Filters incidents involving a specific individual.
 * - `programOrSite`: Filters incidents occurring at a specific program or site.
 * - `degreeOfInjury`: Filters incidents by the degree of injury (e.g., minor, severe).
 * - `typeOfInjury`: Filters incidents by the type of injury (e.g., cut, burn).
 * - `typeOfSeriousIncident`: Filters incidents by the type of serious incident (e.g., fall, collision).
 * - `dateAndTimeOfIncident`: Filters incidents that occurred on or after a specific date and time.
 * 
 * The function accepts the following parameters:
 * - `dateAndTimeOfIncident`: The date and time from which incidents should be filtered.
 * - `form`: A `UseFormReturn` object that contains form values for filtering (individual, programOrSite, degreeOfInjury, typeOfInjury, typeOfSeriousIncident).
 * - `originalData`: The raw incident report data to be filtered.
 * 
 * The function will return an array of filtered incident reports based on the provided parameters.
 * 
 * To modify the filtering:
 * - Adjust the field names or the criteria used in the `.filter()` methods.
 * - If more filtering conditions are needed, they can be added to this logic.
 * 
 * The function will return:
 * - `filteredData`: The filtered array of incident reports based on the applied criteria.
 */

import { incidentReportProps } from "@/reports/incident-report/_components/columns.tsx";
import { UseFormReturn } from "react-hook-form";

interface FilterParams {
  dateAndTimeOfIncident?: Date;
  form: UseFormReturn<{
    individual: string;
    programOrSite: string;
    degreeOfInjury: string;
    typeOfInjury: string;
    typeOfSeriousIncident: string;
    dateAndTimeOfIncident?: Date; 
  }>;
  originalData: incidentReportProps[];
}

export function filterData({
  dateAndTimeOfIncident,
  form,
  originalData,
}: FilterParams): incidentReportProps[] {
  const { 
    individual,
    programOrSite,
    degreeOfInjury,
    typeOfInjury,
    typeOfSeriousIncident 
  } = form.getValues();

  let filteredData = [...(originalData || [])];

  // Filter by individual if specified
  if (individual) {
    filteredData = filteredData.filter(item =>
      item.individual?.toLowerCase().includes(individual.toLowerCase())
    );
  }

  // Filter by programOrSite if specified
  if (programOrSite) {
    filteredData = filteredData.filter(item =>
      item.programOrSite?.toLowerCase().includes(programOrSite.toLowerCase())
    );
  }

  // Filter by degreeOfInjury if specified
  if (degreeOfInjury) {
    filteredData = filteredData.filter(item =>
      item.degreeOfInjury?.toLowerCase().includes(degreeOfInjury.toLowerCase())
    );
  }

  // Filter by typeOfInjury if specified
  if (typeOfInjury) {
    filteredData = filteredData.filter(item =>
      item.typeOfInjury?.toLowerCase().includes(typeOfInjury.toLowerCase())
    );
  }

  // Filter by typeOfSeriousIncident if specified
  if (typeOfSeriousIncident) {
    filteredData = filteredData.filter(item =>
      item.typeOfSeriousIncident?.toLowerCase().includes(typeOfSeriousIncident.toLowerCase())
    );
  }

  // Filter by dateAndTimeOfIncident if specified
  if (dateAndTimeOfIncident) {
    const filterDate = new Date(dateAndTimeOfIncident);
    filteredData = filteredData.filter(item => {
      const incidentDate = new Date(item.dateAndTimeOfIncident);
      return incidentDate >= filterDate;
    });
  }

  return filteredData;
}