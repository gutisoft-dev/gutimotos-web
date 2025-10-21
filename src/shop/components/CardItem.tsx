import { IoAddOutline, IoRemoveOutline, IoTrashOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useQuotesStore, type Article } from "../store/quotes.store";
interface Props extends Article {}
export const CardItem = ({
  amount,
  brand,
  color,
  motorcycle_type,
  photo,
  code
}: Props) => {

 const {removeArticle,addamount,subtractamount}=useQuotesStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 py-6 border-b border-border">
      {/* Product Image */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        <img
          src={photo}
          alt={motorcycle_type}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-medium text-sm tracking-tight">
          {motorcycle_type.length>8 ? motorcycle_type.substring(0, 8) + "..." : motorcycle_type}
        </h3>
        <p className="text-muted-foreground text-[0.70rem]">
          {brand} {color && '-'} <span className="font-bold">{color}</span>
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md bg-transparent"
          onClick={() => addamount(code)}
        >
          <IoAddOutline className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{amount}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md bg-transparent"
          onClick={() => subtractamount(code)}
        >
          <IoRemoveOutline className="h-3 w-3" />
        </Button>
      </div>

      {/* Delete Button */}
      <div className="flex justify-end">
        <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground hover:text-destructive"
        onClick={() => removeArticle(code)}
      >
        <IoTrashOutline className="h-4 w-4" />
      </Button>
      </div>
    </div>
  );
};
