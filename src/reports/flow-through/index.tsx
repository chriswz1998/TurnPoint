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

const flowThroughData: flowThroughDataProps[] = [
  {
    individual: "John Doe",
    programOrSite: "Program A",
    startDate: "2023-01-01",
    exitDate: "2023-02-01",
    exitReason: "Graduated",
  },
  {
    individual: "Jane Smith",
    programOrSite: "Site B",
    startDate: "2023-03-01",
    exitDate: "2023-04-01",
    exitReason: "Transferred",
  },
];
const FormSchema = z.object({
  mobile: z.boolean().default(false).optional(),
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile: true,
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="p-4 space-y-4">
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
            name="mobile"
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
        </form>
      </Form>
      <DataTable columns={columns} data={flowThroughData} />
    </div>
  );
}
