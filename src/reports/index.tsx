/**
 * Reports Component
 *
 * This component fetches and displays a list of reports with pagination and search functionality.
 * The reports can be filtered by search keywords, and the results are paginated with a custom pagination component.
 * 
 * How to modify:
 * - You can modify the search functionality by adjusting the `toSearch` function or changing the `searchKey` logic.
 * - The data displayed in the table can be customized by modifying the `columns` and the structure of the `RequestDataProps`.
 * - The pagination behavior and the number of items per page can be adjusted in the `getData` function or `CustomPagination`.
 */

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

// Define types for the request data and pagination
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
  // States to handle search term and search key
  const [search, setSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");

  // Custom hook to fetch data from the server
  const { fetchData, data: res } = useHttp<any, RequestDataProps>();

  // Search function that triggers on click, ensuring a valid search term
  const toSearch = async () => {
    if (!search.trim()) {
      toast.error("Please enter a search keyword.");
      return;
    }
    setSearchKey(search);
    await getData(1, search);
  };

  // Clear the search term and reset the results
  const toClear = async () => {
    setSearch("");
    setSearchKey("");
    await getData(1, "");
  };

  // Fetch data based on the page number and search key
  const getData = async (page: number, key = searchKey) => {
    await fetchData("file/fileByPage", "POST", {
      page,
      pageSize: 10,
      searchKey: key,
    });
  };

  // Debounced page change to prevent too many requests on rapid pagination changes
  const debouncedPageChange = useMemo(() => {
    return debounce(async (page: number) => {
      await getData(page);
    }, 300);
  }, [searchKey]);

  // Initial data fetch when the component mounts
  useEffect(() => {
    return () => {
      debouncedPageChange.cancel();
    };
  }, [debouncedPageChange]);

  useEffect(() => {
    getData(1);
  }, []);

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

        {/* 搜索输入框和按钮 */}
        <div className="flex items-center justify-center space-x-4">
          <Input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={toSearch}>Search</Button>
          {searchKey ? (
            <Button variant="ghost" onClick={toClear}>
              Clear
            </Button>
          ) : null}
        </div>

        <DataTable columns={columns} data={res?.data ?? []} />

        <CustomPagination
          currentPage={res?.pagination.page ?? 1}
          totalPages={res?.pagination.totalPages ?? 1}
          onPageChange={(page) => debouncedPageChange(page)}
        />
      </div>
    </GradientBackgroundContainer>
  );
}
