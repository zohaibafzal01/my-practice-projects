import BaseApi from "./baseapi";

class AdminApi extends BaseApi {
  baseUrl: string = "admin";

  async updateAdminProfile(name: string, phoneNumber: string) {
    await this.put(`${this.baseUrl}/profile`, {
      name,
      phoneNumber,
    });
  }
}

export const adminApi = new AdminApi();
export default adminApi;
