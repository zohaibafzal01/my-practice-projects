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
}
