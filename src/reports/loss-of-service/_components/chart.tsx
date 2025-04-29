/**
 * Loss of Service Chart Component
 * 
 * This component displays a bar chart and a summary list for the Loss of Service data, with aggregations based on
 * a provided filter key. The bar chart visualizes the aggregated data, while the summary list provides detailed 
 * information for each program/site, showing the calculated value for the selected metric.
 * 
 * Key Features:
 * - Displays a bar chart visualizing aggregated data.
 * - Shows a summary list detailing each program/site's values based on the selected metric.
 * - The filter key determines which data is aggregated and which metric is used for the Y-axis.
 * 
 * How to modify:
 * - To change the chart appearance, modify the `BarChart`, `XAxis`, `YAxis`, and other `recharts` components.
 * - To customize the way data is aggregated, adjust the `getAggregatedChartData` function.
 * - To change which data is displayed or the chart's behavior, update the `getYAxisKeyByFilter` function.
 */

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
import { losOfServiceProps } from "@/reports/loss-of-service/_components/columns.tsx";
import {
  getAggregatedChartData,
  getYAxisKeyByFilter,
} from "@/reports/loss-of-service/lib/getAggregatedChartData.ts";

interface Props {
  data: losOfServiceProps[]; // Data for the chart (list of loss of service details)
  filterKey: string; // External filter key used to aggregate data and determine Y-axis label
}

export default function LosOfServiceCharts({ data, filterKey }: Props) {
    // Get aggregated data based on the filterKey and the provided data
  const chartData = getAggregatedChartData(filterKey, data);

    // Get the Y-axis key and label based on the filterKey
  const { key: yKey, label: yLabel } = getYAxisKeyByFilter(filterKey);

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-10">
      {/* Chart */}
      <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <ResponsiveContainer width={"100%"} height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
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
            <Bar dataKey={yKey} fill="#60a5fa" name={yLabel} />
          </BarChart>
        </ResponsiveContainer>

        {/* Summary List */}
        <div className="mt-6">
          <p className="text-lg font-medium mb-2">
            📊 <strong>{yLabel} by Program/Site</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {chartData.map((item) => (
              <li key={item.program}>
                {item.program}: <strong>{item[yKey]?.toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
