import { rentSupplementsProps } from "@/reports/rent-supplement-request/_components/columns.tsx";

export type FilterType =
  | "region" // Total responses by region/community
  | "category" // Total responses per category/option selected
  | "category-program-region" // Total responses per category/PROGRAM selected filtered by region/community
  | "sum" // Sum of total amount
  | "sum-filtered"; // Total sum filtered by Rent Supplement category/Program and by community

export function filterData(
  data: rentSupplementsProps[],
  filter: FilterType,
): any {
  switch (filter) {
    case "region":
      return groupBy(data, "programOrSite");

    case "category":
      return groupBy(data, "Notes");

    case "category-program-region":
      return groupByMultiple(data, ["Notes", "programOrSite"]);

    case "sum":
      // 假设你每条记录有个 subsidyAmount 字段
      return data.reduce(
        (acc, curr) => acc + (parseFloat((curr as any).subsidyAmount) || 0),
        0,
      );

    case "sum-filtered":
      return groupAndSum(data, ["Notes", "programOrSite"]);

    default:
      return data;
  }
}

function groupBy(
  data: rentSupplementsProps[],
  key: keyof rentSupplementsProps,
) {
  const result: Record<string, number> = {};
  data.forEach((item) => {
    const k = item[key] || "Unknown";
    result[k] = (result[k] || 0) + 1;
  });
  return result;
}

function groupByMultiple(
  data: rentSupplementsProps[],
  keys: (keyof rentSupplementsProps)[],
) {
  const result: Record<string, number> = {};
  data.forEach((item) => {
    const compositeKey = keys.map((k) => item[k] || "Unknown").join(" | ");
    result[compositeKey] = (result[compositeKey] || 0) + 1;
  });
  return result;
}

function groupAndSum(
  data: rentSupplementsProps[],
  keys: (keyof rentSupplementsProps)[],
) {
  const result: Record<string, number> = {};
  data.forEach((item) => {
    const compositeKey = keys.map((k) => item[k] || "Unknown").join(" | ");
    const amount = parseFloat((item as any).subsidyAmount) || 0;
    result[compositeKey] = (result[compositeKey] || 0) + amount;
  });
  return result;
}
