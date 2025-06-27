const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Products API
  async getProducts() {
    return this.request<any[]>('/api/products');
  }

  async createProduct(productData: any) {
    return this.request<any>('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: any) {
    return this.request<any>(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string) {
    return this.request<{ message: string }>(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Courses API
  async getCourses() {
    return this.request<any[]>('/api/courses');
  }

  async createCourse(courseData: any) {
    return this.request<any>('/api/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(id: string, courseData: any) {
    return this.request<any>(`/api/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(id: string) {
    return this.request<{ message: string }>(`/api/courses/${id}`, {
      method: 'DELETE',
    });
  }

  // Repairs API
  async getRepairs() {
    return this.request<any[]>('/api/repairs');
  }

  async createRepair(repairData: any) {
    return this.request<any>('/api/repairs', {
      method: 'POST',
      body: JSON.stringify(repairData),
    });
  }

  async updateRepair(id: string, repairData: any) {
    return this.request<any>(`/api/repairs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(repairData),
    });
  }

  async deleteRepair(id: string) {
    return this.request<{ message: string }>(`/api/repairs/${id}`, {
      method: 'DELETE',
    });
  }

  // Testimonials API
  async getTestimonials() {
    return this.request<any[]>('/api/testimonials');
  }

  async createTestimonial(testimonialData: any) {
    return this.request<any>('/api/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonialData),
    });
  }

  async updateTestimonial(id: string, testimonialData: any) {
    return this.request<any>(`/api/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonialData),
    });
  }

  async deleteTestimonial(id: string) {
    return this.request<{ message: string }>(`/api/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Contacts API
  async getContacts() {
    return this.request<any[]>('/api/contacts');
  }

  async createContact(contactData: any) {
    return this.request<any>('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async updateContact(id: string, contactData: any) {
    return this.request<any>(`/api/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    });
  }

  async deleteContact(id: string) {
    return this.request<{ message: string }>(`/api/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // DateUser API
  async getDateUsers() {
    return this.request<any[]>('/api/date-users');
  }

  async createDateUser(dateUserData: any) {
    return this.request<any>('/api/date-users', {
      method: 'POST',
      body: JSON.stringify(dateUserData),
    });
  }

  async updateDateUser(id: string, dateUserData: any) {
    return this.request<any>(`/api/date-users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dateUserData),
    });
  }

  async deleteDateUser(id: string) {
    return this.request<{ message: string }>(`/api/date-users/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService(API_BASE_URL); 