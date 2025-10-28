import { useSearchParams } from "react-router";
import { useColor } from "../hooks/useColor";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const FilterColors = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useColor();
  const [searchParams, setSearchParams] = useSearchParams();

  const colors = searchParams.get("color") || "any";
  const handleColorChange = (color: string) => {
    if (color.toString() === colors) {
      searchParams.delete("color");
      setSearchParams(searchParams);
      return;
    }
    searchParams.set("color", color);
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Colores</h4>
      <div className="grid grid-cols-2 gap-2">
        {data.map((color) => (
          <div
            key={color.id}
            onClick={() => handleColorChange(color.id.toString())}
            className={`inline-flex items-center justify-start h-8 px-3 rounded-md border text-sm cursor-pointer
      ${
        colors === color.id.toString()
          ? "bg-secondary text-secondary-foreground"
          : "border-input bg-transparent"
      }`}
          >
            <Checkbox
              style={{
                backgroundColor:
                  colors === color.id.toString()
                    ? `#${color.code_hex}`
                    : undefined,
                borderColor:
                  colors === color.id.toString()
                    ? `#${color.code_hex}`
                    : undefined,
              }}
              checked={colors === color.id.toString()}
            />
            <span className="ml-2">
              {color.name.length > 7
                ? color.name.slice(0, 7) + "..."
                : color.name}
            </span>
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
