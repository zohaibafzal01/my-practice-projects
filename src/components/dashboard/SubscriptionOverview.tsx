
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CreditCard, DollarSign, Clock } from 'lucide-react';

const subscriptionData = {
  currentWeek: 12,
  totalWeeks: 52,
  planType: 'Premium',
  nextBillingDate: '2024-07-15',
  nextAmount: 297.00,
  weeklyLeadAllocation: 25,
  remainingLeads: 18,
  totalSpent: 3564.00,
  avgWeeklyCost: 297.00
};

const transactionHistory = [
  { date: '2024-06-15', amount: 297.00, status: 'paid', week: 11 },
  { date: '2024-06-08', amount: 297.00, status: 'paid', week: 10 },
  { date: '2024-06-01', amount: 297.00, status: 'paid', week: 9 },
  { date: '2024-05-25', amount: 297.00, status: 'paid', week: 8 },
  { date: '2024-05-18', amount: 297.00, status: 'paid', week: 7 }
];

const SubscriptionOverview = () => {
  const progressPercentage = (subscriptionData.currentWeek / subscriptionData.totalWeeks) * 100;
  const daysUntilBilling = Math.ceil((new Date(subscriptionData.nextBillingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Subscription Status Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-black/40 backdrop-blur-md border border-purple-400/30 shadow-xl shadow-purple-500/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-purple-300">
                  Week {subscriptionData.currentWeek}
                </div>
                <div className="text-sm text-purple-100/70">of {subscriptionData.totalWeeks}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">{progressPercentage.toFixed(1)}% complete</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-green-400/30 shadow-xl shadow-green-500/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-300">
                  {daysUntilBilling} days
                </div>
                <div className="text-sm text-green-100/70">Until next billing</div>
              </div>
            </div>
            <div className="mt-2">
              <Badge className="bg-green-500/20 text-green-300 border-green-400/50">
                {subscriptionData.planType} Plan
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-blue-400/30 shadow-xl shadow-blue-500/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-blue-300">
                  ${subscriptionData.nextAmount}
                </div>
                <div className="text-sm text-blue-100/70">Next charge</div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              {subscriptionData.nextBillingDate}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border border-orange-400/30 shadow-xl shadow-orange-500/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-8 h-8 text-orange-400" />
              <div>
                <div className="text-2xl font-bold text-orange-300">
                  ${subscriptionData.totalSpent.toLocaleString()}
                </div>
                <div className="text-sm text-orange-100/70">Total spent</div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Avg: ${subscriptionData.avgWeeklyCost}/week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Allocation Status */}
      <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Weekly Lead Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
              <div className="text-3xl font-bold text-cyan-300 mb-2">
                {subscriptionData.weeklyLeadAllocation}
              </div>
              <div className="text-sm text-cyan-100/70">Weekly Allocation</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-400/20">
              <div className="text-3xl font-bold text-green-300 mb-2">
                {subscriptionData.remainingLeads}
              </div>
              <div className="text-sm text-green-100/70">Remaining This Week</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-400/20">
              <div className="text-3xl font-bold text-purple-300 mb-2">
                {subscriptionData.weeklyLeadAllocation - subscriptionData.remainingLeads}
              </div>
              <div className="text-sm text-purple-100/70">Used This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="bg-black/40 backdrop-blur-md border border-gray-400/30 shadow-xl shadow-gray-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
              Recent Transaction History
            </CardTitle>
            <Button variant="outline" className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactionHistory.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Week {transaction.week} Payment
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">
                    ${transaction.amount}
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/50">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionOverview;
