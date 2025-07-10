import agentApi from "@/api/agent";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  DollarSign,
  MapPin,
  RefreshCw,
  Target,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AgentPerformanceData } from "./types/agent-analytics";

export function AgentPerformanceAnalytics() {
  const [data, setData] = useState<AgentPerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Fetching agent analytics data for 30 days...");

      const response = await agentApi.getPerformanceAnalytics({
        timeframe: "30d",
      });

      console.log("📊 Agent analytics data received:", response);

      if (response && response.data) {
        setData(response.data);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      console.error("❌ Error fetching agent analytics data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch analytics data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const handleRefresh = () => {
    fetchAnalyticsData();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-cream-primary">
              My Performance Analytics
            </h2>
            <p className="text-secondary-text">
              Loading your performance metrics...
            </p>
          </div>
          <RefreshCw className="w-6 h-6 animate-spin text-cream-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-elevated-bg border-input-border">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-600 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-600 rounded animate-pulse mb-2" />
                <div className="h-3 bg-gray-600 rounded animate-pulse w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-cream-primary">
              My Performance Analytics
            </h2>
            <p className="text-secondary-text">
              Your last 30 days performance metrics and insights
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>

        <Card className="bg-elevated-bg border-input-border">
          <CardContent className="flex items-center gap-3 p-6">
            <AlertCircle className="w-5 h-5 text-theme-danger" />
            <div>
              <h3 className="font-semibold text-cream-primary">
                Error Loading Data
              </h3>
              <p className="text-secondary-text text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-cream-primary">
              My Performance Analytics
            </h2>
            <p className="text-secondary-text">No data available</p>
          </div>
        </div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-cream-primary">
            My Performance Analytics
          </h2>
          <p className="text-secondary-text">
            Your last 30 days performance metrics and insights
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary/90 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Total Leads Assigned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">
              {data.totalLeadsAssigned}
            </div>
            <div className="text-sm text-secondary-text">
              Leads assigned to you
            </div>
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
              {data.totalLeadsSold}
            </div>
            <div className="text-sm text-secondary-text">
              Successfully closed
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {data.overallConversionRate}%
            </div>
            <div className="text-sm text-secondary-text">Your success rate</div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {formatCurrency(data.totalRevenue)}
            </div>
            <div className="text-sm text-secondary-text">
              {formatCurrency(data.averageRevenuePerSale)} avg per sale
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Region */}
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader>
            <CardTitle className="text-cream-primary">
              Leads by Region
            </CardTitle>
            <CardDescription className="text-secondary-text">
              Your leads assigned vs sold by region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.leadsByRegion}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2DCD5"
                  opacity={0.3}
                />
                <XAxis dataKey="region" stroke="#E2DCD5" />
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
                <Bar dataKey="assigned" fill="#E2DCD5" name="Assigned" />
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
              Current status of your leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.leadStatusDistribution}
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
                  {data.leadStatusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E1E1E",
                    border: "1px solid #E2DCD5",
                    borderRadius: "8px",
                    color: "#F5F5F5",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="bg-elevated-bg border-input-border">
        <CardHeader>
          <CardTitle className="text-cream-primary">
            Monthly Performance Trends
          </CardTitle>
          <CardDescription className="text-secondary-text">
            Your leads assigned vs sold over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyTrends}>
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
                dataKey="leadsAssigned"
                stroke="#E2DCD5"
                strokeWidth={2}
                name="Assigned"
              />
              <Line
                type="monotone"
                dataKey="leadsSold"
                stroke="#4CAF50"
                strokeWidth={2}
                name="Sold"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader>
            <CardTitle className="text-cream-primary flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Best Performing Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-theme-success">
                  {data.bestPerformingRegion.region}
                </div>
                <div className="text-sm text-secondary-text">
                  Conversion Rate
                </div>
              </div>
              <Badge className="bg-theme-success/20 text-theme-success border-theme-success/50 text-lg px-3 py-1">
                {data.bestPerformingRegion.conversionRate}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader>
            <CardTitle className="text-cream-primary flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Revenue Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-secondary-text">Total Revenue:</span>
                <span className="font-semibold text-green-400">
                  {formatCurrency(data.totalRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">Average per Sale:</span>
                <span className="font-semibold text-cream-primary">
                  {formatCurrency(data.averageRevenuePerSale)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">Total Sales:</span>
                <span className="font-semibold text-cream-primary">
                  {data.totalLeadsSold}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
