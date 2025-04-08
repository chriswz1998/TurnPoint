import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/rent-supplement-request/_components/data-table";
import {
  columns,
  rentSupplementsProps,
} from "@/reports/rent-supplement-request/_components/columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { useParams } from "react-router-dom";
import { searchByIndividual } from "@/lib/utils.ts";
import {
  filterData,
  FilterType,
} from "@/reports/rent-supplement-request/lib/filter.ts";

const filters = [
  {
    label: "Total responses by region/community",
    value: "region",
  },
  {
    label: "Total responses per category/option selected",
    value: "category",
  },
  {
    label:
      "Total responses per category/PROGRAM selected filtered by region/community",
    value: "category-program-region",
  },
  {
    label: "Sum of total amount",
    value: "sum",
  },
  {
    label:
      "Total sum filtered by Rent Supplement category/Program and by community",
    value: "sum-filtered",
  },
];

export default function RentSupplementReport() {
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [originalData, setOriginalData] = useState<
    rentSupplementsProps[] | null
  >();
  const [tableData, setTableData] = useState<rentSupplementsProps[] | null>();

  const { fetchData, loading } = useHttp<any, rentSupplementsProps[]>();

  const search = () => {
    const result = searchByIndividual(originalData ?? [], searchValue ?? "");
    setTableData(result);
  };

  const filterTable = (value: FilterType) => {
    const filtered = filterData(originalData ?? [], value);
    setTableData(filtered);
  };

  const clearSearch = async () => {
    setTableData(originalData);
    setSearchValue(undefined);
  };

  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET",
    )) as rentSupplementsProps[];
    console.log(res);
    console.log(id);

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
      <h2 className="text-2xl font-semibold">Rent Supplement Request Report</h2>
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Input
            className={"w-72"}
            placeholder="search individual"
            value={searchValue ?? ""}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button onClick={search}>Search</Button>
          <Button onClick={clearSearch} variant="outline">
            Clear Search
          </Button>
        </div>
        <div>
          <Select onValueChange={filterTable}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DataTable columns={columns} data={tableData ?? []} />
    </div>
  );
}
