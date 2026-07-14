import { useSearchParams } from "react-router";
import { DetailsQuotationView } from "../components/DetailsQuotationView";

export const DetailsQuotesPages = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  return (
    <div className="container mx-auto p-2">
      <h4 className="text-2xl font-light">Lista de productos</h4>
      <DetailsQuotationView quotationId={id || ""} />
    </div>
  );
};
