import BaseApi from "./baseapi";

class AgentApi extends BaseApi {
  baseUrl: string = "agents";

  async getAllAgents(page = 1, search = "", status = "") {
    const query = new URLSearchParams({ page: page.toString() });

    if (search) query.append("search", search);
    if (status && status !== "all") {
      query.append("status", status.toUpperCase());
    }

    return await this.get(`${this.baseUrl}/?${query.toString()}`);
  }

  async agentSuspend(id: string) {
    await this.put(`${this.baseUrl}/${id}/suspend`, {});
  }

  async agentReactivate(id: string) {
    await this.put(`${this.baseUrl}/${id}/reactivate`, {});
  }

  async registerAgent(agentData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) {
    return await this.post(`${this.baseUrl}/register`, agentData);
  }

  async updateAgentProfile(payload: any) {
    await this.put(`${this.baseUrl}/profile`, payload);
  }

  async getPerformanceAnalytics(params?: {
    timeframe?: "7d" | "30d" | "90d" | "1y";
  }) {
    const queryParams = new URLSearchParams();
    if (params?.timeframe) {
      queryParams.append("timeframe", params.timeframe);
    }

    const url = `${this.baseUrl}/analytics/performance${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;

    try {
      const result = await this.get(url);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getLeadsByRegion(timeframe?: "7d" | "30d" | "90d" | "1y") {
    const queryParams = new URLSearchParams();
    if (timeframe) {
      queryParams.append("timeframe", timeframe);
    }

    const url = `${this.baseUrl}/analytics/leads-by-region${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;

    try {
      const result = await this.get(url);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMonthlyTrends(months: number = 6) {
    const url = `${this.baseUrl}/analytics/monthly-trends?months=${months}`;

    try {
      const result = await this.get(url);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getConversionMetrics(
    groupBy: "region" | "source" | "month" = "region",
    timeframe?: "7d" | "30d" | "90d" | "1y"
  ) {
    const queryParams = new URLSearchParams();
    queryParams.append("groupBy", groupBy);
    if (timeframe) {
      queryParams.append("timeframe", timeframe);
    }

    const url = `${this.baseUrl}/analytics/conversion-metrics?${queryParams}`;

    try {
      const result = await this.get(url);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getDashboardStats() {
    const url = `${this.baseUrl}/analytics/dashboard-stats`;

    try {
      const result = await this.get(url);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getRevenueAnalytics(timeframe?: "7d" | "30d" | "90d" | "1y") {
    const queryParams = new URLSearchParams();
    if (timeframe) {
      queryParams.append("timeframe", timeframe);
    }

    const url = `${this.baseUrl}/analytics/revenue-analytics${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;

    try {
      const result = await this.get(url);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async agentImos(searchTerm = "") {
    try {
      const response = await this.get(`${this.baseUrl}/search/imos`, {
        params: { search: searchTerm },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching IMOs:", error);
      throw error;
    }
  }
}

export const agentApi = new AgentApi();
export default agentApi;
