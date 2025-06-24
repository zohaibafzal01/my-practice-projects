import BaseApi from "./baseapi";

export default class AgentApi extends BaseApi {
  baseUrl: string = "api/v1/";

  constructor() {
    super();
  }

  async getAllAgents() {
    const data = await this.get(`${this.baseUrl}agents`,);
    return data;
  }
}
