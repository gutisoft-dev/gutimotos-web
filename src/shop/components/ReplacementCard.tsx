import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router";
import { useProductStore } from "../store/product.store";
import clsx from "clsx";
import { ContentImg } from "./ContentImg";

interface Props {
  id: number;
  product: string;
  photo: string;
  product_code: string;
  brand_name: string | null;
  measure_name: string;
  product_description: string;
  calculated_price: number;
  setOpenDialog: (open: boolean) => void;
  setProduct_description: (description: string) => void;
}

export const ReplacementCard = ({
  id,
  photo,
  product_code,
  product_description,
  brand_name,
  measure_name,
  calculated_price,
  setOpenDialog,
  setProduct_description,
}: Props) => {
  const navigate = useNavigate();
  const { authStatus } = useAuthStore();
  const [searchParams] = useSearchParams();
  const { setProduct, setIdSlug } = useProductStore();
  const viewMode = searchParams.get("viewMode") || "grid";

  const currency = searchParams.get("currency_code") || "BOB";

  const handleOpenDialog = () => {
    if (authStatus === "not-authenticated") {
      return navigate("/auth/login");
    }
    setIdSlug(id.toString());
    setProduct(id.toString());
    setProduct_description(product_description);
    setOpenDialog(true);
  };

  return (
    <Card className="group rounded-md border shadow-none product-card-hover cursor-pointer h-full">
      <CardContent
        className={`p-0 h-full ${
          viewMode === "list" ? "flex flex-row" : "flex flex-col"
        }`}
      >
        {/* Imagen */}
        <div
          className={clsx(
            "relative overflow-hidden bg-muted  rounded-md  border m-2",
            viewMode === "list" ? "w-50 h-50" : "aspect-square"
          )}
        >
          {/* <LazyLoadImage
            src={photo}
            className={clsx(
              viewMode === "list" ? "w-50 h-50" : "w-full h-full",
              "object-cover transition-transform duration-300 group-hover:scale-105"
            )}
          /> */}

          <ContentImg
            source={photo}
            height={`${
              viewMode === "list" ? "w-50 h-50" : "w-full h-full"
            } object-cover transition-transform duration-300 group-hover:scale-105`}
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

          {/* Botón siempre abajo */}
          <div className="flex items-center justify-between mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={handleOpenDialog}
              className="cursor-pointer transition-all duration-300 hover:bg-primary hover:text-primary-foreground border-primary/20 text-xs px-4 py-2 h-8"
            >
              Descubrelo ahora
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
