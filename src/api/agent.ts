import BaseApi from "./baseapi";

class AgentApi extends BaseApi {
  baseUrl: string = "agents";

  constructor() {
    super();
  }

  async getAllAgents(token: string) {
    return await this.get(`${this.baseUrl}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async agentSuspend(id: string, token: string) {
    await this.put(
      `${this.baseUrl}/${id}/suspend`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async agentReactivate(id: string, token: string) {
    await this.put(
      `${this.baseUrl}/${id}/reactivate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async registerAgent(agentData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) {
    const data = await this.post(`${this.baseUrl}/register`, agentData);
    return data;
  }
}

export const agentApi = new AgentApi();
export default agentApi;
