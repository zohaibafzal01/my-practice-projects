
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Download, Calendar, Users, TrendingUp } from 'lucide-react';

// Mock data for subscription and billing
const subscriptionData = {
  plan: 'Professional',
  currentWeek: 3,
  totalWeeks: 4,
  nextBillingDate: '2024-02-15',
  nextBillingAmount: 299.99,
  totalLeadsInPlan: 100,
  leadsReceived: 75,
  leadsRemaining: 25
};

const receiptHistory = [
  { id: '1', date: '2024-01-15', amount: 299.99, description: 'Professional Plan - Week 1-4', status: 'Paid' },
  { id: '2', date: '2023-12-15', amount: 299.99, description: 'Professional Plan - Week 1-4', status: 'Paid' },
  { id: '3', date: '2023-11-15', amount: 299.99, description: 'Professional Plan - Week 1-4', status: 'Paid' },
  { id: '4', date: '2023-10-15', amount: 199.99, description: 'Basic Plan - Week 1-4', status: 'Paid' }
];

export function AgentSubscriptionBilling() {
  const progressPercentage = (subscriptionData.leadsReceived / subscriptionData.totalLeadsInPlan) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Subscription & Billing
        </h2>
        <p className="text-cyan-100/70">Manage your subscription and billing information</p>
      </div>

      {/* Plan Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-cyan-100">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/50 text-lg px-3 py-1">
                {subscriptionData.plan}
              </Badge>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-100/70">Current Week</span>
                  <span className="text-white">{subscriptionData.currentWeek} of {subscriptionData.totalWeeks}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                    style={{ width: `${(subscriptionData.currentWeek / subscriptionData.totalWeeks) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-green-400/30">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-cyan-100">Next Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-400" />
                <span className="text-white">{subscriptionData.nextBillingDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-green-400" />
                <span className="text-white font-bold">${subscriptionData.nextBillingAmount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-blue-400/30">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-cyan-100">Lead Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-cyan-100/70">Received</span>
                <span className="text-white">{subscriptionData.leadsReceived} / {subscriptionData.totalLeadsInPlan}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-cyan-100/70">
                {subscriptionData.leadsRemaining} leads remaining
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Statistics */}
      <Card className="bg-black/40 border-cyan-400/30">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-cyan-100">Billing Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-cyan-100/70">Total Leads</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{subscriptionData.leadsReceived}</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-sm text-cyan-100/70">Usage Rate</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{progressPercentage.toFixed(1)}%</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-cyan-100/70">Monthly Spend</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">${subscriptionData.nextBillingAmount}</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-cyan-100/70">Days Left</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">12</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipt History */}
      <Card className="bg-black/40 border-gray-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-cyan-100">Receipt History</CardTitle>
              <p className="text-cyan-100/70">Download your payment receipts and invoices</p>
            </div>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400">
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-700/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800/30 border-gray-700/50">
                  <TableHead className="text-cyan-200">Date</TableHead>
                  <TableHead className="text-cyan-200">Description</TableHead>
                  <TableHead className="text-cyan-200">Amount</TableHead>
                  <TableHead className="text-cyan-200">Status</TableHead>
                  <TableHead className="text-cyan-200">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receiptHistory.map((receipt) => (
                  <TableRow key={receipt.id} className="border-gray-700/50 hover:bg-gray-800/20">
                    <TableCell className="text-white">{receipt.date}</TableCell>
                    <TableCell className="text-gray-300">{receipt.description}</TableCell>
                    <TableCell className="text-white font-medium">${receipt.amount}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/50">
                        {receipt.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
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
