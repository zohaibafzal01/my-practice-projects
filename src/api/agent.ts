// @/api/agent.ts
import BaseApi from "./baseapi";

export default class AgentApi extends BaseApi {
  baseUrl: string = "api/v1/";

  constructor() {
    super();
  }

  async getAllAgents(token: string) {
    return await this.get(`${this.baseUrl}agents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async agentSuspend(id: string, token: string) {
    await this.put(
      `${this.baseUrl}agents/${id}/suspend`,
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
      `${this.baseUrl}agents/${id}/reactivate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
