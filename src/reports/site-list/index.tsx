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
// import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/site-list/_components/data-table";
import {
  columns,
  siteListProps,
} from "@/reports/site-list/_components/columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select.tsx";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";

const filters = [
  "Program/Site",
];

const FormSchema = z.object({
  totalUnits: z.boolean().default(false),
});

export default function ShelterDiversion() {
  const [selectedFilter, setSelectedFilter] = useState("");

  const { fetchData, data } = useHttp<any, siteListProps[]>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      totalUnits: true,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  const getTableData = async () => {
    await fetchData("report/cm8oxyrzy0029r101mmwk52fw");
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Site List Report</h2>
      <div className="flex justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center space-x-4"
          >
            <FormField
              control={form.control}
              name="totalUnits"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormItem>
                      <FormControl>
                        {/* <Input placeholder="search individual" {...field} /> */}
                      </FormControl>
                    </FormItem>
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <Button type="submit">Search</Button> */}
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
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
