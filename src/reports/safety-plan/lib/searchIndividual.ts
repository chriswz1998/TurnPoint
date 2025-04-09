import { safetyPlanProps } from "@/reports/safety-plan/_components/columns.tsx";

export const searchByIndividual = (
  data: safetyPlanProps[],
  keyword: string,
) => {
  const lowerKeyword = keyword.trim().toLowerCase();
  return data.filter((item) =>
    item.individual?.toLowerCase().includes(lowerKeyword),
  );
};
