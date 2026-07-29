import { Card, CardContent } from "@/components/ui/card";
import type { Item } from "../interfaces/Quotation.response";
import { Button } from "@/components/ui/button";
import { IoAddOutline, IoRemoveOutline, IoTrashOutline } from "react-icons/io5";
interface Props {
  item: Item;
  currency_code: string;
  increaseQuantity: (productCode: string) => void;
  decreaseQuantity: (productCode: string) => void;
  removeItem: (productCode: string) => void;
  status: boolean;
}
export const CardQuotation = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  currency_code,
  status,
}: Props) => {
  return (
    <Card
      className="shadow-none border rounded-md overflow-hidden"
      key={item.product_code}
    >
      <CardContent className="p-2 flex flex-col h-full">
        {/* Imagen */}
        <div className="w-full">
          <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted border">
            <img
              src="https://gutimotos.s3.amazonaws.com/media/fotos/productos/141198/71e1e32a6a7f498290c0b4ee9efcae72.webp"
              alt={item.product_description}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Información */}
        <div className="mt-2 text-center space-y-1">
         <div className="h-10">
           <h3 className="font-medium text-sm line-clamp-2">
            {item.product_description}
          </h3>
         </div>

          <p className="text-xs text-muted-foreground">
            Código: {item.product_code}
          </p>
        </div>

        {/* Cantidad */}
        <div className="mt-1 flex justify-center items-center gap-3">
          <Button
            size="icon"
            variant="outline"
            className="cursor-pointer"
            disabled={status}
            onClick={() => decreaseQuantity(item.product_code)}
          >
            <IoRemoveOutline />
          </Button>

          <span className="w-10 text-center font-semibold text-lg">
            {item.quantity}
          </span>

          <Button
            size="icon"
            variant="outline"
            className="cursor-pointer"
            disabled={status}
            onClick={() => increaseQuantity(item.product_code)}
          >
            <IoAddOutline />
          </Button>
        </div>

        {/* Subtotal */}
        <div className="mt-1 text-center">
          <p className="text-md font-bold">
            {currency_code} {Number(item.subtotal).toFixed(2)}
          </p>
        </div>

        {/* Botón eliminar */}
        <div className="mt-1">
          <Button
            variant="destructive"
            className="w-full cursor-pointer"
            disabled={status}

            onClick={() => removeItem(item.product_code)}
          >
            <IoTrashOutline className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
