import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Download,
  DollarSign,
} from "lucide-react";

// Mock data for subscriptions
const mockSubscriptions = [
  {
    id: 1,
    agentName: "Agent Johnson",
    email: "johnson@email.com",
    plan: "Premium",
    startDate: "2024-01-01",
    currentWeek: 3,
    nextChargeDate: "2024-01-22",
    status: "active",
    monthlyFee: 149,
    totalPaid: 447,
  },
  {
    id: 2,
    agentName: "Agent Davis",
    email: "davis@email.com",
    plan: "Standard",
    startDate: "2024-01-01",
    currentWeek: 3,
    nextChargeDate: "2024-01-22",
    status: "active",
    monthlyFee: 99,
    totalPaid: 297,
  },
  {
    id: 3,
    agentName: "Agent Smith",
    email: "smith@email.com",
    plan: "Premium",
    startDate: "2023-12-15",
    currentWeek: 4,
    nextChargeDate: "2024-01-15",
    status: "payment_failed",
    monthlyFee: 149,
    totalPaid: 596,
  },
  {
    id: 4,
    agentName: "Agent Wilson",
    email: "wilson@email.com",
    plan: "Standard",
    startDate: "2024-01-10",
    currentWeek: 2,
    nextChargeDate: "2024-01-31",
    status: "trial",
    monthlyFee: 99,
    totalPaid: 0,
  },
];

