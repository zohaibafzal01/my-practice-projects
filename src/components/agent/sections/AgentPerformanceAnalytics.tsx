
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data for charts
const leadsPerState = [
  { state: 'CA', leads: 15, converted: 8 },
  { state: 'TX', leads: 12, converted: 6 },
  { state: 'FL', leads: 10, converted: 4 },
  { state: 'NY', leads: 8, converted: 3 },
  { state: 'NV', leads: 6, converted: 2 }
];

const conversionPerState = [
  { state: 'CA', rate: 53.3 },
  { state: 'TX', rate: 50.0 },
  { state: 'FL', rate: 40.0 },
  { state: 'NY', rate: 37.5 },
  { state: 'NV', rate: 33.3 }
];

const replacedLeadsBreakdown = [
  { name: "Assigned", value: 34, color: "#3B82F6" },
  { name: "Sold", value: 47, color: "#10B981" },
  { name: "Replacement Requested", value: 22, color: "#EAB308" },
];

export function AgentPerformanceAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-cream-primary">
          Performance Analytics
        </h2>
        <p className="text-gray-100/70">
          Interactive charts showing your performance data
        </p>
      </div>

      {/* Leads per State Chart */}
      <Card className="bg-black/40 border border-gray-700 ">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-cream-primary">
            Leads per State
          </CardTitle>
          <p className="text-gray-100/70">
            Total leads assigned vs converted by state
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadsPerState}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="state" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                cursor={{ fill: "#FFD700", opacity: 0.2 }}
              />
              <Bar dataKey="leads" fill="#06b6d4" name="Total Leads" />
              <Bar dataKey="converted" fill="#10b981" name="Converted" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversion Rate per State */}
        <Card className="bg-black/40 border border-gray-700 ">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-cream-primary">
              Conversion Rate per State
            </CardTitle>
            <p className="text-gray-100/70">
              Your conversion percentage by state
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={conversionPerState}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="state" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  cursor={{ fill: "#FFD700", opacity: 0.2 }}
                />
                <Bar dataKey="rate" fill="#8b5cf6" name="Conversion Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Replaced Leads Breakdown */}
        <Card className="bg-black/40 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-cream-primary">
              Lead Status Distribution
            </CardTitle>
            <p className="text-gray-100/70">Current status of all leads</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={replacedLeadsBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {replacedLeadsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#E2DCD5",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="bg-black/40 border border-gray-700 ">
        <CardHeader>
          <CardTitle className="text-xl font-bold tborder text-cream-primary">
            Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="text-2xl font-bold text-cream-primary">26.7%</div>
              <div className="text-sm text-cyan-100/70">
                Overall Conversion Rate
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="text-2xl font-bold text-cream-primary">51</div>
              <div className="text-sm text-cyan-100/70">
                Total Leads Processed
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="text-2xl font-bold text-cream-primary">CA</div>
              <div className="text-sm text-cyan-100/70">
                Best Performing State
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="text-2xl font-bold text-cream-primary">8</div>
              <div className="text-sm text-cyan-100/70">Total Replacements</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
