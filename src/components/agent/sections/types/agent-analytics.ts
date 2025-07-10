export interface AgentPerformanceData {
  totalLeadsAssigned: number;
  totalLeadsSold: number;
  overallConversionRate: number;
  leadsByRegion: Array<{
    region: string;
    assigned: number;
    sold: number;
    conversionRate: number;
    totalRevenue: number;
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
    leadsAssigned: number;
    leadsSold: number;
    conversionRate: number;
    totalRevenue: number;
  }>;
  bestPerformingRegion: {
    region: string;
    conversionRate: number;
  };
  totalRevenue: number;
  averageRevenuePerSale: number;
}

export interface AgentDashboardStats {
  totalLeadsAssigned: number;
  totalLeadsSold: number;
  totalRevenue: number;
  conversionRate: number;
  currentMonthSales: number;
  previousMonthSales: number;
  salesGrowth: number;
  activeLeads: number;
  recentActivity: Array<{
    type: string;
    message: string;
    timestamp: string;
  }>;
}

export interface AgentRevenueAnalytics {
  totalRevenue: number;
  totalSales: number;
  averageRevenue: number;
  minRevenue: number;
  maxRevenue: number;
  revenueByRegion: Array<{
    region: string;
    revenue: number;
  }>;
}