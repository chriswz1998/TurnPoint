import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

// Mock data for the Overdose Safety Plan report
const overdoseSafetyPlanData = [
  {
    individual: "Martian, Marvin The",
    programOrSite: "Polson",
    crisisContacts: "",
    riskFactors: "",
    riskReductionActions: "",
    staffMember: "Morgen Poitras",
    supportPeople: "",
    todaysDate: "14/6/2024",
    wellnessHabits: "",
  },
];

// Filter options
const filterOptions = [
  'Program/Site',
];

export default function OverdoseSafetyPlanReport() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  // Filter logic
  const filteredOverdoseSafetyPlanData = overdoseSafetyPlanData.filter((plan) =>
    plan.individual.toLowerCase().includes(search.toLowerCase()) ||
    plan.programOrSite.toLowerCase().includes(selectedFilter.toLowerCase()) // Filter by selected program or site
  );

  return (
    <div className="p-6 space-y-6 w-full">
      <h2 className="text-3xl font-semibold text-gray-900">Overdose Safety Plan Report</h2>
      
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
                <th className="border p-2">Crisis Contacts</th>
                <th className="border p-2">Risk Factors</th>
                <th className="border p-2">Risk Reduction Actions</th>
                <th className="border p-2">Staff Member</th>
                <th className="border p-2">Support People</th>
                <th className="border p-2">Today's Date</th>
                <th className="border p-2">Wellness Habits</th>
              </tr>
            </thead>
            <tbody>
              {filteredOverdoseSafetyPlanData.map((plan, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-2">{plan.individual}</td>
                  <td className="border p-2">{plan.programOrSite}</td>
                  <td className="border p-2">{plan.crisisContacts}</td>
                  <td className="border p-2">{plan.riskFactors}</td>
                  <td className="border p-2">{plan.riskReductionActions}</td>
                  <td className="border p-2">{plan.staffMember}</td>
                  <td className="border p-2">{plan.supportPeople}</td>
                  <td className="border p-2">{plan.todaysDate}</td>
                  <td className="border p-2">{plan.wellnessHabits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
