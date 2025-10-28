import { useInfiniteQuery } from "@tanstack/react-query";
import { getColors } from "../actions/get-color.action";

export const useColor = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["color"],
      queryFn: ({ pageParam }) => {
        return getColors(pageParam.toString());
      },
      getNextPageParam: (lastPage) => lastPage.next_page ?? undefined,
      staleTime: 0,
    });

  return {
    data: data?.pages.flatMap((page) => page.results) ?? [],
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
