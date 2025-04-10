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
import { individualsReportProp } from "@/reports/individuals-report/_components/columns.tsx";

interface Props {
  data: individualsReportProp[];
  filteredData: individualsReportProp[];
}

export default function IndividualsChart({ filteredData }: Props) {
  const chartData = useMemo(() => {
    const siteMap: Record<string, number> = {};

    filteredData.forEach((item) => {
      const site = item["site"]; 
      siteMap[site] = (siteMap[site] || 0) + 1;
    });

    return Object.entries(siteMap).map(([site, count]) => ({
      site,
      count,
    }));
  }, [filteredData]);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-10">
      {/* Chart showing number of individuals per site */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Number of Individuals per Site</h2>
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="site"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#60a5fa" name="Count" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6">
            <p className="text-lg font-medium mb-2">
              📊 <strong>Individuals Count per Site</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {chartData.map(({ site, count }) => (
                <li key={site}>
                  {site}: {count} person(s)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
