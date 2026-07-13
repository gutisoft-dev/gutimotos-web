import {  useQuery } from "@tanstack/react-query";
import { getQuotations } from "../actions/quotation.actions";
import type { QuotationResponse } from "../interfaces/Quotation.response";

export const useQuotations = () => {
  const { data, isLoading } = useQuery<QuotationResponse>({
    queryKey: ["quotations"],
    queryFn: () => getQuotations(),
    retry: 2,
    staleTime: 1000 * 60 * 60 * 24,
  });
  return {
    data: data,
    isLoading,
  };
};
