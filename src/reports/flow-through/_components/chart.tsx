/**
 * FlowThroughCharts Component
 * 
 * This component renders two bar charts displaying the number of individuals 
 * who started and exited a program per month. It processes the provided data
 * to generate these charts, using the Recharts library for visualization.
 *
 * The data is passed as a prop, where each data item should include:
 * - `startDate`: The start date of an individual in the program.
 * - `exitDate`: The exit date of an individual from the program (optional).
 *
 * It generates two datasets:
 * 1. The number of individuals who started in each month.
 * 2. The number of individuals who exited in each month (with "No Exit Date" for missing `exitDate`).
 * 
 * The component uses the following steps:
 * 1. Processes the data to map the counts for each month.
 * 2. Displays the data in two separate bar charts using `BarChart` from Recharts.
 * 3. Each chart shows counts for the last 12 months by default.
 * 
 * Modifications:
 * - To change the time period shown, modify the `.slice(-12)` method for the `recentStartData` and `recentExitData` arrays.
 * - To adjust the chart layout or style, change the properties in the `BarChart` or other Recharts components.
 * - To include additional data in the charts, update the `data` prop structure to include the required fields.
 * 
 * Example data format:
 * {
 *   startDate: '2021-01-15',
 *   exitDate: '2021-02-20', // Optional
 * }
 */

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { flowThroughDataProps } from "@/reports/flow-through/_components/columns.tsx";

interface Props {
  data: flowThroughDataProps[]; // Array of flow through data items
}

export default function FlowThroughCharts({ data }: Props) {
  // Memoize the data transformation to avoid recalculating on every render
  const { startChartData, exitChartData } = useMemo(() => {
    const startMap: Record<string, number> = {}; // Store start count per month
    const exitMap: Record<string, number> = {}; // Store exit count per month

    // Loop through data to create start and exit maps by month
    data.forEach((item) => {
      const start = new Date(item.startDate);
      const startKey = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`;
      startMap[startKey] = (startMap[startKey] || 0) + 1;

      // If exitDate exists, count the exits for that month
      if (item.exitDate) {
        const exit = new Date(item.exitDate);
        const exitKey = `${exit.getFullYear()}-${String(exit.getMonth() + 1).padStart(2, "0")}`;
        exitMap[exitKey] = (exitMap[exitKey] || 0) + 1;
      } else {
        // If no exitDate exists, mark as "NaT" (Not a Time)
        exitMap["NaT"] = (exitMap["NaT"] || 0) + 1;
      }
    });

     // Helper function to convert map to sorted array
    const toSortedArray = (map: Record<string, number>) =>
      Object.entries(map)
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => (a.month > b.month ? 1 : -1));

    return {
      startChartData: toSortedArray(startMap), // Prepare start chart data
      exitChartData: toSortedArray(exitMap), // Prepare exit chart data
    };
  }, [data]); // Recalculate when data changes

  // Function to format month for display in chart
  const formatMonth = (month: string) => {
    if (month === "NaT") return "No Exit Date"; // Special case for "NaT"
    const [year, m] = month.split("-");
    return `${m}/${year.slice(-2)}`; // Format as MM/YY
  };

  // Slice to show only the most recent 12 months of data
  const recentStartData = startChartData.slice(-12);
  const recentExitData = exitChartData.slice(-12);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-10">
      {/* Start Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number Of Individuals Started Per Month
        </h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={recentStartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10 }}
                tickFormatter={formatMonth}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f87171" name="Count" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">
              📊 <strong>Start Date Count per Month</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {recentStartData.map(({ month, count }) => (
                <li key={month}>
                  {formatMonth(month)}: {count} person(s)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Exit Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number Of Individuals Exited Per Month
        </h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={recentExitData}
              margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10 }}
                tickFormatter={formatMonth}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#60a5fa" name="Count" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">
              📅 <strong>Exit Date Count per Month</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {recentExitData.map(({ month, count }) => (
                <li key={month}>
                  {month === "NaT" ? (
                    <>
                      <code>NaT</code> means individuals{" "}
                      <strong>without exit date</strong>
                    </>
                  ) : (
                    `${formatMonth(month)}: ${count} person(s)`
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
