// filterData.ts
import { useForm, UseFormReturn } from "react-hook-form";
import { individualsReportProp } from "@/reports/individuals-report/_components/columns.tsx";

interface FilterParams {
  form: UseFormReturn<{
    individual?: string;
    site?: string;
  }>;
  originalData: individualsReportProp[];
}

export function filterData({
  form,
  originalData,
}: FilterParams): individualsReportProp[] {
  let filteredData = originalData ?? [];

  if (form.getValues().individual) {
    filteredData = filteredData.filter((data) =>
      data.individual
        .toLowerCase()
        .includes(form.getValues().individual!.toLowerCase())
    );
  }

  if (form.getValues().site) {
    filteredData = filteredData.filter((data) =>
      data.site
        .toLowerCase()
        .includes(form.getValues().site!.toLowerCase())
    );
  }

  return filteredData;
}
