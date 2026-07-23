import { useDetailsQuotation } from "../hooks/useDetailsQuotation";
import { ContentLoading } from "./ContentLoading";
import { EmptyContent } from "./EmptyContent";
import { useEffect, useMemo, useState } from "react";
import type { Item } from "../interfaces/Quotation.response";
import { CardQuotation } from "./CardQuotation";
import { ModalAddItems } from "./ModalAddItems";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { IoSaveOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import {
  actionsQuotation,
  updateQuotation,
} from "../actions/quotation.actions";
import { Spinner } from "@/components/ui/spinner";
import { CardRevied } from "./CardRevied";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
export const DetailsQuotationView = ({
  quotationId,
}: {
  quotationId: string;
}) => {
  const {
    data: quotation,
    isLoading,
    refetch,
  } = useDetailsQuotation(quotationId);
  console.log(quotation);
  const [itemsQuotations, setItemsQuotations] = useState<Item[]>([]);
  console.log(itemsQuotations);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [loadingAction, setLoadingAction] = useState<
    "CONFIRMED" | "CANCELLED" | null
  >(null);
  const isDisabled =
    quotation?.quotation.status === "CANCELLED" ||
    quotation?.quotation.status === "EXPIRED" ||
    quotation?.quotation.status === "REVIEWED" ||
    quotation?.quotation.status === "CONFIRMED";

  const isViewed =
    quotation?.quotation.status === "REVIEWED" ||
    quotation?.quotation.status === "CONFIRMED" ||
    quotation?.quotation.status === "CANCELLED";

  const hasChanges = useMemo(() => {
    if (!quotation) return false;

    return JSON.stringify(quotation.items) !== JSON.stringify(itemsQuotations);
  }, [quotation, itemsQuotations]);
  useEffect(() => {
    setItemsQuotations(quotation?.items ?? []);
  }, [quotation]);

  const increaseQuantity = (productCode: string) => {
    // console.log(productCode);
    setItemsQuotations((prev) =>
      prev.map((item) => {
        if (item.product_code !== productCode) return item;

        const quantity = item.quantity + 1;

        return {
          ...item,
          quantity,
          subtotal: (Number(item.unit_price) * quantity).toFixed(2),
        };
      }),
    );
  };
  const decreaseQuantity = (productCode: string) => {
    setItemsQuotations((prev) =>
      prev
        .map((item) => {
          if (item.product_code !== productCode) return item;

          const quantity = item.quantity - 1;

          return {
            ...item,
            quantity,
            subtotal: (Number(item.unit_price) * quantity).toFixed(2),
          };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productCode: string) => {
    setItemsQuotations((prev) =>
      prev.filter((item) => item.product_code !== productCode),
    );
  };

  const addItem = (newItem: Item) => {
    // console.log(newItem);
    toast.success("Item agregado correctamente");

    setItemsQuotations((prev) => {
      const exists = prev.find(
        (item) => item.product_code === newItem.product_code,
      );

      if (exists) {
        return prev.map((item) => {
          if (item.product_code !== newItem.product_code) return item;

          const quantity = item.quantity + newItem.quantity;

          return {
            ...item,
            quantity,
            subtotal: (Number(item.unit_price) * quantity).toFixed(2),
          };
        });
      }
      return [...prev, newItem];
    });
  };

  const totalItems = itemsQuotations.reduce(
    (acc, item) => acc + Number(item.subtotal),
    0,
  );

  const handleSaveChanges = async () => {
    setIsLoadingFetch(true);
    if (!quotation) return;

    const items = itemsQuotations.map((item) => ({
      product_code: item.product_code,
      quantity: item.quantity,
    }));
    const resp = await updateQuotation({ id: quotation.quotation.id, items });

    if (!resp.success) {
      setIsLoadingFetch(false);
      return toast.error(resp.message);
    }
    setIsLoadingFetch(false);
    toast.success(resp.message);
    await refetch();
  };

  const handleActionChanges = async (action: "CONFIRMED" | "CANCELLED") => {
    if (!quotation) return;

    setLoadingAction(action);

    try {
      const id = quotation.quotation.id;

      const resp = await actionsQuotation({
        id,
        text: action,
      });

      if (!resp.success) {
        toast.error(resp.message);
        return;
      }

      toast.success(resp.message);
      await refetch();
    } finally {
      setLoadingAction(null);
    }
  };
  return (
    <>
      {isLoading ? (
        <ContentLoading />
      ) : quotation && quotation.items.length === 0 ? (
        <EmptyContent />
      ) : (
        quotation && (
          <div className=" px-2 sm:px-2 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-slate-200">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                  Estado
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {quotation.quotation.status_label}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                  Moneda
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {quotation.quotation.currency_code}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                  Total
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {totalItems.toFixed(2)}
                </p>
              </div>

              {quotation.quotation.status === "REVIEWED" && (
                <div className="">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                    Acciones a realizar
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      disabled={loadingAction !== null}
                      className="cursor-pointer"
                      onClick={() => handleActionChanges("CANCELLED")}
                    >
                      {loadingAction === "CANCELLED" ? (
                        <Spinner data-icon="inline-start" />
                      ) : (
                        <IoClose />
                      )}
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={loadingAction !== null}
                      className="cursor-pointer"
                      onClick={() => handleActionChanges("CONFIRMED")}
                    >
                      {loadingAction === "CONFIRMED" ? (
                        <Spinner data-icon="inline-start" />
                      ) : (
                        <FaCheck />
                      )}
                      Aceptar Cotización
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {itemsQuotations && itemsQuotations.length > 0 ? (
              <div>
                <h4 className="text-lg font-light pb-4">Lista de productos</h4>
                {isViewed ? (
                  itemsQuotations.map((item) => (
                    <CardRevied
                      key={item.product_code}
                      image={
                        "https://gutimotos.s3.amazonaws.com/media/fotos/productos/141198/71e1e32a6a7f498290c0b4ee9efcae72.webp"
                      }
                      amount={item.quantity}
                      name={item.product_description}
                      price={item.unit_price}
                      currency_code={quotation.quotation.currency_code}
                    />
                  ))
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {itemsQuotations.map((item) => (
                      <CardQuotation
                        key={item.product_code}
                        item={item}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        removeItem={removeItem}
                        currency_code={quotation.quotation.currency_code}
                        status={isDisabled}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic text-center">
                No hay productos en esta cotización
              </p>
            )}

            {quotation.quotation.status === "CREATED" && (
              <div className="fixed bottom-6 right-6 z-50">
                <ModalAddItems addItem={addItem} status={isDisabled} />
              </div>
            )}
            {hasChanges && (
              <div className="fixed bottom-24 right-6 z-50">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="destructive"
                      disabled={isLoadingFetch}
                      onClick={handleSaveChanges}
                      className="
                      h-13 w-13
                      rounded-full
                      shadow-xl
                      hover:scale-105
                      transition-all
                      duration-200
                    "
                    >
                      {isLoadingFetch ? (
                        <Spinner className="h-7 w-7" />
                      ) : (
                        <IoSaveOutline className="h-7 w-7" />
                      )}
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent side="left">Guardar cambios</TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};
