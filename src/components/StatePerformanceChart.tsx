
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { state: 'CA', value: 2847, color: '#00D4FF' },
  { state: 'TX', value: 2634, color: '#00FFB3' },
  { state: 'FL', value: 2156, color: '#39FF14' },
  { state: 'NY', value: 1892, color: '#FF6B35' },
  { state: 'IL', value: 1654, color: '#FF1493' },
  { state: 'PA', value: 1487, color: '#FFD700' },
  { state: 'OH', value: 1298, color: '#FF69B4' },
  { state: 'GA', value: 1187, color: '#9370DB' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const StatePerformanceChart = () => {
  return (
    <Card className="card-glass">
      <CardHeader>
        <CardTitle className="text-2xl font-bold gradient-text">Top Performing States</CardTitle>
        <p className="text-gray-400">Real-time policy volume by state</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [value, 'Policies']}
                labelFormatter={(label: any) => `State: ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value: any) => `${value}`}
                wrapperStyle={{
                  paddingTop: '20px',
                  color: '#9CA3AF'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-lg bg-dark-surface/50">
            <div className="text-2xl font-bold text-electric-blue">$127M</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-dark-surface/50">
            <div className="text-2xl font-bold text-electric-teal">+23%</div>
            <div className="text-sm text-gray-400">Month Growth</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatePerformanceChart;
