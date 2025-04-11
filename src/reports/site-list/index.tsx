import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { DataTable } from "@/reports/site-list/_components/data-table";
import {
  columns,
  siteListProps,
} from "@/reports/site-list/_components/columns";
import useHttp from "@/lib/use-http";
import { filterSiteListData } from "@/lib/filterSiteList.ts";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export default function SiteListReport() {
  const { id } = useParams();
  const [originalData, setOriginalData] = useState<siteListProps[] | null>();
  const [tableData, setTableData] = useState<siteListProps[] | null>();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

  const { fetchData, loading } = useHttp<any, siteListProps[]>();

  const filter = () => {
    const filteredData = filterSiteListData({
      form,
      originalData: originalData ?? [],
    });
    setTableData(filteredData);
  };

  const clearFilter = () => {
    form.reset({ site: "" });
    setTableData(originalData ?? []);
  };

  const FormSchema = z.object({
    site: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      site: "",
    },
  });

  const getData = async () => {
    const res = (await fetchData(`report/${id}`, "GET")) as siteListProps[];

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
      <div className="sticky top-0 left-0 bg-white z-50 flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold">Site List Report</h2>

        <div className="flex flex-wrap gap-4 items-center">
          <Input
            placeholder="Filter by Site"
            value={form.watch("site")}
            onChange={(e) => form.setValue("site", e.target.value)}
            className="w-[240px]"
          />

          {/* Show total count */}
          <div className="flex items-center space-x-2">
            <span>Total Responses</span>
            <Checkbox
              checked={showTotalResponse}
              onCheckedChange={(checked) => setShowTotalResponse(checked)}
            />
          </div>

          {/* Actions */}
          <Button onClick={filter}>Apply Filter</Button>
          <Button variant="outline" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
      </div>

      {/* Visualization */}
      <DataTable columns={columns} data={tableData ?? []} />
      <div>{showTotalResponse && <p>total is {tableData?.length}</p>}</div>
    </div>
  );
}
