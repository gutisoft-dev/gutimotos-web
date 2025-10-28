import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";
import { useBrands } from "../hooks/useBrands";
import { Checkbox } from "@/components/ui/checkbox";
interface Props {
  type: string;
}

export const FilterBrands = ({type}:Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useBrands(type);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentbrand = searchParams.get("brand") || "";

  const handleBrandChanged = (idbrand: number) => {
    if (idbrand.toString() === currentbrand) {
      searchParams.delete("brand");
      setSearchParams(searchParams);
      return;
    }
    searchParams.set("brand", idbrand.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Marcas</h4>
      <div className="grid grid-cols-2 gap-2">
        {data.map((brand) => (
          <div
            key={brand.id}
            onClick={() => handleBrandChanged(brand.id)}
            className={`inline-flex items-center justify-start h-8 px-3 rounded-md border text-sm cursor-pointer
      ${
        currentbrand === brand.id.toString()
          ? "bg-secondary text-secondary-foreground"
          : "border-input bg-transparent"
      }`}
          >
            <Checkbox checked={currentbrand === brand.id.toString()} />
            <span className="ml-2">{brand.name}</span>
          </div>
        ))}
      </div>
      <Button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
        className="w-full cursor-pointer"
        variant="secondary"
      >
        Ver mas
      </Button>
    </div>
  );
};
