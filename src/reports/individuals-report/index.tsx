import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DataTable } from "@/reports/individuals-report/_components/data-table";
import {
  columns,
  individualsReportProp,
} from "@/reports/individuals-report/_components/columns";
import { useEffect, useState } from "react";
import useHttp from "@/lib/use-http.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useParams } from "react-router-dom";
import { filterData } from "@/lib/filterIndividuals.ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar.tsx";

export default function IndividualsReport() {
  const { id } = useParams();
  const [originalData, setOriginalData] = useState<individualsReportProp[]>([]);
  const [filteredData, setFilteredData] = useState<individualsReportProp[]>([]);

  const [showTotalResponse, setShowTotalResponse] =
    useState<CheckedState>(false);
  const [individual, setIndividual] = useState<string | undefined>();
  const [program, setProgram] = useState<string | undefined>();
  const [birth, setBirth] = useState<Date | undefined>();

  const { fetchData, loading } = useHttp<any, individualsReportProp[]>();

  const filter = () => {
    const filteredData = filterData({
      individual,
      program,
      birth,
      originalData: originalData ?? [],
    });

    setFilteredData(filteredData);
  };

  const getData = async () => {
    const res = (await fetchData(
      `report/${id}`,
      "GET",
    )) as individualsReportProp[];
    setOriginalData(res);
    setFilteredData(res);
  };

  const clearFilters = () => {
    setIndividual(undefined);
    setProgram(undefined);
    setBirth(undefined);
    setFilteredData(originalData);
    setShowTotalResponse(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Individuals Report</h2>
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search by Individual"
          value={individual}
          onChange={(e) => setIndividual(e.target.value)}
          className="w-[220px]"
        />
        <Input
          placeholder="Search by Program/Site"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="w-[260px]"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !birth && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {birth ? format(birth, "PPP") : <span>Pick a date and time</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={birth}
              onSelect={setBirth}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="flex items-center space-x-2">
          <span>Total Responses</span>
          <Checkbox
            checked={showTotalResponse}
            onCheckedChange={(checked) => setShowTotalResponse(checked)}
          />
        </div>
        <Button type="button" onClick={filter}>
          Apply Filter
        </Button>
        <Button type="button" onClick={clearFilters} variant="outline">
          Clear Filter
        </Button>
      </div>
      {showTotalResponse && (
        <div className="text-sm text-muted-foreground">
          Total: {filteredData.length}
        </div>
      )}
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