export function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === "active"
  ).length;
  const failedPayments = subscriptions.filter(
    (sub) => sub.status === "payment_failed"
  ).length;
  const trialSubscriptions = subscriptions.filter(
    (sub) => sub.status === "trial"
  ).length;
  const totalMRR = subscriptions
    .filter((sub) => sub.status === "active")
    .reduce((sum, sub) => sum + sub.monthlyFee, 0);

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-500/20 text-green-400 border-green-400/50",
      payment_failed: "bg-red-500/20 text-red-400 border-red-400/50",
      trial: "bg-blue-500/20 text-blue-400 border-blue-400/50",
      cancelled: "bg-gray-500/20 text-gray-400 border-gray-400/50",
    };
    const icons = {
      active: CheckCircle,
      payment_failed: AlertTriangle,
      trial: Calendar,
      cancelled: AlertTriangle,
    };
    const Icon = icons[status as keyof typeof icons];
    return (
      <Badge
        className={
          colors[status as keyof typeof colors] ||
          "bg-gray-500/20 text-gray-400"
        }
      >
        <Icon className="w-3 h-3 mr-1" />
        {status.replace("_", " ")}
      </Badge>
    );
  };

  const getPlanBadge = (plan: string) => {
    const colors = {
      Premium: "bg-purple-500/20 text-purple-400 border-purple-400/50",
      Standard: "bg-blue-500/20 text-blue-400 border-blue-400/50",
    };
    return (
      <Badge className={colors[plan as keyof typeof colors]}>{plan}</Badge>
    );
  };

  const handleRetryPayment = (subscriptionId: number) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === subscriptionId ? { ...sub, status: "active" } : sub
      )
    );
  };

  const exportInvoices = () => {
    console.log("Exporting invoices...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-cream-primary">
            Subscription Management
          </h2>
          <p className="text-secondary-text">
            Manage agent subscriptions and billing
          </p>
        </div>
        <Button
          onClick={exportInvoices}
          className="bg-cream-primary hover:bg-cream-hover text-dark-base font-semibold"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Invoices
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-theme-success">
              {activeSubscriptions}
            </div>
            <div className="text-sm text-secondary-text">
              {subscriptions.length} total
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">
              ${totalMRR.toLocaleString()}
            </div>
            <div className="text-sm text-theme-success">+12% this month</div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Payment Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-theme-danger">
              {failedPayments}
            </div>
            <div className="text-sm text-secondary-text">Need attention</div>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-text">
              Trial Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {trialSubscriptions}
            </div>
            <div className="text-sm text-secondary-text">
              Potential conversions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card className="bg-elevated-bg border-input-border">
        <CardHeader>
          <CardTitle className="text-cream-primary">
            All Subscriptions
          </CardTitle>
          <CardDescription className="text-secondary-text">
            Manage agent subscription details and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-input-border">
                  <TableHead className="text-cream-primary">Agent</TableHead>
                  <TableHead className="text-cream-primary">Plan</TableHead>
                  <TableHead className="text-cream-primary">
                    Start Date
                  </TableHead>
                  <TableHead className="text-cream-primary">
                    Current Week
                  </TableHead>
                  <TableHead className="text-cream-primary">
                    Next Charge
                  </TableHead>
                  <TableHead className="text-cream-primary">
                    Monthly Fee
                  </TableHead>
                  <TableHead className="text-cream-primary">
                    Total Paid
                  </TableHead>
                  <TableHead className="text-cream-primary">Status</TableHead>
                  <TableHead className="text-cream-primary">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((subscription) => (
                  <TableRow
                    key={subscription.id}
                    className="border-input-border"
                  >
                    <TableCell className="text-primary-text">
                      <div className="font-medium">
                        {subscription.agentName}
                      </div>
                      <div className="text-sm text-secondary-text">
                        {subscription.email}
                      </div>
                    </TableCell>
                    <TableCell>{getPlanBadge(subscription.plan)}</TableCell>
                    <TableCell className="text-primary-text">
                      {subscription.startDate}
                    </TableCell>
                    <TableCell className="text-primary-text">
                      Week {subscription.currentWeek}
                    </TableCell>
                    <TableCell className="text-primary-text">
                      {subscription.nextChargeDate}
                    </TableCell>
                    <TableCell className="text-theme-success font-medium">
                      ${subscription.monthlyFee}
                    </TableCell>
                    <TableCell className="text-blue-400">
                      ${subscription.totalPaid}
                    </TableCell>
                    <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {subscription.status === "payment_failed" && (
                          <Button
                            size="sm"
                            onClick={() => handleRetryPayment(subscription.id)}
                            className="bg-theme-success/20 hover:bg-theme-success/30 text-theme-success border border-theme-success/50"
                          >
                            Retry Payment
                          </Button>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-input-border text-secondary-text hover:bg-cream-primary/20 hover:text-cream-primary"
                              onClick={() =>
                                setSelectedSubscription(subscription)
                              }
                            >
                              <CreditCard className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-elevated-bg border-input-border">
                            <DialogHeader>
                              <DialogTitle className="text-cream-primary">
                                Subscription Details
                              </DialogTitle>
                              <DialogDescription className="text-secondary-text">
                                Payment history and subscription information
                              </DialogDescription>
                            </DialogHeader>
                            {selectedSubscription && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-sm text-secondary-text">
                                      Agent
                                    </div>
                                    <div className="text-primary-text">
                                      {selectedSubscription.agentName}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-secondary-text">
                                      Plan
                                    </div>
                                    <div>
                                      {getPlanBadge(selectedSubscription.plan)}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-secondary-text">
                                      Start Date
                                    </div>
                                    <div className="text-primary-text">
                                      {selectedSubscription.startDate}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-secondary-text">
                                      Status
                                    </div>
                                    <div>
                                      {getStatusBadge(
                                        selectedSubscription.status
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="border-t border-input-border pt-4">
                                  <div className="text-sm text-secondary-text mb-2">
                                    Payment History
                                  </div>
                                  <div className="text-primary-text">
                                    Total Paid: $
                                    {selectedSubscription.totalPaid}
                                  </div>
                                  <div className="text-primary-text">
                                    Monthly Fee: $
                                    {selectedSubscription.monthlyFee}
                                  </div>
                                  <div className="text-primary-text">
                                    Next Charge:{" "}
                                    {selectedSubscription.nextChargeDate}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
