import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  AlertTriangle,
  CreditCard,
  UserX,
  Upload,
  Check,
  X,
} from "lucide-react";

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    type: "replacement",
    title: "New Replacement Request",
    message: "Agent Smith requested replacement for lead #1234",
    timestamp: "2 minutes ago",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "leads",
    title: "New Leads Uploaded",
    message: "150 new leads added to the system",
    timestamp: "1 hour ago",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "billing",
    title: "Payment Failed",
    message: "Agent Johnson's subscription payment failed",
    timestamp: "3 hours ago",
    read: true,
    priority: "high",
  },
  {
    id: 4,
    type: "subscription",
    title: "Subscription Expiring",
    message: "Agent Davis subscription expires in 3 days",
    timestamp: "1 day ago",
    read: false,
    priority: "medium",
  },
];

export function NotificationCenter() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "replacement":
        return <UserX className="h-4 w-4 text-orange-400" />;
      case "leads":
        return <Upload className="h-4 w-4 text-cream-primary" />;
      case "billing":
        return <CreditCard className="h-4 w-4 text-theme-danger" />;
      case "subscription":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default:
        return <Bell className="h-4 w-4 text-cream-primary" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-theme-danger/20 text-theme-danger border-theme-danger/50",
      medium: "bg-yellow-500/20 text-yellow-400 border-yellow-400/50",
      low: "bg-theme-success/20 text-theme-success border-theme-success/50",
    };
    return (
      <Badge
        className={
          colors[priority as keyof typeof colors] ||
          "bg-gray-500/20 text-gray-400"
        }
      >
        {priority}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-cream-primary">
            Notification Center
          </h2>
          <p className="text-secondary-text">System alerts and notifications</p>
        </div>
        <Button className="bg-cream-primary hover:bg-cream-hover text-dark-base font-semibold">
          Mark All Read
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Total Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">
              {mockNotifications.length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Unread
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-theme-danger">
              {mockNotifications.filter((n) => !n.read).length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">
              {mockNotifications.filter((n) => n.priority === "high").length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">
              {
                mockNotifications.filter(
                  (n) =>
                    n.timestamp.includes("hour") ||
                    n.timestamp.includes("minute")
                ).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="bg-elevated-bg border-input-border">
        <CardHeader>
          <CardTitle className="text-cream-primary">
            Recent Notifications
          </CardTitle>
          <CardDescription className="text-secondary-text">
            Latest system alerts and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.read
                    ? "bg-section-bg border-input-border"
                    : "bg-cream-primary/10 border-cream-primary/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="p-2 rounded-lg bg-section-bg border border-input-border">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-primary-text">
                          {notification.title}
                        </h4>
                        {getPriorityBadge(notification.priority)}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-cream-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-secondary-text text-sm mt-1">
                        {notification.message}
                      </p>
                      <p className="text-disabled-text text-xs mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-input-border text-secondary-text hover:bg-cream-primary/20 hover:text-cream-primary"
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-input-border text-secondary-text hover:bg-cream-primary/20 hover:text-cream-primary"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-elevated-bg border-input-border">
        <CardHeader>
          <CardTitle className="text-cream-primary">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="border-input-border text-secondary-text hover:bg-cream-primary/20 hover:text-cream-primary"
            >
              <Bell className="w-4 h-4 mr-2" />
              Configure Alerts
            </Button>
            <Button
              variant="outline"
              className="border-input-border text-secondary-text hover:bg-cream-primary/20 hover:text-cream-primary"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Billing Notifications
            </Button>
            <Button
              variant="outline"
              className="border-input-border text-secondary-text hover:bg-cream-primary/20 hover:text-cream-primary"
            >
              <UserX className="w-4 h-4 mr-2" />
              User Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
