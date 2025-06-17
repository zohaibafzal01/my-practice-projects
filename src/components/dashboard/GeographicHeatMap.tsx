
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Simplified US state data for the heat map
const statePerformance = {
  'CA': { leads: 3247, conversions: 689, rate: 21.2, revenue: 2847392 },
  'TX': { leads: 2856, conversions: 571, rate: 20.0, revenue: 2234758 },
  'FL': { leads: 2634, conversions: 542, rate: 20.6, revenue: 2156847 },
  'NY': { leads: 2156, conversions: 387, rate: 17.9, revenue: 1876234 },
  'IL': { leads: 1847, conversions: 354, rate: 19.2, revenue: 1645892 },
  'PA': { leads: 1654, conversions: 298, rate: 18.0, revenue: 1456234 },
  'OH': { leads: 1432, conversions: 267, rate: 18.6, revenue: 1298756 },
  'GA': { leads: 1298, conversions: 234, rate: 18.0, revenue: 1134567 }
};

const GeographicHeatMap = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'leads' | 'conversions' | 'rate'>('leads');

  const getStateColor = (stateCode: string) => {
    const data = statePerformance[stateCode as keyof typeof statePerformance];
    if (!data) return 'rgba(100, 100, 100, 0.3)';

    let intensity = 0;
    const maxValues = {
      leads: Math.max(...Object.values(statePerformance).map(d => d.leads)),
      conversions: Math.max(...Object.values(statePerformance).map(d => d.conversions)),
      rate: Math.max(...Object.values(statePerformance).map(d => d.rate))
    };

    intensity = data[viewMode] / maxValues[viewMode];

    const colors = {
      leads: `rgba(0, 212, 255, ${0.3 + intensity * 0.7})`,
      conversions: `rgba(0, 255, 179, ${0.3 + intensity * 0.7})`,
      rate: `rgba(255, 107, 53, ${0.3 + intensity * 0.7})`
    };

    return colors[viewMode];
  };

  const topPerformers = Object.entries(statePerformance)
    .sort((a, b) => b[1][viewMode] - a[1][viewMode])
    .slice(0, 5);

  const bottomPerformers = Object.entries(statePerformance)
    .sort((a, b) => a[1][viewMode] - b[1][viewMode])
    .slice(0, 3);

  return (
    <Card className="bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-xl shadow-cyan-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Geographic Performance Heat Map
            </CardTitle>
            <p className="text-cyan-100/70">State-by-state performance visualization</p>
          </div>
          <div className="flex space-x-2">
            {(['leads', 'conversions', 'rate'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  viewMode === mode
                    ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-400/50'
                    : 'text-gray-400 hover:text-white border border-transparent'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Simplified Heat Map Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-lg p-6 border border-gray-700/30">
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(statePerformance).map(([state, data]) => (
                  <div
                    key={state}
                    className="relative cursor-pointer p-4 rounded-lg border transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: getStateColor(state),
                      borderColor: selectedState === state ? '#00D4FF' : 'rgba(255,255,255,0.1)'
                    }}
                    onClick={() => setSelectedState(selectedState === state ? null : state)}
                  >
                    <div className="text-center">
                      <div className="font-bold text-white text-lg">{state}</div>
                      <div className="text-xs text-gray-200 mt-1">
                        {viewMode === 'leads' && `${data.leads.toLocaleString()} leads`}
                        {viewMode === 'conversions' && `${data.conversions} sales`}
                        {viewMode === 'rate' && `${data.rate}% rate`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Color intensity represents {viewMode} volume
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getStateColor('CA') }}></div>
                    <span className="text-xs text-gray-400">High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getStateColor('PA') }}></div>
                    <span className="text-xs text-gray-400">Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getStateColor('GA') }}></div>
                    <span className="text-xs text-gray-400">Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Rankings */}
          <div className="space-y-4">
            {/* Top Performers */}
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-400/20">
              <h4 className="font-semibold text-green-300 mb-3">Top Performers</h4>
              <div className="space-y-2">
                {topPerformers.map(([state, data], index) => (
                  <div key={state} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/50">
                        #{index + 1}
                      </Badge>
                      <span className="text-white font-medium">{state}</span>
                    </div>
                    <div className="text-green-300 font-semibold">
                      {viewMode === 'leads' && data.leads.toLocaleString()}
                      {viewMode === 'conversions' && data.conversions}
                      {viewMode === 'rate' && `${data.rate}%`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Performers */}
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-400/20">
              <h4 className="font-semibold text-red-300 mb-3">Needs Attention</h4>
              <div className="space-y-2">
                {bottomPerformers.map(([state, data]) => (
                  <div key={state} className="flex items-center justify-between">
                    <span className="text-white font-medium">{state}</span>
                    <div className="text-red-300 font-semibold">
                      {viewMode === 'leads' && data.leads.toLocaleString()}
                      {viewMode === 'conversions' && data.conversions}
                      {viewMode === 'rate' && `${data.rate}%`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected State Details */}
            {selectedState && statePerformance[selectedState as keyof typeof statePerformance] && (
              <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-400/20">
                <h4 className="font-semibold text-cyan-300 mb-3">{selectedState} Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Leads:</span>
                    <span className="text-white">{statePerformance[selectedState as keyof typeof statePerformance].leads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conversions:</span>
                    <span className="text-white">{statePerformance[selectedState as keyof typeof statePerformance].conversions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rate:</span>
                    <span className="text-white">{statePerformance[selectedState as keyof typeof statePerformance].rate}%</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-600 pt-2">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="text-green-300 font-semibold">
                      ${statePerformance[selectedState as keyof typeof statePerformance].revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeographicHeatMap;
