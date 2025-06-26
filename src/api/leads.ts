import BaseApi from "./baseapi";

export default class LeadsApi extends BaseApi {
  baseUrl: string = "api/v1/";

  constructor() {
    super();
  }

  async createLeads(formData: any, token: string) {
    const data = await this.post(`${this.baseUrl}leads`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  async getAllLeads(token: string) {
    return await this.get(`${this.baseUrl}leads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async leadsAssign(id: string, agentId: string, token: string) {
    await this.put(
      `${this.baseUrl}leads/${id}/assign`,
      { agentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
