
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const leadPerformanceData = [
  { 
    state: 'CA', 
    totalLeads: 3247, 
    conversions: 689, 
    replaced: 23, 
    conversionRate: 21.2, 
    avgPremium: 4134,
    status: 'excellent' 
  },
  { 
    state: 'TX', 
    totalLeads: 2856, 
    conversions: 571, 
    replaced: 18, 
    conversionRate: 20.0, 
    avgPremium: 3914,
    status: 'good' 
  },
  { 
    state: 'FL', 
    totalLeads: 2634, 
    conversions: 542, 
    replaced: 31, 
    conversionRate: 20.6, 
    avgPremium: 3978,
    status: 'good' 
  },
  { 
    state: 'NY', 
    totalLeads: 2156, 
    conversions: 387, 
    replaced: 12, 
    conversionRate: 17.9, 
    avgPremium: 4847,
    status: 'average' 
  },
  { 
    state: 'IL', 
    totalLeads: 1847, 
    conversions: 354, 
    replaced: 28, 
    conversionRate: 19.2, 
    avgPremium: 4651,
    status: 'average' 
  },
  { 
    state: 'PA', 
    totalLeads: 1654, 
    conversions: 298, 
    replaced: 15, 
    conversionRate: 18.0, 
    avgPremium: 4235,
    status: 'average' 
  },
  { 
    state: 'OH', 
    totalLeads: 1432, 
    conversions: 267, 
    replaced: 22, 
    conversionRate: 18.6, 
    avgPremium: 3892,
    status: 'average' 
  },
  { 
    state: 'GA', 
    totalLeads: 1298, 
    conversions: 234, 
    replaced: 19, 
    conversionRate: 18.0, 
    avgPremium: 3756,
    status: 'average' 
  }
];

const LeadPerformanceTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('totalLeads');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredData = leadPerformanceData
    .filter(item => item.state.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aVal = a[sortField as keyof typeof a];
      const bVal = b[sortField as keyof typeof b];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

  const getStatusBadge = (status: string) => {
    const colors = {
      excellent: 'bg-green-500/20 text-green-300 border-green-400/50',
      good: 'bg-blue-500/20 text-blue-300 border-blue-400/50',
      average: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50',
      poor: 'bg-red-500/20 text-red-300 border-red-400/50'
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors] || colors.average}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              State Performance Analysis
            </CardTitle>
            <p className="text-cyan-100/70">Detailed breakdown of lead performance by state</p>
          </div>
          <div className="w-64">
            <Input
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800/50 border-cyan-400/30 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-gray-700/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800/30 border-gray-700/50">
                <TableHead className="text-cyan-200">State</TableHead>
                <TableHead className="text-cyan-200">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('totalLeads')}
                    className="text-cyan-200 hover:text-cyan-100 p-0"
                  >
                    Total Leads {sortField === 'totalLeads' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </Button>
                </TableHead>
                <TableHead className="text-cyan-200">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('conversions')}
                    className="text-cyan-200 hover:text-cyan-100 p-0"
                  >
                    Conversions {sortField === 'conversions' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </Button>
                </TableHead>
                <TableHead className="text-cyan-200">Replaced</TableHead>
                <TableHead className="text-cyan-200">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('conversionRate')}
                    className="text-cyan-200 hover:text-cyan-100 p-0"
                  >
                    Conversion Rate {sortField === 'conversionRate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </Button>
                </TableHead>
                <TableHead className="text-cyan-200">Avg Premium</TableHead>
                <TableHead className="text-cyan-200">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.state} className="border-gray-700/50 hover:bg-gray-800/20">
                  <TableCell className="font-medium text-white">{item.state}</TableCell>
                  <TableCell className="text-cyan-300">{item.totalLeads.toLocaleString()}</TableCell>
                  <TableCell className="text-green-300">{item.conversions.toLocaleString()}</TableCell>
                  <TableCell className="text-orange-300">{item.replaced}</TableCell>
                  <TableCell className={`font-semibold ${
                    item.conversionRate > 20 ? 'text-green-400' : 
                    item.conversionRate > 18 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {item.conversionRate}%
                  </TableCell>
                  <TableCell className="text-purple-300">${item.avgPremium.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadPerformanceTable;
