import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

// Mock data for Incident Report
const incidentData = [
  {
    clientInvolved: "Nemo, Finding",
    dateTimeOfIncident: "24/1/2025",
    degreeOfInjury: "",
    programOrSite: "Richter Street",
    typeOfInjury: "",
    typeOfSeriousIncident: "",
  },
  // Add more data as needed
];

const filterOptions = [
  "Program/Site",
  "Degree of Injury",
  "Type of Injury",
  "Type of Serious Incident",
  "Date and Time of Incident",
];

export default function IncidentReport() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  // Filtered data logic
  const filteredData = incidentData.filter((row) =>
    row.clientInvolved.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 w-full">
      <h2 className="text-3xl font-semibold text-gray-900">Incident Report</h2>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search Client..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {/* Filter Dropdown */}
      <Select onValueChange={setSelectedFilter}>
        <SelectTrigger className="w-1/3">{selectedFilter || "Filter by"}</SelectTrigger>
        <SelectContent>
          {filterOptions.map((filter) => (
            <SelectItem key={filter} value={filter}>
              {filter}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Report Table */}
      <Card>
        <CardContent>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Client(s) Involved</th>
                <th className="border p-2">Date and Time of Incident</th>
                <th className="border p-2">Degree of Injury</th>
                <th className="border p-2">Program/Site</th>
                <th className="border p-2">Type of Injury</th>
                <th className="border p-2">Type of Serious Incident</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-2">{row.clientInvolved}</td>
                  <td className="border p-2">{row.dateTimeOfIncident}</td>
                  <td className="border p-2">{row.degreeOfInjury}</td>
                  <td className="border p-2">{row.programOrSite}</td>
                  <td className="border p-2">{row.typeOfInjury}</td>
                  <td className="border p-2">{row.typeOfSeriousIncident}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
