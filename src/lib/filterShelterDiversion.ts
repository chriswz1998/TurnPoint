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
}

export function filterData({
  form,
  originalData = []
}: FilterParams): shelderDiversionFollowupProps[] {
  const formValues = form.getValues();
  const { 
    community, 
    evictionPrevention, 
    successfullDiversion,
    initialFollowUpDate 
  } = formValues || {};

  return originalData.filter((item) => {
    const matchesCommunity = !community || 
      (item.community || '').toLowerCase().includes(community.toLowerCase());

    const matchesEviction = !evictionPrevention ||
      (item.evictionPrevention || '').toLowerCase().includes(evictionPrevention.toLowerCase());

    const matchesDiversion = !successfullDiversion ||
      (item.successfullDiversion || '').toLowerCase().includes(successfullDiversion.toLowerCase());

    const matchesFollowUpDate = !initialFollowUpDate || 
      (item.initialFollowUpDate && 
       new Date(item.initialFollowUpDate) >= new Date(initialFollowUpDate));

    return matchesCommunity && matchesEviction && matchesDiversion && matchesFollowUpDate;
  });
}