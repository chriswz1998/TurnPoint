import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const reportNames = [
  "Intake Report",
  "Flow Through Report",
  "Loss of Service Report",
  "Rent Supplement Request Report",
  "Goals and Progress Report",
  "Safety Plan Report",
  "Overdose Safety Plan",
  "Incident Report",
  "Individuals Report",
  "Shelter Diversion Follow-up Log Report",
  "Site List Report"
];

const filterOptions = [
  "Filter 1", "Filter 2", "Filter 3", "Filter 4", "Filter 5",
  "Filter 6", "Filter 7", "Filter 8", "Filter 9", "Filter 10"
];

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const filteredReports = reportNames.filter((report) =>
    report.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
        />

        {/* Styled Dropdown */}
        <div className="relative w-1/4">
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="appearance-none flex text-black h-9 items-center justify-between whitespace-nowrap rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
          >
            {filterOptions.map((option, index) => (
              <option key={index} value={option} className="bg-white text-black">
                {option}
              </option>
            ))}
          </select>
          {/* Icon */}
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="overflow-y-auto max-h-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold text-center mb-4">{report}</h3>
              <img
                src={`/images/${report.replace(/\s+/g, "-").toLowerCase()}.png`}
                alt={report}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-sm text-gray-600">
                Brief description of the report goes here.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
