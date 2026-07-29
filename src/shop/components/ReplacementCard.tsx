import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router";
import { useProductStore } from "../store/product.store";
import clsx from "clsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MdAddShoppingCart } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogConfirm } from "./DialogConfirm";
import { useQuotesStore, type Article } from "../store/quotes.store";
import { toast } from "react-toastify";

interface Props {
  id: number;
  product: string;
  photo: string;
  product_code: string;
  brand_name: string | null;
  measure_name: string;
  product_description: string;
  calculated_price: number;
  setdetail: (description: string) => void;
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
  setdetail,
  setProduct_description,
}: Props) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { addArticle } = useQuotesStore();

  const { authStatus } = useAuthStore();
  const [searchParams] = useSearchParams();
  const { setProduct, setIdSlug } = useProductStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  const viewMode = searchParams.get("viewMode") || "grid";

  const currency = searchParams.get("currency_code") || "BOB";

  const handleOpenDialog = () => {
    if (authStatus === "not-authenticated") {
      return navigate("/auth/login");
    }
    setIdSlug(id.toString());
    setProduct(id.toString());
    setProduct_description(product_description);
    setdetail(`${brand_name || ""} ${brand_name ? "-" : ""} ${measure_name}`);
    setOpenDialog(true);
  };

  const handleAddToQuotes = () => {
    const newArticle: Article = {
      motorcycle_type: product_description,
      photo: photo || "",
      brand: brand_name || "",
      amount: 1,
      code: product_code.toString(),
    };
    addArticle(newArticle);
    toast.success("Item agregado a la cotizacion", {
      position: "top-right",
      autoClose: 500,
    });
    setOpenModal(false);
  };

  return (
    <>
      <Card className="group rounded-md border shadow-none product-card-hover cursor-pointer h-full">
        <CardContent
          className={`p-0 h-full ${
            viewMode === "list" ? "flex flex-row" : "flex flex-col"
          }`}
        >
          <div
            className={clsx(
              "relative overflow-hidden bg-muted  rounded-md  border m-2",
              viewMode === "list" ? "w-50 h-50" : "aspect-square",
            )}
          >
            {!imageLoaded && (
              <div className="absolute ">
                <Skeleton className="relative h-full w-full overflow-hidden rounded-md bg-muted before:absolute before:inset-0 before:w-1/2 before:-translate-x-full before:animate-[shimmer_1.5s_linear_infinite] before:bg-linear-to-r before:from-transparent before:via-white/40 dark:before:via-white/15 before:to-transparent before:content-['']" />
              </div>
            )}

            <LazyLoadImage
              src={photo}
              afterLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              className={clsx(
                viewMode === "list" ? "w-50 h-50" : "w-full h-full",
                "object-cover transition-all duration-300 group-hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0",
              )}
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

            <div className="flex flex-col md:flex-row gap-3   items-center justify-between mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={handleOpenDialog}
                className="cursor-pointer w-full md:w-auto transition-all duration-300 hover:bg-primary hover:text-primary-foreground border-primary/20 text-xs px-4 py-2 h-8"
              >
                Explorar producto
              </Button>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Submit"
                    className="cursor-pointer w-full md:w-9 "
                    onClick={() => setOpenModal(true)}
                  >
                    <MdAddShoppingCart />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Agregar a cotizar</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
        {openModal && (
          <DialogConfirm
            open={openModal}
            setOpen={setOpenModal}
            handleaction={handleAddToQuotes}
          />
        )}
      </Card>
    </>
  );
};
