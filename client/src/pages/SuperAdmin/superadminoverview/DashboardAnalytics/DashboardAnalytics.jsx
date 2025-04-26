import React, { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardAnalytics = () => {
  const [stats, setStats] = useState({ users: 0, jobs: 0, interviews: 0, companies: 0 });
  const [topEntities, setTopEntities] = useState([]);
  const [metrics, setMetrics] = useState({ successRate: 0, dropOffRate: 0 });

  useEffect(() => {
    // Replace with real API calls
    setStats({ users: 2500, jobs: 320, interviews: 180, companies: 60 });
    setTopEntities([
      { label: "Candidate A", performance: 92 },
      { label: "Candidate B", performance: 88 },
      { label: "Candidate C", performance: 85 },
    ]);
    setMetrics({ successRate: 72, dropOffRate: 18 });
  }, []);

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-flow-col auto-cols-max gap-x-1">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white rounded shadow p-4 mt-5">
            <h3 className="text-base font-semibold capitalize">Total {key}</h3>
            <p className="text-2xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>

      {/* Top Candidates Chart */}
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Top Performing Candidates</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topEntities}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="performance" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Application Metrics */}
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-2">Application Metrics</h3>
        <div className="space-y-1">
          <p>Success Rate: <span className="font-bold">{metrics.successRate}%</span></p>
          <p>Drop-off Rate: <span className="font-bold">{metrics.dropOffRate}%</span></p>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={() => handleExport("pdf")}
          className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded flex items-center"
        >
          <Download className="w-4 h-4 mr-2" /> Export as PDF
        </button>
        <button
          onClick={() => handleExport("excel")}
          className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded flex items-center"
        >
          <FileText className="w-4 h-4 mr-2" /> Export as Excel
        </button>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
