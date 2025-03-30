import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

// Mock data for Shelter Diversion Follow-Up Log
const shelterData = [
  {
    community: "West Kelowna",
    currentGoals: "Housing Natural Supports",
    currentGoalsDescription: "fssf",
    diversionCost: "",
    diversionMethod: "",
    divertedTo: "",
    evictionPrevention: "Yes",
    followUpLog:
      "Kody Woodmass (Feb 10 2025 10:48 am): zcxcz  Kody Woodmass (Feb 10 2025 10:48 am): zccxzczc  Kody Woodmass (Feb 10 2025 10:44 am): sfdfdsfd",
    initialFollowUpDate: "",
    referralLog: "Kody Woodmass (Feb 10 2025 10:44 am): aac",
    successfulDiversion: "Yes",
  },
  // Add more shelter diversion entries as needed
];

const filterOptions = ["Community"];

export default function ShelterDiversionFollowUpLog() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredCommunity, setFilteredCommunity] = useState("");

  // Filtered data logic
  const filteredData = shelterData.filter((row) =>
    row.community.toLowerCase().includes(filteredCommunity.toLowerCase())
  );

  // Calculate total successful diversions and eviction prevention
  const totalSuccessfulDiversions = filteredData.filter(
    (row) => row.successfulDiversion === "Yes"
  ).length;

  const totalEvictionPrevention = filteredData.filter(
    (row) => row.evictionPrevention === "Yes"
  ).length;

  return (
    <div className="p-6 space-y-6 w-full">
      <h2 className="text-3xl font-semibold text-gray-900">Shelter Diversion Follow-Up Log</h2>

      {/* Community Filter Input */}
      <Input
        type="text"
        placeholder="Filter by Community..."
        value={filteredCommunity}
        onChange={(e) => setFilteredCommunity(e.target.value)}
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
                <th className="border p-2">Community</th>
                <th className="border p-2">Current Goals</th>
                <th className="border p-2">Current Goals Description</th>
                <th className="border p-2">Diversion Cost</th>
                <th className="border p-2">Diversion Method</th>
                <th className="border p-2">Diverted To</th>
                <th className="border p-2">Eviction Prevention</th>
                <th className="border p-2">Follow Up Log</th>
                <th className="border p-2">Initial Follow Up Date</th>
                <th className="border p-2">Referral Log</th>
                <th className="border p-2">Successful Diversion</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-2">{row.community}</td>
                  <td className="border p-2">{row.currentGoals}</td>
                  <td className="border p-2">{row.currentGoalsDescription}</td>
                  <td className="border p-2">{row.diversionCost}</td>
                  <td className="border p-2">{row.diversionMethod}</td>
                  <td className="border p-2">{row.divertedTo}</td>
                  <td className="border p-2">{row.evictionPrevention}</td>
                  <td className="border p-2">{row.followUpLog}</td>
                  <td className="border p-2">{row.initialFollowUpDate}</td>
                  <td className="border p-2">{row.referralLog}</td>
                  <td className="border p-2">{row.successfulDiversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Statistics</h3>
        <p>Total Successful Diversions: {totalSuccessfulDiversions}</p>
        <p>Total Eviction Prevention: {totalEvictionPrevention}</p>
      </div>
    </div>
  );
}
