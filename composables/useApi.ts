
type Methods = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
};

export default class Api {
  private loadingStore = useLoadingStore();

  // General API call method
  async call(path: string, method: Methods['method'], query?: object, body?: object): Promise<object> {
    const baseUrl = useRuntimeConfig().public.apiBase;
    const headers: any = {
      'Content-Type': 'application/json', // Add content type for requests
    };
    
    const options = {
      method: method,
      headers: headers,
      baseURL: baseUrl,
      query,    // For GET requests
      body      // For POST, PUT, PATCH requests
    };

    this.loadingStore.startLoading();
    try {
      return await $fetch(path, options);
    } finally {
      this.loadingStore.stopLoading();
    }
  }

  // CRUD: Create (POST)
  async create(path: string, body: object): Promise<object> {
    return await this.call(path, 'POST', undefined, body);
  }

  // CRUD: Read (GET)
  async read(path: string, query?: object): Promise<object> {
    return await this.call(path, 'GET', query);
  }

  // CRUD: Update (PUT)
  async update(path: string, body: object): Promise<object> {
    return await this.call(path, 'PUT', undefined, body);
  }

  // CRUD: Delete (DELETE)
  async delete(path: string, query?: object): Promise<object> {
    return await this.call(path, 'DELETE', query);
  }

  // Login method
  async login(credentials: { username: string; password: string }): Promise<object> {
    return await this.create('/api/auth/login', credentials);
  }
}
