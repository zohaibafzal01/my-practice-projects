
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, CheckCircle, RotateCcw, DollarSign, MapPin } from 'lucide-react';

// Mock data for agent overview
const mockStats = {
  totalLeadsAssigned: 45,
  leadsMarkedAsSold: 12,
  pendingReplacements: 3,
  conversionRate: 26.7,
  annualSubmitTotal: 89500,
  topPerformingStates: [
    { state: 'CA', conversions: 8, rate: 35.2 },
    { state: 'TX', conversions: 6, rate: 28.1 },
    { state: 'FL', conversions: 4, rate: 22.3 }
  ]
};

export function AgentOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-cream-primary">
          Dashboard Overview
        </h2>
        <p className="text-secondary-text">Your real-time performance statistics</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-text">Total Leads Assigned</CardTitle>
            <Users className="h-4 w-4 text-cream-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cream-primary">{mockStats.totalLeadsAssigned}</div>
            <p className="text-xs text-secondary-text">Active assignments</p>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-text">Leads Marked as Sold</CardTitle>
            <CheckCircle className="h-4 w-4 text-theme-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-theme-success">{mockStats.leadsMarkedAsSold}</div>
            <p className="text-xs text-secondary-text">Successful conversions</p>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-text">Pending Replacements</CardTitle>
            <RotateCcw className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">{mockStats.pendingReplacements}</div>
            <p className="text-xs text-secondary-text">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-text">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{mockStats.conversionRate}%</div>
            <p className="text-xs text-secondary-text">Leads to sales ratio</p>
          </CardContent>
        </Card>

        <Card className="bg-elevated-bg border-input-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-text">Annual Submit Total</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">${mockStats.annualSubmitTotal.toLocaleString()}</div>
            <p className="text-xs text-secondary-text">Total sales value</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing States */}
      <Card className="bg-elevated-bg border-input-border">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-cream-primary">
            Top 3 Performing States
          </CardTitle>
          <p className="text-secondary-text">Based on your conversion rates</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStats.topPerformingStates.map((state, index) => (
              <div key={state.state} className="flex items-center justify-between p-4 rounded-lg bg-section-bg border border-input-border">
                <div className="flex items-center space-x-3">
                  <Badge className={`${
                    index === 0 ? 'bg-yellow-500/20 text-yellow-300' :
                    index === 1 ? 'bg-gray-500/20 text-gray-300' :
                    'bg-orange-500/20 text-orange-300'
                  } border-transparent`}>
                    #{index + 1}
                  </Badge>
                  <MapPin className="h-4 w-4 text-cream-primary" />
                  <span className="font-medium text-primary-text">{state.state}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-secondary-text">
                    {state.conversions} conversions
                  </div>
                  <div className="text-sm font-bold text-theme-success">
                    {state.rate}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
