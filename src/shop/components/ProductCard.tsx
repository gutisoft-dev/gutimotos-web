import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router";
import { useProductStore } from "../store/product.store";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
interface Props {
  id: number;
  motorcycle_file: number;
  photo: string;
  brand: string;
  motorcycle_type: string;
  color: string;
  created: Date;
  setOpenDialog: (open: boolean) => void;
}
export const ProductCard = ({
  id,
  photo,
  brand,
  motorcycle_type,
  color,
  setOpenDialog,
}: Props) => {
  const navigate = useNavigate();
  const { authStatus } = useAuthStore();
  const [searchParams] = useSearchParams();
  const { setProduct } = useProductStore();
  const viewMode = searchParams.get("viewMode") || "grid";
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleOpenDialog = () => {
    if (authStatus === "not-authenticated") {
      return navigate("/auth/login");
    }
    // console.log(id)

    setProduct(id.toString());
    setOpenDialog(true);
  };

  return (
    <Card className="group rounded-md border shadow-none product-card-hover cursor-pointer h-full">
      <CardContent
        className={`p-0 h-full ${viewMode === "list" && "flex flex-row"} `}
      >
        <div className="relative aspect-square overflow-hidden bg-muted rounded-md  border m-2">
          {!imageLoaded && (
            <div className="absolute inset-0">
              <Skeleton className="relative h-full w-full overflow-hidden rounded-md bg-muted before:absolute before:inset-0 before:w-1/2 before:-translate-x-full before:animate-[shimmer_1.5s_linear_infinite] before:bg-linear-to-r before:from-transparent before:via-white/40 dark:before:via-white/15 before:to-transparent before:content-['']" />
            </div>
          )}

          <LazyLoadImage
            src={photo}
            alt={motorcycle_type}
            afterLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            className={`
              ${viewMode === "list" ? "w-50 h-50" : "w-full h-full"}
              object-cover
              transition-all duration-300
              group-hover:scale-105
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
          />
          <div className="image-overlay " />
        </div>

        <div className="pt-6 px-4 pb-4 space-y-3 grid justify-between ">
          <div className="space-y-1">
            <h3 className="font-medium text-sm tracking-tight">
              {motorcycle_type}
            </h3>
            <p className="text-xs text-muted-foreground uppercase">
              {brand} - <span className="font-bold">{color}</span>
            </p>
          </div>

          <div className="flex items-center justify-between ">
            {/* <p className="font-semibold text-lg">$as</p> */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOpenDialog()}
              className=" cursor-pointer  transition-all duration-300 hover:bg-primary hover:text-primary-foreground border-primary/20 text-xs px-4 py-2 h-8"
            >
              Ver precio y fotos
            </Button>
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
