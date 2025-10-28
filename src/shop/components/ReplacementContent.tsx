import { useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { IoIosSearch, IoMdGrid } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { FilterSidebar } from "./FilterSidebar";
import { EmptyContent } from "./EmptyContent";
import { ContentLoading } from "./ContentLoading";
import type { Replacement } from "../interfaces/Replacement.response";
import { ReplacementCard } from "./ReplacementCard";
import { DialogReplace } from "./DialogReplace";
import { Input } from "@/components/ui/input";
interface Props {
  replacements: Replacement[];
  isloading: boolean;
}
export const ReplacementContent = ({ replacements, isloading }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [product_description, setProduct_description] = useState("");

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
        <div className="mb-8 lg:hidden">
          <SearchButton />
        </div>
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-light">Repuestos</h2>
              <span className="text-muted-foreground">
                ({replacements.length} repuestos)
              </span>
            </div>
            <div className="w-90 hidden lg:flex">
              <SearchButton />
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
              <FilterSidebar replacement={true} type="sparepart" />
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="fixed inset-0 z-50 bg-black/60">
                <div className="fixed w-80 inset-0 z-50 bg-background p-4 lg:hidden overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Filtros</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                    >
                      cerrar
                    </Button>
                  </div>
                  <FilterSidebar replacement={true} type="sparepart" />
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {isloading ? (
                <ContentLoading />
              ) : replacements.length === 0 ? (
                <EmptyContent />
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6"
                      : "space-y-4 grid grid-cols-1 sm:grid-cols-2"
                  }
                >
                  {replacements.map((product) => (
                    <ReplacementCard
                      key={product.id}
                      id={product.id}
                      product={product.product}
                      photo={product.photo}
                      product_code={product.product_code}
                      brand_name={product.brand_name}
                      measure_name={product.measure_name}
                      product_description={product.product_description}
                      calculated_price={product.calculated_price}
                      setOpenDialog={setOpenDialog}
                      setProduct_description={setProduct_description}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogReplace
          open={openDialog}
          setOpen={setOpenDialog}
          product_description={product_description}
        />
      </section>
    </>
  );
};

export const SearchButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <div className="relative w-full">
        <IoIosSearch className="absolute top-1/2 left-3 -translate-y-1/2" />
        <Input
          placeholder="Buscar repuestos..."
          className="pl-9 h-9 bg-white"
          onChange={handleSearchChanged}
        />
      </div>
    </div>
  );
};
