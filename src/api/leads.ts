import BaseApi from "./baseapi";

class LeadsApi extends BaseApi {
  baseUrl: string = "leads";

  constructor() {
    super();
  }

  async createLeads(formData: any, token: string) {
    const data = await this.post(`${this.baseUrl}/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  async getAllLeads(
    token: string,
    params?: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
      region?: string;
    }
  ) {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.status) queryParams.append("status", params.status);
    if (params?.region) queryParams.append("region", params.region);

    const url = queryParams.toString()
      ? `${this.baseUrl}/?${queryParams.toString()}`
      : `${this.baseUrl}/`;

    return await this.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async leadsAssign(id: string, agentId: string, token: string) {
    await this.put(
      `${this.baseUrl}/${id}/assign`,
      { agentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async requestReplacement(id: string, reason: string, token: string) {
    await this.put(
      `${this.baseUrl}/${id}/request-replacement`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async markLeadAsSold(
    id: string,
    saleData: {
      zipCode: string;
      annualSubmitAmount: number;
      insuranceCompany: string;
      product: string;
      notes?: string;
    },
    token: string
  ) {
    const data = await this.put(`${this.baseUrl}/${id}/sold`, saleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  async updateLeadStatus(id: string, status: string, token: string) {
    const data = await this.put(
      `${this.baseUrl}/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  async getLeadById(id: string, token: string) {
    return await this.get(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const leadsApi = new LeadsApi();
export default leadsApi;
