import { renderHook } from "@testing-library/react-hooks";
import { useSearchUserQuery } from "@/hooks";
import { getUsersBySearchQuery } from "../../apis/getUsersBySearchQuery";

jest.mock("../../apis/getUsersBySearchQuery");

const mockGetUsersBySearchQuery = getUsersBySearchQuery as jest.Mock;

describe("useSearchUserQuery", () => {
  const mockResponse = {
    items: [
      { id: 1, name: "sossost" },
      { id: 2, name: "sossost1" },
      { id: 3, name: "sossost2" },
      { id: 4, name: "sossost3" },
      { id: 5, name: "sossost4" },
      { id: 6, name: "sossost5" },
      { id: 7, name: "sossost6" },
    ],
  };

  it("should fetch and set search results", async () => {
    mockGetUsersBySearchQuery.mockResolvedValueOnce(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchUserQuery("sossost"),
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.searchedUsers).toEqual(
      mockResponse.items.slice(0, 5),
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should abort fetch on unmount", async () => {
    mockGetUsersBySearchQuery.mockResolvedValueOnce(mockResponse);

    const { result, unmount } = renderHook(() => useSearchUserQuery("sossost"));

    expect(result.current.isLoading).toBe(true);

    unmount();

    const abortController = mockGetUsersBySearchQuery.mock.calls[0][1].signal;
    expect(abortController.aborted).toBe(true);
  });

  it("should set error on fetch failure", async () => {
    const mockError = new Error("Fetch failed");
    mockGetUsersBySearchQuery.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchUserQuery("sossost"),
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isError).toBe(true);
    expect(result.current.searchedUsers).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});
