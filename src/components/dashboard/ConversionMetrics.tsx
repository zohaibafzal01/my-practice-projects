
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const conversionData = [
  { state: 'CA', conversions: 689, totalLeads: 3247, rate: 21.2, revenue: 2847392 },
  { state: 'TX', conversions: 571, totalLeads: 2856, rate: 20.0, revenue: 2234758 },
  { state: 'FL', conversions: 542, totalLeads: 2634, rate: 20.6, revenue: 2156847 },
  { state: 'NY', conversions: 387, totalLeads: 2156, rate: 17.9, revenue: 1876234 },
  { state: 'IL', conversions: 354, totalLeads: 1847, rate: 19.2, revenue: 1645892 }
];

const ConversionMetrics = () => {
  const totalRevenue = conversionData.reduce((sum, state) => sum + state.revenue, 0);
  const avgConversionRate = conversionData.reduce((sum, state) => sum + state.rate, 0) / conversionData.length;

  return (
    <Card className="bg-black/40 backdrop-blur-md border border-green-400/30 shadow-xl shadow-green-500/10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
          Conversion Performance
        </CardTitle>
        <p className="text-green-100/70">State-by-state conversion rates and revenue</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-400/20">
            <div className="text-2xl font-bold text-green-300">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-green-100/70">Total Revenue</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
            <div className="text-2xl font-bold text-emerald-300">
              {avgConversionRate.toFixed(1)}%
            </div>
            <div className="text-sm text-emerald-100/70">Avg Conversion Rate</div>
          </div>
        </div>

        <div className="space-y-3">
          {conversionData.map((state) => (
            <div key={state.state} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-700/50">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="border-cyan-400/50 text-cyan-300">
                  {state.state}
                </Badge>
                <div>
                  <div className="text-sm font-medium text-white">
                    {state.conversions} / {state.totalLeads} conversions
                  </div>
                  <div className="text-xs text-gray-400">
                    ${state.revenue.toLocaleString()} revenue
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  state.rate > 20 ? 'text-green-400' : 
                  state.rate > 18 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {state.rate}%
                </div>
                <div className="text-xs text-gray-400">conversion rate</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionMetrics;
