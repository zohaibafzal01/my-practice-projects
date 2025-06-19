import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  RotateCcw,
  TrendingUp,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

export function AdminOverview() {
  const stats = [
    {
      title: "Active Agents",
      value: "24",
      change: "+2 this week",
      icon: Users,
      color: "text-theme-success",
    },
    {
      title: "Total Leads",
      value: "1,847",
      change: "+156 today",
      icon: UserCheck,
      color: "text-cream-primary",
    },
    {
      title: "Pending Replacements",
      value: "8",
      change: "3 new requests",
      icon: RotateCcw,
      color: "text-orange-400",
    },
    {
      title: "Monthly Sales",
      value: "$487,230",
      change: "+12.5% vs last month",
      icon: DollarSign,
      color: "text-theme-success",
    },
    {
      title: "Conversion Rate",
      value: "18.2%",
      change: "+2.1% improvement",
      icon: TrendingUp,
      color: "text-cream-primary",
    },
    {
      title: "System Alerts",
      value: "3",
      change: "Requires attention",
      icon: AlertTriangle,
      color: "text-theme-danger",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-cream-primary mb-2">
          System Overview
        </h2>
        <p className="text-secondary-text">
          Monitor key metrics and system performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-elevated-bg border border-input-border shadow-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-secondary-text">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-text mb-1">
                {stat.value}
              </div>
              <p className={`text-xs ${stat.color}`}>{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-elevated-bg border border-input-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-cream-primary">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-section-bg border border-input-border">
              <div className="w-2 h-2 bg-theme-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-primary-text font-medium">
                  New agent registered
                </p>
                <p className="text-secondary-text text-sm">
                  Sarah Johnson joined the platform
                </p>
              </div>
              <span className="text-secondary-text text-sm">2m ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-section-bg border border-input-border">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-primary-text font-medium">
                  Replacement request
                </p>
                <p className="text-secondary-text text-sm">
                  Mike Davis requested lead replacement
                </p>
              </div>
              <span className="text-secondary-text text-sm">15m ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-section-bg border border-input-border">
              <div className="w-2 h-2 bg-cream-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-primary-text font-medium">
                  Bulk lead upload
                </p>
                <p className="text-secondary-text text-sm">
                  156 new leads added to system
                </p>
              </div>
              <span className="text-secondary-text text-sm">1h ago</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border border-input-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-cream-primary">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left rounded-lg bg-section-bg border border-input-border hover:border-cream-primary/50 transition-colors">
              <div className="font-medium text-primary-text">
                Upload New Leads
              </div>
              <div className="text-sm text-secondary-text">
                Import leads from CSV file
              </div>
            </button>
            <button className="w-full p-3 text-left rounded-lg bg-section-bg border border-input-border hover:border-cream-primary/50 transition-colors">
              <div className="font-medium text-primary-text">
                Manage Assignments
              </div>
              <div className="text-sm text-secondary-text">
                Assign leads to agents
              </div>
            </button>
            <button className="w-full p-3 text-left rounded-lg bg-section-bg border border-input-border hover:border-cream-primary/50 transition-colors">
              <div className="font-medium text-primary-text">View Reports</div>
              <div className="text-sm text-secondary-text">
                Generate system reports
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
