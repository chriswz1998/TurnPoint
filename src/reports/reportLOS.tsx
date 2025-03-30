import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

// Mock data for the table
const data = [
  {
    endDateTime: '27/1/2025',
    individual: 'Anderson, Jimmy (test)',
    managerApproved: 'Not answered',
    programOrSite: '',
    rationaleLOS: '',
    reasonRestriction: 'cxcds',
    reviewTPCSLOS: 'No',
    staffReporting: '',
    startDateTime: '24/1/2025',
    relatedToIncident: 'No',
  },
];

// Filter options
const filters = [
  'Total Responses by Program/Site',
  'Avg Length of LOS by Program/Site',
  'Critical Incidents % by Program/Site',
  'Total & Avg LOS by Program/Site',
  //'Managers Pending Client Meeting',
  //'Manager-Client Follow-Ups',
  //'Comparison: Follow-Ups & Total Clients',
  'Total & Avg Review for TPCS LOS',
];

export default function LossOfServiceReport() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  // Filtering logic (to be implemented in backend call)
  const filteredData = data.filter((row) =>
    row.individual.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 w-full">
      <h2 className="text-3xl font-semibold text-gray-900">Loss of Service Report</h2>
      
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
      <Card>
        <CardContent>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Individual</th>
                <th className="border p-2">End Date/Time</th>
                <th className="border p-2">Manager Approved</th>
                <th className="border p-2">Program/Site</th>
                <th className="border p-2">Rationale for LOS &gt; 48h</th>
                <th className="border p-2">Reason for Restriction</th>
                <th className="border p-2">Review for TPCS LOS</th>
                <th className="border p-2">Staff Reporting</th>
                <th className="border p-2">Start Date/Time</th>
                <th className="border p-2">Critical Incident</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-2">{row.individual}</td>
                  <td className="border p-2">{row.endDateTime}</td>
                  <td className="border p-2">{row.managerApproved}</td>
                  <td className="border p-2">{row.programOrSite}</td>
                  <td className="border p-2">{row.rationaleLOS}</td>
                  <td className="border p-2">{row.reasonRestriction}</td>
                  <td className="border p-2">{row.reviewTPCSLOS}</td>
                  <td className="border p-2">{row.staffReporting}</td>
                  <td className="border p-2">{row.startDateTime}</td>
                  <td className="border p-2">{row.relatedToIncident}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
