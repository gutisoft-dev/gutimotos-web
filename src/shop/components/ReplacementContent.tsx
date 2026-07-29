import { useRef, useState } from "react";
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
import { IoCloseOutline } from "react-icons/io5";
interface Props {
  replacements: Replacement[];
  isloading: boolean;
}
export const ReplacementContent = ({ replacements, isloading }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [product_description, setProduct_description] = useState("");
  const [detail, setDetail] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const viewMode = searchParams.get("viewMode") || "grid";
  const handleViewModeChange = (mode: "grid" | "list") => {
    searchParams.set("viewMode", mode);
    setSearchParams(searchParams);
  };

  return (
    <>
      <section className="py-4 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="sticky top-16 z-10 bg-white p-2.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <h4 className="text-2xl font-light">Repuestos</h4>
              </div>
              <div className="w-90 hidden lg:flex">
                <SearchButton />
              </div>

              <div className="flex items-center space-x-1">
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
            <div className="mb-2 lg:hidden">
              <SearchButton />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block sticky top-20 w-64 shrink-0 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">
              <FilterSidebar replacement type="sparepart" />
            </aside>

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
                  <FilterSidebar replacement={true} type="sparepart" />
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className=" relative flex-1">
              <div className="absolute top-0 left-0 right-0 h-4 -translate-y-full bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
              {isloading ? (
                <ContentLoading />
              ) : replacements.length === 0 ? (
                <EmptyContent />
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5"
                      : "space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-5"
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
                      setdetail={setDetail}
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
          detail={detail}
        />
      </section>
    </>
  );
};

export const SearchButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchValue = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(searchValue);
  const handleSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      searchParams.delete("cursor");
      searchParams.set("search", value);
      setSearchParams(searchParams);
    }, 600);
  };

  const handleClear = async () => {
    setSearchInput("");
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <div className="relative w-full">
        <IoIosSearch className="absolute top-1/2 left-3 -translate-y-1/2" />
        <Input
          placeholder="Buscar por marca descripción o código"
          className="pl-9 h-9 bg-white"
          onChange={handleSearchChanged}
          value={searchInput}
        />
        {searchInput.length > 0 && (
          <IoCloseOutline
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            onClick={handleClear}
          />
        )}
      </div>
    </div>
  );
};
