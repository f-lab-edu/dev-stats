// eslint-disable-next-line no-undef
type Options = Omit<RequestInit, "body">;

type CreateOptions = {
  baseURL: string;
} & Options;

class Request {
  baseURL: string;
  options: Options;

  constructor(options?: CreateOptions) {
    this.baseURL = options?.baseURL || "";
    this.options = options || {};
  }

  get(url: string, options?: Options) {
    return this.fetch(this.baseURL + url, {
      method: "GET",
      ...this.options,
      ...options,
    });
  }

  post(url: string, data: unknown, options?: Options) {
    return this.fetch(this.baseURL + url, {
      method: "POST",
      body: JSON.stringify(data),
      ...this.options,
      ...options,
    });
  }

  // eslint-disable-next-line no-undef
  private async fetch(url: string, options: RequestInit) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }

  static create(options: CreateOptions) {
    return new Request(options);
  }
}

const request = new Request();

export { request, Request };
