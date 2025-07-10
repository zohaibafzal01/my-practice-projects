import adminApi from "@/api/admin";
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
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PerformanceData } from "./types/admin-analytics";

export function PerformanceAnalytics() {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Fetching analytics data for 30 days...");

      const response = await adminApi.getPerformanceAnalytics({
        timeframe: "30d",
      });

      console.log("📊 Analytics data received:", response);

      if (response && response.data) {
        setData(response.data);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      console.error("❌ Error fetching analytics data:", err);
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
              Performance Analytics
            </h2>
            <p className="text-secondary-text">
              Loading performance metrics...
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
              Performance Analytics
            </h2>
            <p className="text-secondary-text">
              Last 30 days performance metrics and insights
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
              Performance Analytics
            </h2>
            <p className="text-secondary-text">No data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-cream-primary">
            Performance Analytics
          </h2>
          <p className="text-secondary-text">
            Last 30 days performance metrics and insights
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
              Total Leads Distributed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">
              {data.totalLeadsDistributed}
            </div>
            <div className="text-sm text-secondary-text">
              Assigned to agents
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
              Overall Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {data.overallConversionRate}%
            </div>
            <div className="text-sm text-secondary-text">
              Sold/Distributed ratio
            </div>
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
            <div className="text-2xl font-bold text-cream-primary">
              {data.activeAgents}
            </div>
            <div className="text-sm text-secondary-text">
              {data.inactiveAgents} inactive
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
              Distribution and conversion by region
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
                <Bar dataKey="distributed" fill="#E2DCD5" name="Distributed" />
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
              <MapPin className="w-5 h-5 mr-2" />
              Needs Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-theme-danger">
                  {data.worstPerformingRegion.region}
                </div>
                <div className="text-sm text-secondary-text">
                  Conversion Rate
                </div>
              </div>
              <Badge className="bg-theme-danger/20 text-theme-danger border-theme-danger/50 text-lg px-3 py-1">
                {data.worstPerformingRegion.conversionRate}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
