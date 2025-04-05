import GradientBackgroundContainer from "@/components/GradientBackgroundContainer";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { columns } from "./_components/columns";
import { DataTable } from "@/reports/_components/data-table.tsx";
import useHttp from "@/lib/use-http.ts";
import { CustomPagination } from "@/reports/_components/table-pagination.tsx";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button.tsx";
import toast from "react-hot-toast";

export interface RequestDataProps {
  data: {
    id: string;
    filename: string;
    filetypeId: string;
    uploadtime: Date;
    filetype: {
      id: string;
      typename: string;
      createAt: Date;
    };
  }[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export default function Reports() {
  const [search, setSearch] = useState(""); // Store the search query input
  const [searchKey, setSearchKey] = useState(""); // Store the search query for filtering
  const { fetchData, data: res } = useHttp<any, RequestDataProps>();
  const [filteredData, setFilteredData] = useState(res?.data ?? []); // Store filtered data

  // Function to handle the search when the user clicks "Search"
  const toSearch = () => {
    if (!search.trim()) {
      toast.error("Please enter a search keyword.");
      return;
    }
    setSearchKey(search); // Set the search key
    getData(1, search); // Fetch data based on the search key
  };

  // Function to clear the search input and reset the data
  const toClear = async () => {
    setSearch(""); // Clear the search input
    setSearchKey(""); // Reset the search key
    await getData(1, ""); // Fetch data without filtering
  };

  // Function to fetch the data from the server
  const getData = async (page: number, key = searchKey) => {
    console.log("Searching with key:", key);
    await fetchData("file/fileByPage", "POST", {
      page,
      pageSize: 10,
      searchKey: key,
    });
  };

  // Debounced page change handler to avoid multiple requests on page change
  const debouncedPageChange = useMemo(() => {
    return debounce(async (page: number) => {
      await getData(page);
    }, 300);
  }, [searchKey]);

  useEffect(() => {
    return () => {
      debouncedPageChange.cancel(); // Cleanup debounced function on unmount
    };
  }, [debouncedPageChange]);

  // Fetch data on initial render
  useEffect(() => {
    getData(1);
  }, []);

  // Filter data only after the user clicks "Search"
  useEffect(() => {
    if (searchKey) {
      const result = res?.data?.filter((item) =>
        item.filename.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredData(result ?? []); // Update the filtered data
    }
  }, [searchKey, res?.data]);

  return (
    <GradientBackgroundContainer className="bg-white w-full h-full">
      <div className="p-4 w-full space-y-4">
        <div className="text-center">
          <h2 className=" text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Reports
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select a report to view details.
          </p>
        </div>

        {/* Search input and button */}
        <div className="flex items-center justify-center space-x-4">
          <Input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Update the search input
          />
          <Button onClick={toSearch}>Search</Button>
          {searchKey ? (
            <Button variant="ghost" onClick={toClear}>
              Clear
            </Button>
          ) : null}
        </div>

        {/* Display filtered data */}
        <DataTable columns={columns} data={filteredData ?? []} />

        {/* Pagination component */}
        <CustomPagination
          currentPage={res?.pagination.page ?? 1}
          totalPages={res?.pagination.totalPages ?? 1}
          onPageChange={(page) => debouncedPageChange(page)} // Handle page change
        />
      </div>
    </GradientBackgroundContainer>
  );
}