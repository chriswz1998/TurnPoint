/**
 * Goals Progress Report Component
 * 
 * This component displays a Goals and Progress report with filtering options based on various date ranges 
 * (start date, completion date, and discontinued date) and search criteria (individual, program/site, goal type).
 * The report data is fetched from an API, and users can filter the data dynamically using forms and date pickers.
 * Users can also toggle between a table view and a chart view (Bar charts) for visualizing the goals' progress.
 * 
 * Key Features:
 * - Filters the report data based on user input (start date, completion date, discontinued date).
 * - Allows users to search goals by individual, program/site, or goal type.
 * - Switches between table and chart view to visualize data.
 * - Displays the total number of responses when enabled.
 * - Clears the selected filters and resets the form.
 * 
 * How to modify:
 * - To change the filtering logic, modify the `filterData` function imported from `@/lib/filterGoalsAndProgressLogic`.
 * - To update the fields that users can filter by, modify the `FormSchema` object.
 * - To customize the columns or add more data points in the table, update the `columns` array imported from 
 *   `@/reports/goals-and-progress/_components/columns`.
 * - To modify the visual representation of the chart, update the `GoalsAndProgressCharts` component.
 */

import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/goals-and-progress/_components/data-table.tsx";
import {
  columns,
  goalsProgressProps,
} from "@/reports/goals-and-progress/_components/columns";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { cn } from "@/lib/utils.ts";
import { Calendar } from "@/components/ui/calendar.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { useParams } from "react-router-dom";
import { CheckedState } from "@radix-ui/react-checkbox";
import GoalsAndProgressCharts from "./_components/chart";

import { filterData } from "@/lib/filterGoalsAndProgressLogic";

// Component for displaying and filtering the Goals and Progress Report
export default function GoalsProgressReport() {
  const { id } = useParams();
  const [startDate, setStartDate] = useState<Date>();
  const [discontinuedDate, setDiscontinuedDate] = useState<Date>();
  const [completionDate, setCompletionDate] = useState<Date>();
  const [originalData, setOriginalData] = useState<
    goalsProgressProps[] | null
  >();
  const [tableData, setTableData] = useState<goalsProgressProps[] | null>();
  const [chartType, setChartType] = useState<boolean>(false);

  const { fetchData, loading } = useHttp<any, goalsProgressProps[]>();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

    // Function for applying filters
  const filter = () => {
    console.log("Filtering with:");
    console.log("Start Date: ", startDate);
    console.log("Completion Date: ", completionDate);
    console.log("Discontinued Date: ", discontinuedDate);
    console.log("Form Data: ", form.getValues());

    const filteredData = filterData({
      startDate,
      completionDate,
      discontinuedDate,
      form,
      originalData: originalData ?? [],
    });

    console.log("Filtered data: ", filteredData);
    setTableData(filteredData); // Set the filtered data to the table
  };

  // Zod schema for validating form data
  const FormSchema = z.object({
    individual: z.string(),
    programSite: z.string(),
    goalType: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema), // Resolve the validation using Zod
    defaultValues: {
      individual: undefined,
      programSite: undefined,
      goalType: undefined,
    },
  });

  // Functions for submitting form data for different filters
  const onSubmitIndividual = (data: z.infer<typeof FormSchema>) => {
    console.log("Searching by individual: ", data);
  };

  const onSubmitProgram = (data: z.infer<typeof FormSchema>) => {
    console.log("Searching by program/site: ", data);
  };

  const onSubmitGoalType = (data: z.infer<typeof FormSchema>) => {
    console.log("Goal Type Submitted:", data);
  };

   // Clear all filters and reset the form
  const clearFilter = async () => {
    setTableData(originalData); // Reset the table data to the original (unfiltered) data
    setStartDate(undefined); // Clear start date filter
    setDiscontinuedDate(undefined); // Clear discontinued date filter
    setCompletionDate(undefined); // Clear completion date filter
    setShowTotalResponse(false); // Reset the checkbox state
    form.reset({ // Reset the form to its default state
      individual: "",
      programSite: "",
      goalType: "",
    });
  };

  // Toggle between showing the table and the chart view
  const SwitchToChart = () => {
    setChartType(!chartType);
  };

  // Fetch data from the server using the report ID
  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET",
    )) as goalsProgressProps[];

    console.log("Fetched Data: ", res);
    console.log("ID:", id);

    // Set the fetched data to the tableData and originalData states
    setTableData(Array.isArray(res) ? res : []);
    setOriginalData(Array.isArray(res) ? res : []);
  };

  useEffect(() => {
    getData();
  }, []);

  // Show loading message while data is being fetched
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Goals And Progress Report</h2>
      <div className="flex justify-between">
        <div className="flex flex-col space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitIndividual)}
              className="flex items-center space-x-0"
            >
              <FormField
                control={form.control}
                name="individual"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="search individual" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {/* Form for filtering by program or site */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitProgram)}
              className="flex items-center space-x-0"
            >
              <FormField
                control={form.control}
                name="programSite"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="search program/site" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {/* Form for filtering by goal type */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitGoalType)}
              className="flex items-center space-x-0"
            >
              <FormField
                control={form.control}
                name="goalType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="search goal type" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="flex items-center space-x-[160px]">
          <div className="flex flex-col space-y-4">
            {/* Date picker for start date */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground",
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
                    !completionDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {completionDate ? (
                    format(completionDate, "PPP")
                  ) : (
                    <span>Pick a completion date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={completionDate}
                  onSelect={setCompletionDate}
                  initialFocus
                />
              </PopoverContent>

              {/* Date picker for completion date */}
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !discontinuedDate && "text-muted-foreground",
                  )}
                >
                  {/* Date picker for discontinued date */}
                  <CalendarIcon />
                  {discontinuedDate ? (
                    format(discontinuedDate, "PPP")
                  ) : (
                    <span>Pick a discontinued date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={discontinuedDate}
                  onSelect={setDiscontinuedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center space-x-2">
            <span>Total Responses</span>
            <Checkbox
              checked={showTotalResponse}
              onCheckedChange={(checked) => setShowTotalResponse(checked)}
            />
          </div>

          {/* Buttons to apply, clear filters, and switch between table/chart */}
          <Button onClick={filter}>Apply Filter</Button>
          <Button onClick={clearFilter} variant="outline">
            Clear Filter
          </Button>
          <Button
            variant={"ghost"}
            className="inline-block"
            onClick={SwitchToChart}
          >
            Switch to Chart
          </Button>
        </div>
      </div>

{/* Render either the chart or the data table */}
      {chartType ? (
        <GoalsAndProgressCharts data={tableData ?? []} />
      ) : (
        <DataTable columns={columns} data={tableData ?? []} />
      )}

{/* Display the total number of responses if checkbox is checked */}
      {showTotalResponse && (
        <div className="mt-4">Total responses: {tableData?.length}</div>
      )}
    </div>
  );
}
