import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router";
import { useProductStore } from "../store/product.store";
import { ContentImg } from "./ContentImg";
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

  const handleOpenDialog = () => {
    if (authStatus === "not-authenticated") {
      return navigate("/auth/login");
    }
    // console.log(id)
    setProduct(id.toString());
    setOpenDialog(true);
  };

  return (
    <Card className="group rounded-md border shadow-none product-card-hover cursor-pointer ">
      <CardContent className={`p-0 ${viewMode === "list" && "flex flex-row"} `}>
        <div className="relative aspect-square overflow-hidden bg-muted rounded-md  border m-2">
          {/* <LazyLoadImage
            src={photo} 
            className={`${viewMode === "list" ? "w-50 h-50" : "w-full h-full"} object-cover transition-transform duration-300 group-hover:scale-105`}
          /> */}

          <ContentImg
            source={photo}
            height={`${
              viewMode === "list" ? "w-50 h-50" : "w-full h-full"
            } object-cover transition-transform duration-300 group-hover:scale-105`}
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
              Descubrelo ahora
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
