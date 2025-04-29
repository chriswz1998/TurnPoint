/**
 * RentSupplementReport Component
 * 
 * This component is designed to display a report for rent supplement requests. It allows users
 * to search for individuals by name, toggle the display of the total amount, and view the 
 * results in a data table format. It fetches the data from a server and provides search and 
 * reset functionality. The component makes use of various UI elements like buttons, checkboxes,
 * and input fields for user interaction. The report data is displayed in a table, and the 
 * total amount can be toggled on or off.
 * 
 * How to modify:
 * - To modify the search functionality, you can update the `searchByIndividual` function.
 * - To change the report columns, modify the `columns` array imported from `@/reports/rent-supplement-request/_components/columns`.
 * - You can adjust the endpoint for fetching data by modifying the URL in the `getData` function.
 */

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/rent-supplement-request/_components/data-table";
import {
  columns,
  rentSupplementsProps,
} from "@/reports/rent-supplement-request/_components/columns";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { useParams } from "react-router-dom";
import { searchByIndividual } from "@/reports/rent-supplement-request/lib/searchIndividual.ts";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export default function RentSupplementReport() {
  const { id } = useParams();

    // State variables to manage the search value, original data, table data, and the checkbox state
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [originalData, setOriginalData] = useState<
    rentSupplementsProps[] | null
  >();
  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);

  const [tableData, setTableData] = useState<rentSupplementsProps[] | null>();
  // Custom hook for handling HTTP requests
  const { fetchData, loading } = useHttp<any, rentSupplementsProps[]>();

   // Function to perform the search based on the search value
  const search = () => {
    const result = searchByIndividual(originalData ?? [], searchValue ?? "");
    setTableData(result);
  };

  // Function to clear the search and reset the table data
  const clearSearch = async () => {
    setTableData(originalData);
    setSearchValue(undefined);
  };

  // Function to fetch the data for the report based on the 'id' from the URL
  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET",
    )) as rentSupplementsProps[];
    console.log(res);
    console.log(id);

    // Set the fetched data into state
    setTableData(res);
    setOriginalData(res);
  };

  // Fetch the data when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  // Show a loading state while fetching data
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Rent Supplement Request Report</h2>
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Input
            className={"w-72"}
            placeholder="search individual"
            value={searchValue ?? ""}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <span>Sum of total amount</span>
            <Checkbox
              checked={showTotalResponse}
              onCheckedChange={setShowTotalResponse}
            />
          </div>
          <Button onClick={search}>Search</Button>
          <Button onClick={clearSearch} variant="outline">
            Clear Search
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={tableData ?? []} />
      <div>{showTotalResponse && <p>total is {tableData?.length}</p>}</div>
    </div>
  );
}
