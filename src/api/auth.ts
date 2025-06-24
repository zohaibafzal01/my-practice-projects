import BaseApi from "./baseapi";

export default class AuthApi extends BaseApi {
  baseUrl: string = "api/v1/auth/";

  constructor() {
    super();
  }

  async login(email: string, password: string) {
    const data = await this.post(`${this.baseUrl}login`, {
      email,
      password,
    });
    return data;
  }

  // async register(email: string, password: string, fullName: string) {
  //   const data = await this.post(`${this.baseUrl}register`, {
  //     email,
  //     password,
  //     fullName,
  //   });
  //   return data;
  // }

  // async logout() {
  //   const data = await this.post(`${this.baseUrl}logout`, {});
  //   return data;
  // }

  // async verifyToken() {
  //   const data = await this.get(`${this.baseUrl}verify`);
  //   return data;
  // }
}
