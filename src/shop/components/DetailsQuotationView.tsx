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
  const [itemsQuotations, setItemsQuotations] = useState<Item[]>([]);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [loadingAction, setLoadingAction] = useState<
    "CONFIRMED" | "CANCELLED" | null
  >(null);
  const isDisabled =
    quotation?.quotation.status === "CANCELLED" ||
    quotation?.quotation.status === "EXPIRED" ||
    quotation?.quotation.status === "CONFIRMED";

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
          <div className=" px-4 sm:px-6 py-4">
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
              {quotation.quotation.status === "CREATED" && (
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                    Agregar mievos items
                  </p>
                  <ModalAddItems addItem={addItem} status={isDisabled} />
                </div>
              )}
              {hasChanges && (
                <div className="flex items-end">
                  <Button
                    variant="destructive"
                    disabled={isLoadingFetch}
                    className="cursor-pointer"
                    onClick={() => handleSaveChanges()}
                  >
                    {isLoadingFetch ? (
                      <Spinner data-icon="inline-start" />
                    ) : (
                      <IoSaveOutline />
                    )}
                    Guardar cambios
                  </Button>
                </div>
              )}
              {quotation.quotation.status === "REVISED" && (
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
            ) : (
              <p className="text-sm text-slate-500 italic text-center">
                No hay productos en esta cotización
              </p>
            )}
          </div>
        )
      )}
    </>
  );
};
