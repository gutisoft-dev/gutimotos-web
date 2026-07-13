import { Separator } from "@/components/ui/separator";
import { FilterBrands } from "./FilterBrands";
import { FilterColors } from "./FilterColors";
import { FilterCurrencies } from "./FilterCurrencies";
import { FilterTypePrice } from "./FilterTypePrice";
interface Props {
  replacement?: boolean;
  type: string;
}
export const FilterSidebar = ({ replacement, type }: Props) => {
  return (
    <div className="sticky top-20 w-full md:w-64 max-h-[calc(100vh-1rem)] overflow-y-auto space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4 hidden lg:block">Filtros</h3>
      </div>
      <FilterBrands type={type} />
      <Separator />
      {replacement && (
        <>
          <FilterCurrencies />
          <Separator />
          <FilterTypePrice />
          <Separator />
        </>
      )}
      {!replacement && <FilterColors />}
    </div>
  );
};
