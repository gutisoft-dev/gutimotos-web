import { useQuery } from "@tanstack/react-query";
import { getDetailsQuotation } from "../actions/quotation.actions";
import type { DetailsQuotation } from "../interfaces/Quotation.response";

export const useDetailsQuotation = (id: string) => {
  const { data, isLoading,refetch } = useQuery<DetailsQuotation>({
    queryKey: ["details-quotation", id],
    queryFn: () => getDetailsQuotation(id),
    enabled: !!id,
    retry: 2,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    data: data?.data,
    isLoading,
    refetch
  };
};
