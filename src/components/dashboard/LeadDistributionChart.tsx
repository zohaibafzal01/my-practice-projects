
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const leadData = [
  { state: 'CA', totalLeads: 3247, conversions: 689, replaced: 23 },
  { state: 'TX', totalLeads: 2856, conversions: 571, replaced: 18 },
  { state: 'FL', totalLeads: 2634, conversions: 542, replaced: 31 },
  { state: 'NY', totalLeads: 2156, conversions: 387, replaced: 12 },
  { state: 'IL', totalLeads: 1847, conversions: 354, replaced: 28 },
  { state: 'PA', totalLeads: 1654, conversions: 298, replaced: 15 },
  { state: 'OH', totalLeads: 1432, conversions: 267, replaced: 22 },
  { state: 'GA', totalLeads: 1298, conversions: 234, replaced: 19 }
];

const LeadDistributionChart = () => {
  return (
    <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Lead Distribution by State
        </CardTitle>
        <p className="text-cyan-100/70">Total leads, conversions, and replacements per state</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="state" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Bar dataKey="totalLeads" fill="#00D4FF" name="Total Leads" />
              <Bar dataKey="conversions" fill="#00FFB3" name="Conversions" />
              <Bar dataKey="replaced" fill="#FF6B35" name="Replaced" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadDistributionChart;
