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
    <div className=" space-y-6">
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
