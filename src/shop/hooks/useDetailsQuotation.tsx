import { useQuery } from "@tanstack/react-query";
import { getDetailsQuotation } from "../actions/quotation.actions";
import type { DetailsQuotation } from "../interfaces/Quotation.response";
import { useSearchParams } from "react-router";

export const useDetailsQuotation = (id: string) => {
  const [searchParams] = useSearchParams();
const page = searchParams.get('page') || "1";

  const { data, isLoading, refetch } = useQuery<DetailsQuotation>({
    queryKey: ["details-quotation", {id,page}],
    queryFn: () => getDetailsQuotation(id,page),
    enabled: !!id,
    retry: 2,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
