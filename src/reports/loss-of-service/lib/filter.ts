import { losOfServiceProps } from "@/reports/loss-of-service/_components/columns.tsx";

export function getFilteredLOSDataByType(
  value: string,
  data: losOfServiceProps[],
): losOfServiceProps[] {
  switch (value) {
    case "Total Responses by Program/Site":
      // Filter records where ProgramOrSite is not null
      return data.filter((item) => item.ProgramOrSite !== null);

    case "Avg Length of LOS by Program/Site":
      // Filter records where both Start and End dates exist
      return data.filter(
        (item) => item.StartDateTimeOfLOS && item.EndDateTimeOfLOS
      );

    case "Critical Incidents % by Program/Site":
      // Filter records related to critical incidents
      return data.filter(
        (item) =>
          item.ProgramOrSite &&
          item.WasThisRelatedToACriticalIncident === "Yes"
      );

    case "Total & Avg LOS by Program/Site":
      // Filter records where ProgramOrSite, Start, and End dates all exist
      return data.filter(
        (item) =>
          item.ProgramOrSite &&
          item.StartDateTimeOfLOS &&
          item.EndDateTimeOfLOS
      );

    case "Total & Avg Review for TPCS LOS":
      // Filter records where ReviewForTPCSLOS is "Yes"
      return data.filter(
        (item) => item.ProgramOrSite && item.ReviewForTPCSLOS === "Yes"
      );

    // New filter: Filter by "ProgramOrSite"
    case "Program/Site":
      return data.filter((item) => item.ProgramOrSite !== null);

    // New filter: Filter by "RationaleForLOSMore48Hours"
    case "Rationale":
      return data.filter(
        (item) => item.RationaleForLOSMore48Hours !== null
      );

    // New filter: Filter by "ReasonAndRationaleForRestriction"
    case "Reason for Restriction":
      return data.filter(
        (item) => item.ReasonAndRationaleForRestriction !== null
      );

    default:
      return [];
  }
}
