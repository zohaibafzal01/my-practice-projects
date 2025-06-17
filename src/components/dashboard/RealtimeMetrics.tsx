
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const RealtimeMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalLeads: 15847,
    pendingAssignment: 234,
    totalConversions: 3247,
    conversionRate: 20.5,
    replacedLeads: 89,
    activeAgents: 1284
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalLeads: prev.totalLeads + Math.floor(Math.random() * 3),
        pendingAssignment: Math.max(0, prev.pendingAssignment + Math.floor(Math.random() * 5) - 2),
        totalConversions: prev.totalConversions + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-cyan-300 mb-1">
            {metrics.totalLeads.toLocaleString()}
          </div>
          <div className="text-xs text-cyan-100/70">Total Leads</div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-md border border-orange-400/30 shadow-xl shadow-orange-500/10">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-300 mb-1">
            {metrics.pendingAssignment}
          </div>
          <div className="text-xs text-orange-100/70">Pending Assignment</div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-md border border-green-400/30 shadow-xl shadow-green-500/10">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-300 mb-1">
            {metrics.totalConversions.toLocaleString()}
          </div>
          <div className="text-xs text-green-100/70">Total Conversions</div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-md border border-purple-400/30 shadow-xl shadow-purple-500/10">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-300 mb-1">
            {metrics.conversionRate}%
          </div>
          <div className="text-xs text-purple-100/70">Conversion Rate</div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-md border border-red-400/30 shadow-xl shadow-red-500/10">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-red-300 mb-1">
            {metrics.replacedLeads}
          </div>
          <div className="text-xs text-red-100/70">Replaced Leads</div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-md border border-blue-400/30 shadow-xl shadow-blue-500/10">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-300 mb-1">
            {metrics.activeAgents.toLocaleString()}
          </div>
          <div className="text-xs text-blue-100/70">Active Agents</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealtimeMetrics;
