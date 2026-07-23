import { useNavigate, useSearchParams } from "react-router";
import { DetailsQuotationView } from "../components/DetailsQuotationView";
import { IoIosArrowBack } from "react-icons/io";
export const DetailsQuotesPages = () => {
  const [searchParams] = useSearchParams();
 const navigate = useNavigate();
  const id = searchParams.get("id");
  return (
    <div className="container mx-auto p-2">
      <span className="flex items-center gap-2 cursor-pointer hover:underline underline-offset-4 my-2" onClick={() => navigate(-1)}> <IoIosArrowBack /> Atras</span>
      <h4 className="text-2xl font-light">Cotización</h4>
      <DetailsQuotationView quotationId={id || ""} />
    </div>
  );
};
