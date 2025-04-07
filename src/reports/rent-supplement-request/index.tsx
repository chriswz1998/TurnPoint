import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
} from "@/components/ui/select.tsx";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { useParams } from "react-router-dom";

const filters = [
  "Total responses by region/community",
  "Total responses per category/option selected",
  "Total responses per category/PROGRAM selected filtered by region/community",
  "Sum of total amount",
  "Total sum filtered by Rent Supplement category/Program and by community",
];

export default function RentSupplementReport() {
  const { id } = useParams();
  const [selectedFilter, setSelectedFilter] = useState("");

  const { fetchData, data } = useHttp<any, rentSupplementsProps[]>();

  const getData = async () => {
    const res = await fetchData(`report/${id}`);
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Rent Supplement Request Report</h2>
      <div className="flex justify-between">
        <Input
          placeholder="search individual"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <Button>Search</Button>
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
