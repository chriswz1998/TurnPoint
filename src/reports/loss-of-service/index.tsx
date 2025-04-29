/**
 * Loss of Service Report Page
 *
 * This file defines the `LossOfServiceReport` React component, which displays a report of Loss of Service records.
 * Users can view the data in a table or switch to a chart view. Multiple filters are available to refine the results.
 *
 * Key Features:
 * - Fetches Loss of Service data from the server based on a `report/:id` route.
 * - Allows users to filter the table by Individual, Program/Site, Rationale, Reason for Restriction, 
 *   Related to Incident, and Review TPCSLOS fields.
 * - Supports switching between a table view (`DataTable`) and a chart view (`LosOfServiceCharts`).
 * - Users can apply multiple filters simultaneously or clear all filters at once.
 *
 * How to Modify:
 * - To add new filters, create new state variables and update the `filterTable` function.
 * - To change the server endpoint, modify the URL inside the `getData` function.
 * - To change the layout of filters or results, adjust the JSX structure within the main return block.
 * - To enhance loading behavior, replace the basic `loading...` text with a spinner or skeleton loaders.
 * - To add additional chart options, update `LosOfServiceCharts` to accept new chart types and modify `chartType` logic.
 */


import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/loss-of-service/_components/data-table.tsx";
import {
  columns,
  losOfServiceProps,
} from "@/reports/loss-of-service/_components/columns.tsx";
import LosOfServiceCharts from "@/reports/loss-of-service/_components/chart.tsx";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { useParams } from "react-router-dom";

export default function LossOfServiceReport() {
  const { id } = useParams();
  const [individualFilter, setIndividualFilter] = useState<
    string | undefined
  >();
  const [programSiteFilter, setProgramSiteFilter] = useState<
    string | undefined
  >();
  const [rationaleFilter, setRationaleFilter] = useState<string | undefined>();
  const [reasonForRestrictionFilter, setReasonForRestrictionFilter] = useState<
    string | undefined
  >();
  const [relatedToIncidentFilter, setRelatedToIncidentFilter] = useState<
    string | undefined
  >();
  const [reviewTPCSLOSFilter, setReviewTPCSLOSFilter] = useState<
    string | undefined
  >();
  const [originalData, setOriginalData] = useState<
    losOfServiceProps[] | null
  >();
  const [tableData, setTableData] = useState<losOfServiceProps[] | null>();
  const [chartType, setChartType] = useState<boolean>(false);

  const { fetchData, loading } = useHttp<any, losOfServiceProps[]>();

  // Apply filters to the data based on input values
  const filterTable = () => {
    let filteredData = originalData ?? [];

    // Apply filtering based on all the filter fields
    if (individualFilter) {
      filteredData = filteredData.filter((item) =>
        item.Individual?.toLowerCase().includes(individualFilter.toLowerCase())
      );
    }

    if (programSiteFilter) {
      filteredData = filteredData.filter((item) =>
        item.ProgramOrSite?.toLowerCase().includes(
          programSiteFilter.toLowerCase()
        )
      );
    }

    if (rationaleFilter) {
      filteredData = filteredData.filter((item) =>
        item.RationaleForLOSMore48Hours?.toLowerCase().includes(
          rationaleFilter.toLowerCase()
        )
      );
    }

    if (reasonForRestrictionFilter) {
      filteredData = filteredData.filter((item) =>
        item.ReasonAndRationaleForRestriction?.toLowerCase().includes(
          reasonForRestrictionFilter.toLowerCase()
        )
      );
    }

    if (relatedToIncidentFilter) {
      filteredData = filteredData.filter((item) =>
        item.WasThisRelatedToACriticalIncident?.toLowerCase().includes(
          relatedToIncidentFilter.toLowerCase()
        )
      );
    }

    if (reviewTPCSLOSFilter) {
      filteredData = filteredData.filter((item) =>
        item.ReviewForTPCSLOS?.toLowerCase().includes(
          reviewTPCSLOSFilter.toLowerCase()
        )
      );
    }

    setTableData(filteredData);
  };

  // Clear all filters and show original data
  const clearFilters = async () => {
    setTableData(originalData);
    setIndividualFilter(undefined);
    setProgramSiteFilter(undefined);
    setRationaleFilter(undefined);
    setReasonForRestrictionFilter(undefined);
    setRelatedToIncidentFilter(undefined);
    setReviewTPCSLOSFilter(undefined);
  };

  // Switch between table and chart views
  const SwitchToChart = () => {
    setChartType(!chartType);
  };

  // Fetch data from the server
  const getData = async () => {
    const res = (await fetchData(`report/${id}`, "GET")) as losOfServiceProps[];
    setTableData(res);
    setOriginalData(res);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Loss of Service Report</h2>
      <div className="flex flex-wrap gap-4">
        {/* First group of filters: Individual and Program/Site */}
        <div className="flex flex-col space-y-2 w-[calc(20%-1rem)]">
          <Input
            className="w-full"
            placeholder="Search by Individual"
            value={individualFilter ?? ""}
            onChange={(e) => setIndividualFilter(e.target.value)}
          />
          <Input
            className="w-full"
            placeholder="Filter by Program/Site"
            value={programSiteFilter ?? ""}
            onChange={(e) => setProgramSiteFilter(e.target.value)}
          />
        </div>

        {/* Second group of filters: Rationale and Reason for Restriction */}
        <div className="flex flex-col space-y-2 w-[calc(20%-1rem)]">
          <Input
            className="w-full"
            placeholder="Filter by Rationale"
            value={rationaleFilter ?? ""}
            onChange={(e) => setRationaleFilter(e.target.value)}
          />
          <Input
            className="w-full"
            placeholder="Filter by Reason for Restriction"
            value={reasonForRestrictionFilter ?? ""}
            onChange={(e) => setReasonForRestrictionFilter(e.target.value)}
          />
        </div>

        {/* Third group of filters: Related to Incident and Review TPCSLOS */}
        <div className="flex flex-col space-y-2 w-[calc(20%-1rem)]">
          <Input
            className="w-full"
            placeholder="Filter by Related to Incident"
            value={relatedToIncidentFilter ?? ""}
            onChange={(e) => setRelatedToIncidentFilter(e.target.value)}
          />
          <Input
            className="w-full"
            placeholder="Filter by Review TPCSLOS"
            value={reviewTPCSLOSFilter ?? ""}
            onChange={(e) => setReviewTPCSLOSFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        <Button onClick={filterTable}>Apply Filters</Button>
        <Button onClick={clearFilters} variant="outline">
          Clear Filters
        </Button>
      </div>

      {chartType ? (
        <LosOfServiceCharts data={tableData ?? []} filterKey={""} />
      ) : (
        <DataTable columns={columns} data={tableData ?? []} />
      )}
    </div>
  );
}
