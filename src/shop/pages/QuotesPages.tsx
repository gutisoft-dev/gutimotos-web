import { ContentLoading } from "../components/ContentLoading";
import { EmptyContent } from "../components/EmptyContent";
import { QuotationsView } from "../components/QuotationsView";
import { useQuotations } from "../hooks/useQuotations";

export const QuotesPages = () => {
  const { data, isLoading } = useQuotations();
  return (
    <section className="py-4 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h4 className="text-2xl font-light">Cotizaciones</h4>
          </div>
        </div>
        <div className="flex gap-8">
         
          <div className="flex-1">
            {isLoading ? (
              <ContentLoading />
            ) : data && data?.data?.results.length === 0 ? (
              <EmptyContent />
            ) : (
              data && <QuotationsView quotations={data?.data?.results} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
