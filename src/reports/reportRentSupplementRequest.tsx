import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// Mock data for the report
const mockData = [
  { individual: "Anderson, Jimmy (test)", notes: "", program: "Program A" },
  { individual: "Doe, Jane", notes: "Pending approval", program: "Program B" },
  { individual: "Smith, John", notes: "Approved", program: "Program A" }
];

// Available filter types
const filters = [
  "Total responses by region/community",
  "Total responses per category/option selected",
  "Total responses per category/PROGRAM selected filtered by region/community",
  "Sum of total amount",
  "Total sum filtered by Rent Supplement category/Program and by community"
];

export default function RentSupplementRequest() {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [search, setSearch] = useState("");

  // Function to handle filter selection
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    // Logic to fetch filtered data from backend will go here
  };

  return (
    <div className="p-6 w-full">
      <Card>
        <CardContent>
          <CardTitle>Rent Supplement Request Report</CardTitle>
          <p className="text-gray-600 mt-2">Filter and analyze rent supplement requests.</p>
          
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search Individual or Program..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4"
          />

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Report Table */}
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Individual</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Program or Site</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData
                .filter((item) =>
                  item.individual.toLowerCase().includes(search.toLowerCase()) ||
                  item.program.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.individual}</TableCell>
                    <TableCell>{item.notes}</TableCell>
                    <TableCell>{item.program}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
