import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSearchParams } from "react-router";
interface Props {
  total_pages: number;
}

export const PaginationQuotation = ({ total_pages }: Props) => {
    console.log(total_pages)
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page") || "1") : 1,
  );
  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    setCount(page);
  };
  return (
    <div className="flex items-center justify-center space-x-5 mb-10 mt-10">
      <Button
        variant="outline"
        size="sm"
        disabled={!searchParams.get("page") || searchParams.get("page") === "1"}
        onClick={() => handlePageChange(count - 1)}
      >
        <FaAngleLeft />
        Anteriores
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={count === total_pages}
        onClick={() => handlePageChange(count + 1)}
      >
        Siguientes
        <FaAngleRight />
      </Button>
    </div>
  );
};
