import BaseApi from "./baseapi";

class UserApi extends BaseApi {
  baseUrl: string = "users";

  async forgotPassword(email: string) {
    return await this.post(`${this.baseUrl}/forgot-password`, { email });
  }

  async verifyResetOtp(email: string, otp: string) {
    return await this.post(`${this.baseUrl}/verify-reset-otp`, { email, otp });
  }

  async resetPassword(email: string, otp: string, password: string) {
    return await this.post(`${this.baseUrl}/reset-password`, {
      email,
      otp,
      password,
    });
  }
}

export const userApi = new UserApi();
export default userApi;
