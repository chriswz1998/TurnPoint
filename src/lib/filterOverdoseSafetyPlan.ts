import { UseFormReturn } from "react-hook-form";
import { overdoseSafetyPlanProps } from "../reports/overdose-safety-plan/_components/columns"

interface FilterParams {
  form: UseFormReturn<{
    individual?: string;
    programOrSite?: string;
  }>;
  originalData: overdoseSafetyPlanProps[];
}

export function filterOverdoseSafetyPlanData({
  form,
  originalData
}: FilterParams): overdoseSafetyPlanProps[] {
  const { individual, programOrSite } = form.getValues();
  
  let filteredData = [...(originalData || [])];

  if (individual) {
    filteredData = filteredData.filter(item =>
      item.individual?.toLowerCase().includes(individual.toLowerCase())
    );
  }

  if (programOrSite) {
    filteredData = filteredData.filter(item =>
      item.programOrSite?.toLowerCase().includes(programOrSite.toLowerCase())
    );
  }

  return filteredData;
}