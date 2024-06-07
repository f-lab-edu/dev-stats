type Options = Omit<RequestInit, "body">;

type CreateOptions = {
  baseURL: string;
} & Options;

class Request {
  private baseURL: string;
  private options: Options;

  constructor(options?: CreateOptions) {
    const { baseURL, ...otherOptions } = options || {};
    this.baseURL = baseURL || "";
    this.options = otherOptions;
  }

  create(options?: CreateOptions) {
    return new Request(options);
  }

  get(url: string, options?: Options) {
    const fullUrl = this.constructURL(url);
    return this.fetch(fullUrl, {
      method: "GET",
      ...this.options,
      ...options,
    });
  }

  post(url: string, data: unknown, options?: Options) {
    const fullUrl = this.constructURL(url);
    return this.fetch(fullUrl, {
      method: "POST",
      body: JSON.stringify(data),
      ...this.options,
      ...options,
    });
  }

  private constructURL(url: string) {
    if (this.baseURL === "") {
      return url;
    }

    return new URL(url, this.baseURL).href;
  }

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
}

const request = new Request();

export { request };
