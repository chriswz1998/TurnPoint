// GoalsAndProgressCharts.tsx
//
// This component is used to render charts representing the number of goals started, completed, 
// and discontinued per month. It receives data as a prop and processes it to create three 
// separate charts using Recharts' BarChart component. Each chart displays the count of goals 
// for each month, with separate charts for "Started," "Completed," and "Discontinued" goals.
//
// To modify:
// - You can change the appearance of the charts, such as the colors used for the bars.
// - You can adjust the data being passed to the component, making sure it matches the required format.
// - You can add or remove additional chart types or modify the chart styling as needed.

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
import { goalsProgressProps } from "@/reports/goals-and-progress/_components/columns";

// Defining the expected props for the component
interface Props {
  data: goalsProgressProps[];  
}

// The main component for rendering the charts
export default function GoalsAndProgressCharts({ data }: Props) {
    // useMemo is used to memoize the processed data to avoid recalculating on every render
  const { startChartData, completionChartData, discontinuedChartData } = useMemo(() => {
    const startMap: Record<string, number> = {};
    const completionMap: Record<string, number> = {};
    const discontinuedMap: Record<string, number> = {};

        // Looping over the data to populate the charts with monthly counts
    data.forEach((item) => {
            // Processing startDate for each goal
      const start = new Date(item["startDate"]);
      const startKey = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`;
      startMap[startKey] = (startMap[startKey] || 0) + 1;

            // Processing completionDate for each goal
      if (item["completionDate"]) {
        const completion = new Date(item["completionDate"]);
        const completionKey = `${completion.getFullYear()}-${String(completion.getMonth() + 1).padStart(2, "0")}`;
        completionMap[completionKey] = (completionMap[completionKey] || 0) + 1;
      }

            // Processing discontinuedDate for each goal
      if (item["discontinuedDate"]) {
        const discontinued = new Date(item["discontinuedDate"]);
        const discontinuedKey = `${discontinued.getFullYear()}-${String(discontinued.getMonth() + 1).padStart(2, "0")}`;
        discontinuedMap[discontinuedKey] = (discontinuedMap[discontinuedKey] || 0) + 1;
      }
    });

    // Utility function to convert the map into an array and sort it by month
    const toSortedArray = (map: Record<string, number>) =>
      Object.entries(map)
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => (a.month > b.month ? 1 : -1));

    // Returning the data for each chart
    return {
      startChartData: toSortedArray(startMap),
      completionChartData: toSortedArray(completionMap),
      discontinuedChartData: toSortedArray(discontinuedMap),
    };
  }, [data]);

  // Function to format the month in a readable format (e.g., 03/21)
  const formatMonth = (month: string) => {
    const [year, m] = month.split("-");
    return `${m}/${year.slice(-2)}`;
  };

  // Extracting the most recent 12 months of data
  const recentStartData = startChartData.slice(-12);
  const recentCompletionData = completionChartData.slice(-12);
  const recentDiscontinuedData = discontinuedChartData.slice(-12);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-10">
      {/* Start Date Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number Of Goals Started Per Month
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
        </div>
      </div>

      {/* Completion Date Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number Of Goals Completed Per Month
        </h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={recentCompletionData}
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
        </div>
      </div>

      {/* Discontinued Date Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Number Of Goals Discontinued Per Month
        </h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={recentDiscontinuedData}
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
              <Bar dataKey="count" fill="#4ade80" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
