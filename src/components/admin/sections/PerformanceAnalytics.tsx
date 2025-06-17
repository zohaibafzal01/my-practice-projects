
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Users, Target, DollarSign, MapPin } from 'lucide-react';

// Mock data for charts
const leadsByState = [
  { state: 'CA', leads: 45, sold: 12 },
  { state: 'TX', leads: 38, sold: 15 },
  { state: 'FL', leads: 32, sold: 8 },
  { state: 'NY', leads: 28, sold: 11 },
  { state: 'IL', leads: 22, sold: 6 }
];

const conversionData = [
  { state: 'TX', conversion: 39.5 },
  { state: 'NY', conversion: 39.3 },
  { state: 'CA', conversion: 26.7 },
  { state: 'FL', conversion: 25.0 },
  { state: 'IL', conversion: 27.3 }
];

const monthlyTrends = [
  { month: 'Jan', leadsDistributed: 120, leadsSold: 32 },
  { month: 'Feb', leadsDistributed: 135, leadsSold: 41 },
  { month: 'Mar', leadsDistributed: 148, leadsSold: 38 },
  { month: 'Apr', leadsDistributed: 162, leadsSold: 45 },
  { month: 'May', leadsDistributed: 178, leadsSold: 52 },
  { month: 'Jun', leadsDistributed: 165, leadsSold: 48 }
];

const leadStatusData = [
  { name: 'Assigned', value: 65, color: '#3B82F6' },
  { name: 'Unassigned', value: 12, color: '#EAB308' },
  { name: 'Sold', value: 52, color: '#10B981' },
  { name: 'Replaced', value: 18, color: '#EF4444' }
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
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Performance Analytics
          </h2>
          <p className="text-purple-100/70">System-wide performance metrics and insights</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-100 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Total Leads Distributed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{totalLeads}</div>
            <div className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-100 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Total Leads Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{totalSold}</div>
            <div className="flex items-center text-sm text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-100 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Overall Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{overallConversion}%</div>
            <div className="flex items-center text-sm text-red-400">
              <TrendingDown className="w-3 h-3 mr-1" />
              -2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-100 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Active Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">24</div>
            <div className="text-sm text-purple-100/70">2 inactive</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by State */}
        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-purple-100">Leads by State</CardTitle>
            <CardDescription className="text-purple-100/70">
              Distribution and conversion by state
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadsByState}>
                <CartesianGrid strokeDasharray="3 3" stroke="#7C3AED" opacity={0.3} />
                <XAxis dataKey="state" stroke="#A855F7" />
                <YAxis stroke="#A855F7" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid #A855F7', 
                    borderRadius: '8px' 
                  }} 
                />
                <Bar dataKey="leads" fill="#A855F7" name="Total Leads" />
                <Bar dataKey="sold" fill="#10B981" name="Sold" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Status Distribution */}
        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-purple-100">Lead Status Distribution</CardTitle>
            <CardDescription className="text-purple-100/70">
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
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="bg-black/40 border-purple-400/30 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-purple-100">Monthly Performance Trends</CardTitle>
            <CardDescription className="text-purple-100/70">
              Lead distribution and sales over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#7C3AED" opacity={0.3} />
                <XAxis dataKey="month" stroke="#A855F7" />
                <YAxis stroke="#A855F7" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid #A855F7', 
                    borderRadius: '8px' 
                  }} 
                />
                <Line type="monotone" dataKey="leadsDistributed" stroke="#A855F7" strokeWidth={2} name="Leads Distributed" />
                <Line type="monotone" dataKey="leadsSold" stroke="#10B981" strokeWidth={2} name="Leads Sold" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-purple-100 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Best Performing State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">{bestPerformingState.state}</div>
                <div className="text-sm text-purple-100/70">Conversion Rate</div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-400/50 text-lg px-3 py-1">
                {bestPerformingState.conversion}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-purple-100 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Needs Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-400">{worstPerformingState.state}</div>
                <div className="text-sm text-purple-100/70">Conversion Rate</div>
              </div>
              <Badge className="bg-red-500/20 text-red-400 border-red-400/50 text-lg px-3 py-1">
                {worstPerformingState.conversion}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
