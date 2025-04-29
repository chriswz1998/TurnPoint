/**
 * Site List Report Component
 *
 * This component renders a site list report with the ability to filter the data based on user input.
 * It uses `react-hook-form` for form handling, `zod` for validation, and custom hooks for fetching data.
 * The table can be filtered by site name and housing type. The total number of responses can also be displayed.
 * 
 * How to modify:
 * - You can modify the filter fields by adjusting the `FormSchema` and adding/removing inputs.
 * - The data displayed in the table can be customized by modifying the `columns` and `siteListProps`.
 * - The component can be extended with more filters or additional functionality like sorting, pagination, etc.
 */

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

// Main component for the Site List Report
export default function SiteListReport() {
  // States for housing type, original data, table data, and checkbox state for total responses
  const [, setHousingType] = useState<string | undefined>();
  const { id } = useParams();
  const [originalData, setOriginalData] = useState<siteListProps[] | null>();
  const [tableData, setTableData] = useState<siteListProps[] | null>();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

  // Custom hook to fetch data
  const { fetchData, loading } = useHttp<any, siteListProps[]>();

  // Filter function to filter data based on form values
  const filter = () => {
    const filteredData = filterSiteListData({
      form,
      originalData: originalData ?? [],
    });
    setTableData(filteredData);
  };

  // Clear filter function to reset all filters
  const clearFilter = () => {
    form.reset({ site: "", housingType: "" });
    setTableData(originalData ?? []);
    setHousingType(undefined);
  };

  // Form schema definition using Zod for validation
  const FormSchema = z.object({
    site: z.string().optional(),
    housingType: z.string().optional(),
  });

  // Initialize react-hook-form with validation using Zod
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      site: "",
      housingType: "",
    },
  });

  // Fetch data on component mount
  const getData = async () => {
    const res = (await fetchData(`report/${id}`, "GET")) as siteListProps[];

    console.log("Fetched Data: ", res);
    console.log("ID:", id);

    setTableData(res);
    setOriginalData(res);
  };

  // Run getData on component mount
  useEffect(() => {
    getData();
  }, []);

  // Show loading state while fetching data
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="sticky top-0 left-0 bg-white z-50 flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold">Site List Report</h2>

        <div className="flex flex-wrap gap-4 items-center">
          {/* Filter by Site */}
          <Input
            placeholder="Filter by Site"
            value={form.watch("site")}
            onChange={(e) => form.setValue("site", e.target.value)}
            className="w-[240px]"
          />

          {/* Filter by Housing Type */}
          <Input
            className="w-72"
            placeholder="Filter by Housing Type"
            value={form.watch("housingType")}
            onChange={(e) => form.setValue("housingType", e.target.value)}
          />

          {/* Show total responses */}
          <div className="flex items-center space-x-2">
            <span>Total Responses</span>
            <Checkbox
              checked={showTotalResponse}
              onCheckedChange={(checked) => setShowTotalResponse(checked)}
            />
          </div>

          {/* Filter action buttons */}
          <Button onClick={filter}>Apply Filter</Button>
          <Button variant="outline" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
      </div>

      {/* DataTable component to display the filtered data */}
      <DataTable columns={columns} data={tableData ?? []} />

      {/* Display total response count if checkbox is checked */}
      <div>{showTotalResponse && <p>total is {tableData?.length}</p>}</div>
    </div>
  );
}
