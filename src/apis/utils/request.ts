// eslint-disable-next-line no-undef
type Options = Omit<RequestInit, "body">;

type CreateOptions = {
  baseURL: string;
} & Options;

class Request {
  baseURL = "";
  options: Options = {};

  create(options?: CreateOptions) {
    const { baseURL, ...rest } = options || {};
    this.baseURL = baseURL || "";
    this.options = rest;

    return this;
  }

  get(url: string, options?: Options) {
    return this.fetch(this.baseURL + url, {
      method: "GET",
      ...this.options,
      ...options,
    });
  }

  // eslint-disable-next-line no-undef
  async fetch(url: string, options: RequestInit) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }
}

export const request = new Request();
