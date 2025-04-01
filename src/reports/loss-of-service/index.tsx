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
import { DataTable } from "@/reports/loss-of-service/_components/data-table.tsx";
import {
  columns,
  losOfServiceProps,
} from "@/reports/loss-of-service/_components/columns.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select.tsx";
import { useState } from "react";

const data: losOfServiceProps[] = [
  {
    endDateTime: "27/1/2025",
    individual: "Anderson, Jimmy (test)",
    managerApproved: "Not answered",
    programOrSite: "",
    rationaleLOS: "",
    reasonRestriction: "cxcds",
    reviewTPCSLOS: "No",
    staffReporting: "",
    startDateTime: "24/1/2025",
    relatedToIncident: "No",
  },
];
const filters = [
  "Total Responses by Program/Site",
  "Avg Length of LOS by Program/Site",
  "Critical Incidents % by Program/Site",
  "Total & Avg LOS by Program/Site",
  //'Managers Pending Client Meeting',
  //'Manager-Client Follow-Ups',
  //'Comparison: Follow-Ups & Total Clients',
  "Total & Avg Review for TPCS LOS",
];
const FormSchema = z.object({
  individual: z.string(),
});

export default function LossOfServiceReport() {
  const [selectedFilter, setSelectedFilter] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      individual: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Flow-Through Report</h2>
      <div className="flex justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center space-x-4"
          >
            <FormField
              control={form.control}
              name="individual"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormItem>
                      <FormControl>
                        <Input placeholder="search individual" {...field} />
                      </FormControl>
                    </FormItem>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </form>
        </Form>
        <Select onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[260px]">
            {selectedFilter || "Filter by"}
          </SelectTrigger>
          <SelectContent>
            {filters.map((filter) => (
              <SelectItem key={filter} value={filter}>
                {filter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
