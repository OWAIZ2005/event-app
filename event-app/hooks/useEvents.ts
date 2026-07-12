import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiFetch } from "../utils/apiClient";

export const useEvents = (filters: any = {}) => {
  return useInfiniteQuery({
    queryKey: ["events", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = new URLSearchParams({
        page: pageParam.toString(),
        limit: "10",
        ...filters,
      });
      return apiFetch(`/events?${queryParams.toString()}`);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const useMyFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => apiFetch("/users/favorites"),
  });
};
