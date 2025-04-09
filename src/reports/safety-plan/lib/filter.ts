import { safetyPlanProps } from "@/reports/safety-plan/_components/columns.tsx";

export type FilterType = "Program/Site";

export function filterData(data: safetyPlanProps[], filter: FilterType): any {
  switch (filter) {
    case "Program/Site":
      return groupBy(data, "programOrSite");

    default:
      return data;
  }
}

function groupBy(data: safetyPlanProps[], key: keyof safetyPlanProps) {
  const result: Record<string, number> = {};
  data.forEach((item) => {
    const k = item[key] || "Unknown";
    result[k] = (result[k] || 0) + 1;
  });
  return result;
}
