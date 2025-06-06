import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCards } from "../services/pokemonTcgApi";

export function useInfiniteCardSearch(searchTerm: string) {
    return useInfiniteQuery({
        queryKey: ['cards', searchTerm],
            queryFn: ({ pageParam = 1 }) => {
              if (typeof pageParam === 'number') {
                return fetchCards(searchTerm, pageParam);
              } else {
                throw new Error('Invalid pageParam type');
              }
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, pages) => {
              const nextPage = pages.length + 1;
              const hasMore = lastPage.length === 15;
              return hasMore ? nextPage : undefined;
            },
            enabled: searchTerm.trim() !== "",
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false
    })
}