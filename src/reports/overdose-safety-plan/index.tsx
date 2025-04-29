/**
 * OverdoseSafetyPlan
 *
 * This component renders a complete report view for the Overdose Safety Plan data.
 * It provides functionality to:
 * - Fetch report data from an API based on a report ID (`id` from URL parameters).
 * - Filter entries by `Individual` and/or `Program or Site` using a form.
 * - Toggle between a data table view and a bar chart visualization.
 * - Display total number of filtered responses if requested.
 * - Clear filters and reset the dataset easily.
 *
 * Features:
 * - Dynamic data loading using a custom `useHttp` hook.
 * - Form validation and handling via `react-hook-form` and `zod`.
 * - Chart rendering using `recharts`.
 * - Data table rendering using `@tanstack/react-table` wrapped in a custom `DataTable` component.
 * - Responsive and user-friendly UI with sticky header and flexible filtering.
 *
 * Components used:
 * - `Form`, `Input`, `Button`, `Checkbox` (UI components)
 * - `DataTable` for table view
 * - `OverdoseSafetyPlanCharts` for chart view
 *
 * Notes:
 * - If loading is in progress, displays a "Loading..." message.
 * - `SwitchToChart` toggles between table and chart views.
 * - `Total Responses` checkbox shows the number of entries currently displayed after filtering.
 */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

import { DataTable } from "@/reports/overdose-safety-plan/_components/data-table";
import {
  columns,
  overdoseSafetyPlanProps,
} from "@/reports/overdose-safety-plan/_components/columns";
import OverdoseSafetyPlanCharts from "@/reports/overdose-safety-plan/_components/chart";
import useHttp from "@/lib/use-http.ts";
import { CheckedState } from "@radix-ui/react-checkbox";
import { filterData } from "@/reports/overdose-safety-plan/lib/filterOverdoseSafetyPlan.ts";

const FormSchema = z.object({
  individual: z.string().optional(),
  programOrSite: z.string().optional(),
});

export default function OverdoseSafetyPlan() {
  const { id } = useParams();
  const [chartType, setChartType] = useState(false);
  const [tableData, setTableData] = useState<overdoseSafetyPlanProps[]>([]);
  const [originalData, setOriginalData] = useState<
    overdoseSafetyPlanProps[] | null
  >(null);
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

  const { fetchData, loading } = useHttp<any, overdoseSafetyPlanProps[]>();

  // Schema for form validation using Zod
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      individual: "",
      programOrSite: "",
    },
  });

  // Applies filtering to table data based on form values
  const filter = () => {
    const { individual, programOrSite } = form.getValues();
    const filteredData = filterData({
      data: originalData ?? [],
      individual,
      programOrSite,
    });
    setTableData(filteredData);
  };

  // Resets the filters and restores original data
  const clearFilter = () => {
    form.reset({
      individual: "",
      programOrSite: "",
    });
    setShowTotalResponse(false);
    setTableData(originalData ?? []);
  };

  // Toggles between table view and chart view
  const SwitchToChart = () => {
    setChartType(!chartType);
  };

  // Fetches the report data from the API
  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET"
    )) as overdoseSafetyPlanProps[];
    setOriginalData(res);
    setTableData(res);
  };

  // Fetch data on mount or when the `id` changes
  useEffect(() => {
    getData();
  }, [id]);

  // Render loading state while fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  // Main component render
  return (
    <div className="p-4 space-y-4">
      <div className="sticky top-0 left-0 bg-white z-50 shadow-md p-4 flex flex-col justify-center space-y-4">
        <h2 className="text-2xl font-semibold">Overdose Safety Plan Report</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(filter)}
            className="flex flex-wrap gap-4 items-end"
          >
            <FormField
              control={form.control}
              name="individual"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Search by Individual" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="programOrSite"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Search by Program or Site" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <span>Total Responses</span>
              <Checkbox
                checked={showTotalResponse}
                onCheckedChange={(checked) =>
                  setShowTotalResponse(checked === true)
                }
              />
            </div>

            <Button type="submit">Apply Filter</Button>
            <Button type="button" onClick={clearFilter} variant="outline">
              Clear Filter
            </Button>
            <Button type="button" variant="ghost" onClick={SwitchToChart}>
              Switch to Chart
            </Button>
          </form>
        </Form>
      </div>

      {chartType ? (
        <OverdoseSafetyPlanCharts data={tableData} />
      ) : (
        <DataTable columns={columns} data={tableData} />
      )}

      {showTotalResponse && (
        <div>
          <p>Total responses: {tableData.length}</p>
        </div>
      )}
    </div>
  );
}
