/**
 * ShelterDiversionChart Component
 * 
 * This component takes data related to shelter diversion and displays three separate bar charts:
 * - Eviction Prevention by Program/Site
 * - Successful Diversion by Program/Site
 * - Community Engagement by Program/Site
 * 
 * The data is grouped by program or site, and each chart visualizes the count of occurrences 
 * for eviction prevention, successful diversion, and community engagement, respectively.
 * 
 * How to modify:
 * - You can customize the chart colors by changing the `color` argument in each `renderChart` call.
 * - To add more metrics to visualize, you can modify the `useMemo` hook to include additional logic 
 *   for processing more data fields, and then update the `renderChart` calls accordingly.
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
import { shelderDiversionFollowupProps } from "@/reports/shelter-diversion-log/_components/columns.tsx";

// Props interface for passing data into the component
interface Props {
  data: shelderDiversionFollowupProps[];
}

export default function ShelterDiversionChart({ data }: Props) {
    // Memoized function to process the data and group it by program
  const { evictionData, diversionData, communityData } = useMemo(() => {
    const evictionMap: Record<string, number> = {};
    const diversionMap: Record<string, number> = {};
    const communityMap: Record<string, number> = {};

    data.forEach((item) => {
      const program = item.community || "Unknown";
      // Increment the count for eviction prevention
      if (item.evictionPrevention) {
        evictionMap[program] = (evictionMap[program] || 0) + 1;
      }
      // Increment the count for successful diversion
      if (item.successfulDiversion) {
        diversionMap[program] = (diversionMap[program] || 0) + 1;
      }
      // Increment the count for community engagement
      if (item.community) {
        communityMap[program] = (communityMap[program] || 0) + 1;
      }
    });

    return {
      // Convert each map into an array of objects with program and count
      evictionData: Object.entries(evictionMap).map(([program, count]) => ({
        program,
        count,
      })),
      diversionData: Object.entries(diversionMap).map(([program, count]) => ({
        program,
        count,
      })),
      communityData: Object.entries(communityMap).map(([program, count]) => ({
        program,
        count,
      })),
    };
  }, [data]); // Recalculate the data whenever the input 'data' changes

  // Helper function to render each chart
  const renderChart = (
    chartData: { program: string; count: number }[],
    title: string,
    color: string
  ) => (
    <div className="space-y-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
      <div className="bg-white rounded-2xl shadow p-4">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="program"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill={color} name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // Rendering three charts for eviction prevention, successful diversion, and community engagement
  return (
    <div className="p-4 max-w-4xl mx-auto">
      {renderChart(
        evictionData,
        "Eviction Prevention by Program/Site",
        "#f87171"
      )}
      {renderChart(
        diversionData,
        "Successful Diversion by Program/Site",
        "#60a5fa"
      )}
      {renderChart(
        communityData,
        "Community Engagement by Program/Site",
        "#34d399"
      )}
    </div>
  );
}
