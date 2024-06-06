import { request } from "@/apis/utils/request";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Request class", () => {
  const baseUrl = "http://example.com";
  let baseRequest: typeof request;

  beforeEach(() => {
    baseRequest = request.create({ baseURL: baseUrl });
  });

  describe("get method", () => {
    it("should fetch data with GET method", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: "123" }));

      const response = await baseRequest.get("/data");

      expect(fetchMock).toHaveBeenCalledWith("http://example.com/data", {
        method: "GET",
      });
      expect(response).toEqual({ data: "123" });
    });
  });

  describe("post method", () => {
    it("should send data with POST method", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
      const dataToSend = { key: "value" };

      const response = await baseRequest.post("/submit", dataToSend);

      expect(fetchMock).toHaveBeenCalledWith("http://example.com/submit", {
        method: "POST",
        body: JSON.stringify(dataToSend),
      });
      expect(response).toEqual({ success: true });
    });
  });
});
