import { useReplacement } from "../hooks/useReplacement";
import type { Item } from "../interfaces/Quotation.response";
import { ContentLoading } from "./ContentLoading";
import { CustomPagination } from "./CustomPagination";
import { EmptyContent } from "./EmptyContent";
import { ReplacementCardModal } from "./ReplacementCardModal";
interface Prop{
   addItem: (newItem: Item) => void
}
export const ContentReplacementModal = ({addItem}: Prop) => {
  const { data: replacements, isLoading } = useReplacement();
  return (
    <div className="">
      <div className="mb-4">
        {isLoading ? (
          <ContentLoading />
        ) : replacements?.data.length === 0 ? (
          <EmptyContent />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {replacements?.data.map((product) => (
              <ReplacementCardModal
                key={product.id}
                id={product.id}
                photo={product.photo}
                product_code={product.product_code}
                brand_name={product.brand_name}
                measure_name={product.measure_name}
                product_description={product.product_description}
                calculated_price={product.calculated_price}
                handleAddItems={addItem}
              />
            ))}
          </div>
        )}
      </div>
      <CustomPagination
        next_cursor={replacements?.next_cursor}
        previous_cursor={replacements?.previous_cursor}
      />
    </div>
  );
};
