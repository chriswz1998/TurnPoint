import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { rentSupplementsProps } from "@/reports/rent-supplement-request/_components/columns.tsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (isoString: Date): string => {
  const date = new Date(isoString);
  return date
    .toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\//g, "-");
};

export const searchByIndividual = (
  data: rentSupplementsProps[],
  keyword: string,
) => {
  const lowerKeyword = keyword.trim().toLowerCase();
  return data.filter((item) =>
    item.Individual.toLowerCase().includes(lowerKeyword),
  );
};
