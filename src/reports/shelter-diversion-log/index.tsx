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
import { DataTable } from "@/reports/shelter-diversion-log/_components/data-table";
import {
  columns,
  shelderDiversionFollowupProps,
} from "@/reports/shelter-diversion-log/_components/columns";
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
  individual: z.string(),
});

export default function ShelterDiversion() {
  const [selectedFilter, setSelectedFilter] = useState("");

  const { fetchData, data } = useHttp<any, shelderDiversionFollowupProps[]>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      individual: undefined,
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
      <h2 className="text-2xl font-semibold">Shelter Diversion Follow-Up Report</h2>
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
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
