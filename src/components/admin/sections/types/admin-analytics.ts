export interface PerformanceData {
  totalLeadsDistributed: number;
  totalLeadsSold: number;
  totalLeadsCreated: number;
  overallConversionRate: number;
  activeAgents: number;
  inactiveAgents: number;
  leadsByRegion: Array<{
    region: string;
    total: number;
    distributed: number;
    sold: number;
    unassigned: number;
    conversionRate: number;
  }>;
  conversionByRegion: Array<{
    region: string;
    conversionRate: number;
  }>;
  leadStatusDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  monthlyTrends: Array<{
    month: string;
    leadsCreated: number;
    leadsDistributed: number;
    leadsSold: number;
    conversionRate: number;
  }>;
  bestPerformingRegion: {
    region: string;
    conversionRate: number;
  };
  worstPerformingRegion: {
    region: string;
    conversionRate: number;
  };
}
