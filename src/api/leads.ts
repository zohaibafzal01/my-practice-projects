import BaseApi from "./baseapi";

class LeadsApi extends BaseApi {
  baseUrl: string = "leads";

  async createLeads(formData: any) {
    return await this.post(`${this.baseUrl}/`, formData);
  }

  async getAllLeads(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    region?: string;
  }) {
    const queryParams = new URLSearchParams();

    if (typeof params?.page === "number") {
      queryParams.append("page", params?.page.toString());
    }

    if (typeof params?.limit === "number") {
      queryParams.append("limit", params?.limit.toString());
    }

    if (typeof params?.search === "string" && params?.search.trim() !== "") {
      queryParams.append("search", params?.search.trim());
    }

    if (typeof params?.status === "string" && params?.status.trim() !== "") {
      queryParams.append("status", params?.status.trim());
    }

    if (typeof params?.region === "string" && params?.region.trim() !== "") {
      queryParams.append("region", params?.region.trim());
    }

    const url = queryParams.toString()
      ? `${this.baseUrl}/?${queryParams.toString()}`
      : `${this.baseUrl}/`;

    return await this.get(url);
  }

  async leadsAssign(id: string, agentId: string) {
    await this.put(`${this.baseUrl}/${id}/assign`, { agentId });
  }

  async requestReplacement(id: string, reason: string) {
    await this.put(`${this.baseUrl}/${id}/request-replacement`, { reason });
  }

  async markLeadAsSold(
    id: string,
    saleData: {
      zipCode: string;
      annualSubmitAmount: number;
      insuranceCompany: string;
      product: string;
      notes?: string;
    }
  ) {
    return await this.put(`${this.baseUrl}/${id}/sold`, saleData);
  }

  async updateLeadStatus(id: string, status: string) {
    return await this.put(`${this.baseUrl}/${id}/status`, { status });
  }

  async getLeadById(id: string) {
    return await this.get(`${this.baseUrl}/${id}`);
  }

  async getAllReplacementRequestLeads() {
    return await this.get(`${this.baseUrl}/replacement-requests`);
  }

  async updateReplacementstatus(id: string, status: string, reason?: string) {
    return await this.put(`${this.baseUrl}/${id}/replacement-status`, {
      status, reason
    });
  }
}

export const leadsApi = new LeadsApi();
export default leadsApi;
