import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  DollarSign,
  MapPin,
} from "lucide-react";

// Mock data for charts
const leadsByState = [
  { state: "CA", leads: 45, sold: 12 },
  { state: "TX", leads: 38, sold: 15 },
  { state: "FL", leads: 32, sold: 8 },
  { state: "NY", leads: 28, sold: 11 },
  { state: "IL", leads: 22, sold: 6 },
];

const conversionData = [
  { state: "TX", conversion: 39.5 },
  { state: "NY", conversion: 39.3 },
  { state: "CA", conversion: 26.7 },
  { state: "FL", conversion: 25.0 },
  { state: "IL", conversion: 27.3 },
];

const monthlyTrends = [
  { month: "Jan", leadsDistributed: 120, leadsSold: 32 },
  { month: "Feb", leadsDistributed: 135, leadsSold: 41 },
  { month: "Mar", leadsDistributed: 148, leadsSold: 38 },
  { month: "Apr", leadsDistributed: 162, leadsSold: 45 },
  { month: "May", leadsDistributed: 178, leadsSold: 52 },
  { month: "Jun", leadsDistributed: 165, leadsSold: 48 },
];

const leadStatusData = [
  { name: "Assigned", value: 65, color: "#3B82F6" },
  { name: "Unassigned", value: 12, color: "#EAB308" },
  { name: "Sold", value: 52, color: "#10B981" },
  // { name: "Replaced", value: 18, color: "#EF4444" },
];

export function PerformanceAnalytics() {
  const totalLeads = leadsByState.reduce((sum, state) => sum + state.leads, 0);
  const totalSold = leadsByState.reduce((sum, state) => sum + state.sold, 0);
  const overallConversion = ((totalSold / totalLeads) * 100).toFixed(1);
  const bestPerformingState = conversionData.reduce((prev, current) =>
    prev.conversion > current.conversion ? prev : current
  );
  const worstPerformingState = conversionData.reduce((prev, current) =>
    prev.conversion < current.conversion ? prev : current
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-cream-primary">
            Performance Analytics
          </h2>
          <p className="text-secondary-text">
            System-wide performance metrics and insights
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Total Leads Distributed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">
              {totalLeads}
            </div>
            {/* <div className="flex items-center text-sm text-theme-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last month
            </div> */}
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Total Leads Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-theme-success">
              {totalSold}
            </div>
            {/* <div className="flex items-center text-sm text-theme-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% from last month
            </div> */}
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Overall Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {overallConversion}%
            </div>
            {/* <div className="flex items-center text-sm text-theme-danger">
              <TrendingDown className="w-3 h-3 mr-1" />
              -2% from last month
            </div> */}
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Active Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">24</div>
            <div className="text-sm text-secondary-text">2 inactive</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by State */}
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader>
            <CardTitle className="text-cream-primary">Leads by State</CardTitle>
            <CardDescription className="text-secondary-text">
              Distribution and conversion by state
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadsByState}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2DCD5"
                  opacity={0.3}
                />
                <XAxis dataKey="state" stroke="#E2DCD5" />
                <YAxis stroke="#E2DCD5" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E1E1E",
                    border: "1px solid #E2DCD5",
                    borderRadius: "8px",
                    color: "#F5F5F5",
                  }}
                  cursor={{ fill: "#FFD700", opacity: 0.2 }}
                />
                <Bar dataKey="leads" fill="#E2DCD5" name="Total Leads" />
                <Bar dataKey="sold" fill="#4CAF50" name="Sold" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Status Distribution */}
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader>
            <CardTitle className="text-cream-primary">
              Lead Status Distribution
            </CardTitle>
            <CardDescription className="text-secondary-text">
              Current status of all leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#E2DCD5",
                    border: "1px solid #1E1E1E ",
                    borderRadius: "8px",
                    color: "#F5F5F5",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        {/* <Card className="bg-elevated-bg border-input-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-cream-primary">
              Monthly Performance Trends
            </CardTitle>
            <CardDescription className="text-secondary-text">
              Lead distribution and sales over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2DCD5"
                  opacity={0.3}
                />
                <XAxis dataKey="month" stroke="#E2DCD5" />
                <YAxis stroke="#E2DCD5" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E1E1E",
                    border: "1px solid #E2DCD5",
                    borderRadius: "8px",
                    color: "#F5F5F5",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="leadsDistributed"
                  stroke="#E2DCD5"
                  strokeWidth={2}
                  name="Leads Distributed"
                />
                <Line
                  type="monotone"
                  dataKey="leadsSold"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  name="Leads Sold"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader>
            <CardTitle className="text-cream-primary flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Best Performing State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-theme-success">
                  {bestPerformingState.state}
                </div>
                <div className="text-sm text-secondary-text">
                  Conversion Rate
                </div>
              </div>
              <Badge className="bg-theme-success/20 text-theme-success border-theme-success/50 text-lg px-3 py-1">
                {bestPerformingState.conversion}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader>
            <CardTitle className="text-cream-primary flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Needs Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-theme-danger">
                  {worstPerformingState.state}
                </div>
                <div className="text-sm text-secondary-text">
                  Conversion Rate
                </div>
              </div>
              <Badge className="bg-theme-danger/20 text-theme-danger border-theme-danger/50 text-lg px-3 py-1">
                {worstPerformingState.conversion}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
