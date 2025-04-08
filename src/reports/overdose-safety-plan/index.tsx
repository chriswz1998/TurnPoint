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
  >();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

  const { fetchData, loading } = useHttp<any, overdoseSafetyPlanProps[]>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      individual: "",
      programOrSite: "",
    },
  });

  const filter = () => {
    const values = form.getValues();
    let filtered = originalData ?? [];

    if (values.individual) {
      filtered = filtered.filter((item: { individual: string; }) =>
        item.individual.toLowerCase().includes(values.individual!.toLowerCase())
      );
    }

    if (values.programOrSite) {
      filtered = filtered.filter((item: { programOrSite: string; }) =>
        item.programOrSite
          .toLowerCase()
          .includes(values.programOrSite!.toLowerCase())
      );
    }

    setTableData(filtered);
  };

  const clearFilter = async () => {
    setTableData(originalData ?? []);
    setShowTotalResponse(false);
    form.reset({
      individual: "",
      programOrSite: "",
    });
  };  

  const SwitchToChart = () => {
    setChartType(!chartType);
  };

  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET",
    )) as overdoseSafetyPlanProps[];

    console.log("Fetched Data: ", res);
    console.log("ID:", id);

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
      <div className="sticky top-0 left-0 bg-white z-50 flex flex-col justify-center space-y-4">
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
            <Button type="button" variant={"ghost"} onClick={SwitchToChart}>
              Switch to Chart
            </Button>
          </form>
        </Form>
      </div>

      {chartType ? (
        <OverdoseSafetyPlanCharts data={tableData ?? []} />
      ) : (
        <DataTable columns={columns} data={tableData ?? []} />
      )}

      {showTotalResponse && (
        <div>
          <p>Total responses: {tableData?.length}</p>
        </div>
      )}
    </div>
  );
}
