// FlowThroughReport.tsx
//
// This file renders a flow-through report using a table or a chart depending on the user's preference.
// It allows the user to filter the data by program/site, exit reason, and date range (start and end dates).
// It fetches the data from an API, applies filters, and allows toggling between a table and chart view.
//
// To modify:
// - You can change the filtering options (program/site, exit reason, date range).
// - You can modify the appearance and behavior of the date pickers and filters.
// - You can add more filtering logic based on other criteria if needed.
// - You can modify how the data is presented in the chart and table components.
// - You can also update the structure of the data or API requests if required.

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { cn } from "@/lib/utils.ts";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { DataTable } from "@/reports/flow-through/_components/data-table.tsx";
import {
  columns,
  flowThroughDataProps,
} from "@/reports/flow-through/_components/columns.tsx";
import { useParams } from "react-router-dom";
import useHttp from "@/lib/use-http.ts";
import { useEffect, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import FlowThroughCharts from "@/reports/flow-through/_components/chart.tsx";
import { filterData } from "@/reports/flow-through/lib/filterByDateRange.ts";

// Main component for the flow-through report
export default function FlowThroughReport() {
    // States to manage the filter values and data
  const [searchProgramOrSite, setSearchProgramOrSite] = useState<
    string | undefined
  >();
  const [searchExitReason, setExitReason] = useState<string | undefined>();
  const { id } = useParams();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [originalData, setOriginalData] = useState<
    flowThroughDataProps[] | null
  >();
  const [tableData, setTableData] = useState<flowThroughDataProps[] | null>();
  const [chartType, setChartType] = useState<boolean>(false);

    // Custom hook to fetch data from the server
  const { fetchData, loading } = useHttp<any, flowThroughDataProps[]>();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

    // Filter function to apply filters on the data
  const filter = () => {
    setTableData(
      filterData(originalData ?? [], {
        from: startDate,
        to: endDate,
        programOrSite: searchProgramOrSite,
        exitReason: searchExitReason,
      })
    );
  };

    // Clear all filters and reset the data
  const clearFilter = async () => {
    setTableData(originalData);
    setStartDate(undefined);
    setEndDate(undefined);
    setShowTotalResponse(false);
    setSearchProgramOrSite(undefined);
    setExitReason(undefined);
  };

    // Toggle between table and chart view
  const SwitchToChart = () => {
    setChartType(!chartType);
  };

    // Fetch data from the API when the component mounts
  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET"
    )) as flowThroughDataProps[];
    setTableData(res);
    setOriginalData(res);
  };

    // useEffect hook to trigger data fetching on component mount
  useEffect(() => {
    getData();
  }, []);

    // Show a loading message if the data is being fetched
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="sticky top-0 left-0 bg-white z-50 flex flex-col justify-center space-y-4">
        <h2 className="text-2xl font-semibold">Flow-Through Report</h2>
        {/* Input fields for searching program or site and exit reason */}
        {/*{JSON.stringify(tableData)}*/}
        <div className="flex items-center space-x-4">
          <Input
            className="w-72"
            placeholder="Search by Program/Site"
            value={searchProgramOrSite ?? ""}
            onChange={(e) => setSearchProgramOrSite(e.target.value)}
          />
          <Input
            className="w-72"
            placeholder="Search by Exit Reason"
            value={searchExitReason ?? ""}
            onChange={(e) => setExitReason(e.target.value)}
          />
           {/* Date picker for start date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Pick a start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {endDate ? (
                  format(endDate, "PPP")
                ) : (
                  <span>Pick a end date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex items-center space-x-2">
            <span>Total Responses</span>
            <Checkbox
              checked={showTotalResponse}
              onCheckedChange={(checked) => setShowTotalResponse(checked)}
            />
          </div>
          {/* Buttons to apply filters, clear filters, and toggle chart/table view */}
          <Button onClick={filter}>Apply Filter</Button>
          <Button onClick={clearFilter} variant="outline">
            Clear Filter
          </Button>
          <Button variant={"ghost"} onClick={SwitchToChart}>
            Switch to Chart
          </Button>
        </div>
      </div>
      {/* Display either the table or chart based on the toggle */}
      {chartType ? (
        <FlowThroughCharts data={tableData ?? []} />
      ) : (
        <DataTable columns={columns} data={tableData ?? []} />
      )}
      {/* Show the total number of responses if the checkbox is checked */}
      <div>{showTotalResponse && <p>total is {tableData?.length}</p>}</div>
    </div>
  );
}
