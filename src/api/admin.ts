import BaseApi from "./baseapi";

class AdminApi extends BaseApi {
  baseUrl: string = "admin";

  async updateAdminProfile(name: string, phoneNumber: string) {
    await this.put(`${this.baseUrl}/profile`, {
      name,
      phoneNumber,
    });
  }

  // Performance Analytics Endpoints with debugging
  async getPerformanceAnalytics(params?: {
    timeframe?: '7d' | '30d' | '90d' | '1y';
  }) {
    console.log('📡 API: Getting performance analytics with params:', params);
    
    const queryParams = new URLSearchParams();
    if (params?.timeframe) {
      queryParams.append('timeframe', params.timeframe);
    }
    
    const url = `${this.baseUrl}/analytics/performance${queryParams.toString() ? `?${queryParams}` : ''}`;
    console.log('📡 API: Requesting URL:', url);
    
    try {
      const result = await this.get(url);
      console.log('📡 API: Performance analytics response:', result);
      return result;
    } catch (error) {
      console.error('📡 API: Performance analytics error:', error);
      throw error;
    }
  }

  async getLeadsByRegion(timeframe?: '7d' | '30d' | '90d' | '1y') {
    console.log('📡 API: Getting leads by region with timeframe:', timeframe);
    
    const queryParams = new URLSearchParams();
    if (timeframe) {
      queryParams.append('timeframe', timeframe);
    }
    
    const url = `${this.baseUrl}/analytics/regions${queryParams.toString() ? `?${queryParams}` : ''}`;
    console.log('📡 API: Requesting URL:', url);
    
    try {
      const result = await this.get(url);
      console.log('📡 API: Leads by region response:', result);
      return result;
    } catch (error) {
      console.error('📡 API: Leads by region error:', error);
      throw error;
    }
  }

  async getAgentPerformance(
    limit: number = 10, 
    timeframe?: '7d' | '30d' | '90d' | '1y'
  ) {
    console.log('📡 API: Getting agent performance with limit:', limit, 'timeframe:', timeframe);
    
    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit.toString());
    if (timeframe) {
      queryParams.append('timeframe', timeframe);
    }
    
    const url = `${this.baseUrl}/analytics/agent-performance?${queryParams}`;
    console.log('📡 API: Requesting URL:', url);
    
    try {
      const result = await this.get(url);
      console.log('📡 API: Agent performance response:', result);
      return result;
    } catch (error) {
      console.error('📡 API: Agent performance error:', error);
      throw error;
    }
  }

  async getMonthlyTrends(months: number = 6) {
    console.log('📡 API: Getting monthly trends with months:', months);
    
    const url = `${this.baseUrl}/analytics/monthly-trends?months=${months}`;
    console.log('📡 API: Requesting URL:', url);
    
    try {
      const result = await this.get(url);
      console.log('📡 API: Monthly trends response:', result);
      return result;
    } catch (error) {
      console.error('📡 API: Monthly trends error:', error);
      throw error;
    }
  }

  async getConversionMetrics(
    groupBy: 'region' | 'agent' | 'source' | 'month' = 'region',
    timeframe?: '7d' | '30d' | '90d' | '1y'
  ) {
    console.log('📡 API: Getting conversion metrics with groupBy:', groupBy, 'timeframe:', timeframe);
    
    const queryParams = new URLSearchParams();
    queryParams.append('groupBy', groupBy);
    if (timeframe) {
      queryParams.append('timeframe', timeframe);
    }
    
    const url = `${this.baseUrl}/analytics/conversion-metrics?${queryParams}`;
    console.log('📡 API: Requesting URL:', url);
    
    try {
      const result = await this.get(url);
      console.log('📡 API: Conversion metrics response:', result);
      return result;
    } catch (error) {
      console.error('📡 API: Conversion metrics error:', error);
      throw error;
    }
  }

  // Dashboard Stats
  async getDashboardStats() {
    console.log('📡 API: Getting dashboard stats');
    
    const url = `${this.baseUrl}/dashboard/stats`;
    console.log('📡 API: Requesting URL:', url);
    
    try {
      const result = await this.get(url);
      console.log('📡 API: Dashboard stats response:', result);
      return result;
    } catch (error) {
      console.error('📡 API: Dashboard stats error:', error);
      throw error;
    }
  }
}

export const adminApi = new AdminApi();
export default adminApi;