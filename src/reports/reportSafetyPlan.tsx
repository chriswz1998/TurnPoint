import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

// Mock data for the Safety Plan report
const safetyPlanData = [
  {
    individual: "Nemo, Finding",
    programOrSite: "Richter Street",
    reasonsForLiving: "I love food",
    safeSpaces: "In the TV room or in the dining room with staff",
    selfSoothingStrategies: "Deep Breathing: Practice deep, slow breaths to calm the nervous system...",
    supportConnections: "Staff are usually helpful",
  },
];

// Filter options
const filterOptions = [
  'Program/Site',
];

export default function SafetyPlanReport() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  // Filter logic
  const filteredSafetyPlanData = safetyPlanData.filter((plan) =>
    plan.individual.toLowerCase().includes(search.toLowerCase()) ||
    plan.programOrSite.toLowerCase().includes(selectedFilter.toLowerCase()) // Filter by selected program or site
  );

  return (
    <div className="p-6 space-y-6 w-full">
      <h2 className="text-3xl font-semibold text-gray-900">Safety Plan Report</h2>
      
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search by Individual..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />
      
      {/* Filter Dropdown */}
      <Select onValueChange={setSelectedFilter}>
        <SelectTrigger className="w-1/3">{selectedFilter || 'Filter by'}</SelectTrigger>
        <SelectContent>
          {filterOptions.map((filter) => (
            <SelectItem key={filter} value={filter}>{filter}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Report Table */}
      <Card>
        <CardContent>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Individual</th>
                <th className="border p-2">Program/Site</th>
                <th className="border p-2">Reasons for Living</th>
                <th className="border p-2">Safe Spaces</th>
                <th className="border p-2">Self Soothing Strategies</th>
                <th className="border p-2">Support Connections</th>
              </tr>
            </thead>
            <tbody>
              {filteredSafetyPlanData.map((plan, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-2">{plan.individual}</td>
                  <td className="border p-2">{plan.programOrSite}</td>
                  <td className="border p-2">{plan.reasonsForLiving}</td>
                  <td className="border p-2">{plan.safeSpaces}</td>
                  <td className="border p-2">{plan.selfSoothingStrategies}</td>
                  <td className="border p-2">{plan.supportConnections}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
