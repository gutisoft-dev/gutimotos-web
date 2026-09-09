import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
interface Props {
  next_cursor: string | null | undefined;
  previous_cursor: string | null | undefined;
}
export const CustomPagination = ({ next_cursor, previous_cursor }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();


  const handlePageChange = (page: string) => {
    searchParams.set("cursor", page);
    setSearchParams(searchParams);
  };
  return (
    <div className="flex items-center justify-center space-x-5 mb-10 mt-10">
      <Button
        variant="outline"
        size="sm"
        disabled={!previous_cursor}
        onClick={() => handlePageChange(previous_cursor || "")}
      >
        <FaAngleLeft />
        Anteriores
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={!next_cursor}
        onClick={() => handlePageChange(next_cursor || "")}
      >
        Siguientes
        <FaAngleRight />
      </Button>
    </div>
  );
};
