import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

// Mock data for Goals and Progress report
const goalsData = [
  {
    individual: "Abu, Aladdin",
    program: "Richter Street",
    goalType: "Finances",
    goalTitle: "",
    personalOutcome: "People choose personal goals",
    startDate: "6/13/2024",
    completionDate: "",
    discontinuedDate: "",
    goalDescription:
      "Aladdin would like to be connected to funding to decrease their need to engage in theft...",
  },
];

// Filter options
const filters = [
  'Program/Residence',
  'Goal Type',
  'Start Date',
  'Completion Date',
  'Discontinued Date',
];

export default function GoalsProgressReport() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  // Filtering logic based on search
  const filteredGoals = goalsData.filter((goal) =>
    goal.individual.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 w-full">
      <h2 className="text-3xl font-semibold text-gray-900">Goals and Progress Report</h2>
      
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
        <SelectTrigger className="w-1/3">{selectedFilter || 'Filter by'}</SelectTrigger>
        <SelectContent>
          {filters.map((filter) => (
            <SelectItem key={filter} value={filter}>{filter}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Report Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Individual</th>
              <th className="border px-4 py-2">Program/Residence</th>
              <th className="border px-4 py-2">Goal Type</th>
              <th className="border px-4 py-2">Goal Title</th>
              <th className="border px-4 py-2">Personal Outcome</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">Completion Date</th>
              <th className="border px-4 py-2">Discontinued Date</th>
              <th className="border px-4 py-2">Goal Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredGoals.map((goal, index) => (
              <tr key={index} className="border">
                <td className="border px-4 py-2">{goal.individual}</td>
                <td className="border px-4 py-2">{goal.program}</td>
                <td className="border px-4 py-2">{goal.goalType}</td>
                <td className="border px-4 py-2">{goal.goalTitle}</td>
                <td className="border px-4 py-2">{goal.personalOutcome}</td>
                <td className="border px-4 py-2">{goal.startDate}</td>
                <td className="border px-4 py-2">{goal.completionDate}</td>
                <td className="border px-4 py-2">{goal.discontinuedDate}</td>
                <td className="border px-4 py-2">{goal.goalDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
