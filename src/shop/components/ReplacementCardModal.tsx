import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "react-router";
import type { Item } from "../interfaces/Quotation.response";

interface Props {
  id: number;
  photo: string;
  product_code: string;
  brand_name: string | null;
  measure_name: string;
  product_description: string;
  calculated_price: number;
  handleAddItems: (item: Item) => void;
}

export const ReplacementCardModal = ({
  photo,
  product_code,
  brand_name,
  measure_name,
  product_description,
  calculated_price,
  handleAddItems,
}: Props) => {
  const [searchParams] = useSearchParams();

  const currency = searchParams.get("currency_code") || "BOB";

  return (
    <Card className="group rounded-md border shadow-none product-card-hover cursor-pointer h-full">
      <CardContent className={`p-0 h-full flex flex-col`}>
        <div
          className={
            "relative overflow-hidden bg-muted  rounded-md  border m-2 aspect-square"
          }
        >
          <LazyLoadImage
            src={photo}
            className={
              " w-full h-full  object-cover transition-transform duration-300 group-hover:scale-105"
            }
          />

          <div className="image-overlay" />
        </div>

        {/* Contenido */}
        <div className="flex flex-col justify-between flex-1 pt-6 px-4 pb-4">
          {/* Info */}
          <div className="space-y-1">
            <h3 className="font-medium text-sm tracking-tight line-clamp-2">
              {product_description}
            </h3>
            <p className="text-xs text-muted-foreground uppercase">
              {brand_name} {brand_name && "-"} {measure_name}
            </p>
            <p className="text-xs text-muted-foreground uppercase">
              {product_code}
            </p>
            <p className="font-medium">
              <span>
                {calculated_price ? currency + " " + calculated_price : ""}
              </span>
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button
              size="sm"
              variant="default"
              onClick={() =>
                handleAddItems({
                  product_code,
                  product_description,
                  quantity: 1,
                  subtotal: calculated_price.toString(),
                  unit_price: calculated_price.toString(),
                })
              }
              className=" w-full cursor-pointer transition-all duration-300 border-primary/20 text-xs px-4 py-2 h-8"
            >
              Agregar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
