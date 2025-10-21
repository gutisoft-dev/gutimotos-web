import { useState } from "react";
import { useSearchParams } from "react-router";
import type { Product } from "../interfaces/Products.response";
import { Button } from "@/components/ui/button";
import { IoMdGrid } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { FilterSidebar } from "./FilterSidebar";
import { ProductCard } from "./ProductCard";
import { EmptyContent } from "./EmptyContent";
import { DialogProduct } from "./DialogProduct";
import { ContentLoading } from "./ContentLoading";
import { IoCloseOutline } from "react-icons/io5";
interface Props {
  products: Product[];
  isloading: boolean;
}
export const ProductsContent = ({ products, isloading }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const viewMode = searchParams.get("viewMode") || "grid";
  const handleViewModeChange = (mode: "grid" | "list") => {
    searchParams.set("viewMode", mode);
    setSearchParams(searchParams);
  };

  return (
    <>
      <section className="py-12 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h4 className="text-2xl font-light">Motocicletas</h4>
              {
                /**
                 <span className="text-muted-foreground">
                ({products.length} motos)
                </span>
                 */
              }
              
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                {/* <Filter className="h-4 w-4 mr-2" /> */}
                Filtros
              </Button>

              <div className="hidden md:flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewModeChange("grid")}
                  className="rounded-r-none"
                >
                  <IoMdGrid />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleViewModeChange("list")}
                  className="rounded-l-none"
                >
                  <FaListUl />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block">
              <FilterSidebar type="motorcycle" />
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div
                className="fixed inset-0 z-50 bg-black/60"
                onClick={() => setShowFilters(false)} 
              >
                <div
                  className="fixed w-80 overflow-y-auto inset-0 z-50 bg-background pr-4 pl-4 lg:hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6 sticky top-0 left-0 right-0 bg-background h-15">
                    <h3 className="text-lg font-semibold">Filtros</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                    >
                    <IoCloseOutline className="h-4 w-4" />
                    </Button>
                  </div>
                  <FilterSidebar type="motorcycle" />
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {isloading ? (
                <ContentLoading />
              ) : products.length === 0 ? (
                <EmptyContent />
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5"
                      : "space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-5"
                  }
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      motorcycle_file={product.motorcycle_file}
                      photo={product.photo}
                      brand={product.brand}
                      motorcycle_type={product.motorcycle_type}
                      color={product.color}
                      created={product.created}
                      setOpenDialog={setOpenDialog}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogProduct open={openDialog} setOpen={setOpenDialog} />
      </section>
    </>
  );
};
