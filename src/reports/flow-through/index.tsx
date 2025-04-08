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
import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { DataTable } from "@/reports/flow-through/_components/data-table.tsx";
import {
  columns,
  flowThroughDataProps,
} from "@/reports/flow-through/_components/columns.tsx";
import { useParams } from "react-router-dom";
import useHttp from "@/lib/use-http.ts";
import { useEffect, useState } from "react";
import { filterDataAndCount } from "@/lib/filterByDateRange.ts";

const FormSchema = z.object({
  totalResponse: z.boolean().default(false),
  dateRange: z
    .object({
      from: z.date({
        required_error: "Start date is required.",
      }),
      to: z.date({
        required_error: "End date is required.",
      }),
    })
    .refine((data) => data.from <= data.to, {
      message: "Start date must be before end date.",
      path: ["to"],
    }),
});

export default function FlowThroughReport() {
  const { id } = useParams();
  const [tableData, setTableData] = useState<flowThroughDataProps[] | null>();
  const [count, seCount] = useState<number | null>(0);
  const { fetchData, loading } = useHttp<any, flowThroughDataProps[]>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      totalResponse: true,
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
  });

  function onSubmit(filters: z.infer<typeof FormSchema>) {
    if (!tableData) return;
    const { filteredData, count } = filterDataAndCount(tableData, filters);
    setTableData(filteredData);
    seCount(count);
  }

  const clearFilter = async () => {
    await getData();
  };

  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET",
    )) as flowThroughDataProps[];

    console.log("Fetched Data: ", res);
    console.log("ID:", id);
    
    setTableData(res);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="sticky top-0 left-0 bg-white z-50">
        <h2 className="text-2xl font-semibold">Flow-Through Report</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center space-x-4"
          >
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalResponse"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Total Responses</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit">Apply Filter</Button>
            <Button onClick={clearFilter} variant={"ghost"}>
              Clear Filter
            </Button>
          </form>
        </Form>
      </div>
      <DataTable columns={columns} data={tableData ?? []} />
      <div> total is {count || 0}</div>
    </div>
  );
}
