import BaseApi from "./baseapi";

class TestimonialsApi extends BaseApi {
  baseUrl: string = "testimonials";

  async createTestimonials(
    companyName: string,
    designation: string,
    notes: string,
    leadId: string,
    stars: number
  ) {
    return await this.post(`${this.baseUrl}`, {
      companyName,
      designation,
      notes,
      leadId,
      stars,
    });
  }

  async getTestimonials(page = 1, search = "") {
    const query = new URLSearchParams({
      page: page.toString(),
      search: search.trim(),
    }).toString();

    return await this.get(`${this.baseUrl}?${query}`);
  }

  async getPublicTestimonials() {
    return await this.get(`${this.baseUrl}/public`);
  }

  async approveAndRejectTestimonials(
    id: string,
    status: string,
    rejectionReason?: string
  ) {
    return await this.put(`${this.baseUrl}/${id}/approve`, {
      status,
      ...(status === "REJECTED" && { rejectionReason }),
    });
  }
}

export const testimonialsApi = new TestimonialsApi();
export default testimonialsApi;
