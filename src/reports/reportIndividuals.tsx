import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

// Mock data for Individuals Report
const individualsData = [
  {
    clientPhoto: null,
    dateEntered: "",
    dateOfBirth: "9/6/2024",
    person: "Wooperson, Woop",
    programs: "",
    site: "Richter Street",
  },
  // Add more individuals as needed
];

const filterOptions = ["Site"];

export default function IndividualsReport() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  // Filtered data logic
  const filteredData = individualsData.filter((row) =>
    row.person.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate unique individuals per site
  const uniqueIndividualsPerSite = [...new Set(filteredData.map((row) => row.site))];

  return (
    <div className="p-6 space-y-6 w-full">
      <h2 className="text-3xl font-semibold text-gray-900">Individuals Report</h2>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search Individual..."
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
                <th className="border p-2">Client Photo</th>
                <th className="border p-2">Date Entered</th>
                <th className="border p-2">Date of Birth</th>
                <th className="border p-2">Individual</th>
                <th className="border p-2">Programs</th>
                <th className="border p-2">Site</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-2">
                    {row.clientPhoto ? (
                      <img src={row.clientPhoto} alt="Client" className="w-12 h-12 rounded-full" />
                    ) : (
                      "No Photo"
                    )}
                  </td>
                  <td className="border p-2">{row.dateEntered}</td>
                  <td className="border p-2">{row.dateOfBirth}</td>
                  <td className="border p-2">{row.person}</td>
                  <td className="border p-2">{row.programs}</td>
                  <td className="border p-2">{row.site}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Unique Individuals per Site */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Unique Individuals per Site</h3>
        <ul>
          {uniqueIndividualsPerSite.map((site, index) => {
            const uniqueIndividuals = [...new Set(filteredData.filter(row => row.site === site).map(row => row.person))];

            return (
              <div key={index}>
                <h4 className="font-semibold">{site}</h4>
                <ul>
                  {uniqueIndividuals.map((individual, idx) => (
                    <li key={idx}>{individual}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
