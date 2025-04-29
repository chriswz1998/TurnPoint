/**
 * SafetyPlan Component
 * 
 * This component displays a safety plan report and allows users to search for safety plans based on 
 * the individual's name and program/site. The data is fetched from an API, and the user can filter 
 * the results using two search inputs: one for the individual and another for the program or site. 
 * The results are displayed in a table format, and there is also a clear button to reset the search filters.
 * 
 * How to modify:
 * - To add more search filters, expand the `searchSafetyPlans` function's `options` argument and adjust the 
 *   search logic accordingly.
 * - You can change the columns displayed in the table by modifying the `columns` array imported from the 
 *   `columns.tsx` file.
 * - Modify the endpoint for fetching data by changing the URL in the `getData` function.
 */

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/safety-plan/_components/data-table";
import {
  columns,
  safetyPlanProps,
} from "@/reports/safety-plan/_components/columns";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { useParams } from "react-router-dom";
import { searchSafetyPlans } from "@/reports/safety-plan/lib/searchSafetyPlans.ts";

export default function SafetyPlan() {
    // Retrieve the 'id' parameter from the URL (used for fetching the specific report)
  const { id } = useParams();

    // State variables for search inputs and data management
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [searchProgramOrSite, setSearchProgramOrSite] = useState<
    string | undefined
  >();
  const [originalData, setOriginalData] = useState<safetyPlanProps[] | null>();
  const [tableData, setTableData] = useState<safetyPlanProps[] | null>();

    // Use custom hook for fetching data
  const { fetchData, loading } = useHttp<any, safetyPlanProps[]>();

    // Search function to filter safety plans based on search criteria
  const search = () => {
    const result = searchSafetyPlans(originalData ?? [], {
      individual: searchValue,
      programOrSite: searchProgramOrSite,
    });
    setTableData(result);
  };

    // Clear search function to reset all filters
  const clearSearch = async () => {
    setTableData(originalData);
    setSearchValue(undefined);
    setSearchProgramOrSite(undefined);
  };

    // Fetch safety plan data from the API
  const getData = async () => {
    const res = (await fetchData(`report/${id}`, "GET")) as safetyPlanProps[];

        // Set the fetched data to state
    setTableData(res);
    setOriginalData(res);
  };

    // Fetch data when the component mounts
  useEffect(() => {
    getData();
  }, []);

    // Display a loading state while data is being fetched
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Safety Plan Report</h2>
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Input
            className={"w-72"}
            placeholder="search individual"
            value={searchValue ?? ""}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Input
            className={"w-72"}
            placeholder="search program / site"
            value={searchProgramOrSite ?? ""}
            onChange={(e) => setSearchProgramOrSite(e.target.value)}
          />
          <Button onClick={search}>Search</Button>
          <Button onClick={clearSearch} variant="outline">
            Clear Search
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={tableData || []} />
    </div>
  );
}
