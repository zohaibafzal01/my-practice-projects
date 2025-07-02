import BaseApi from "./baseapi";

class AgentApi extends BaseApi {
  baseUrl: string = "agents";

  async getAllAgents(page = 1) {
    return await this.get(`${this.baseUrl}/?page=${page}`);
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
}

export const agentApi = new AgentApi();
export default agentApi;
