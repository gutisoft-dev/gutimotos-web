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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaWhatsapp } from "react-icons/fa";
import { getExpirationCountdown } from "@/helpers/expirationDate";
import { PaginationQuotation } from "./PaginationQuotation";
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

  const handleRedirectTowhatsapp = () => {
    const message = `Te envío un pequeño recordatorio para consultar si pudiste revisar la cotización que te envié anteriormente.
Código de cotización: ${quotation?.quotation.id}`;
    const phoneNumber = "59167398260";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
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
            <div className="sticky top-16 z-20  mb-3 pb-3  bg-white">
              <div
                className="
              grid grid-cols-2 sm:grid-cols-5 gap-4
              border-b border-slate-200
              py-4
              "
              >
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
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                    Expira en
                  </p>
                  <p className="text-sm font-medium text-slate-900">
                    {getExpirationCountdown(quotation.quotation.expired)}
                  </p>
                </div>
                <div></div>
              </div>

              <div>
                {(quotation.quotation.status === "CREATED" ||
                  quotation.quotation.status === "REVIEWED") && (
                  <p className="text-xs text-slate-500 uppercase tracking-wide mt-1">
                    Acciones
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {quotation.quotation.status === "CREATED" && (
                    <div className="">
                      <ModalAddItems addItem={addItem} status={isDisabled} />
                    </div>
                  )}
                  {hasChanges && (
                    <div className="">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            disabled={isLoadingFetch}
                            onClick={handleSaveChanges}
                            className="cursor-pointer"
                          >
                            {isLoadingFetch ? (
                              <Spinner className="h-7 w-7" />
                            ) : (
                              <>
                                <IoSaveOutline className="h-7 w-7" /> Guardar
                              </>
                            )}
                          </Button>
                        </TooltipTrigger>

                        <TooltipContent side="left">
                          Guardar cambios
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                  {quotation.quotation.status === "REVIEWED" && (
                    <div className="">
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
                  <Button
                    className="cursor-pointer"
                    onClick={() => handleRedirectTowhatsapp()}
                  >
                    <FaWhatsapp /> Enviar recordatorio
                  </Button>
                </div>
              </div>
            </div>

            {itemsQuotations && itemsQuotations.length > 0 ? (
              <div>
                <h4 className="text-lg font-light pb-4">Lista de productos</h4>
                {isViewed ? (
                  itemsQuotations.map((item) => (
                    <CardRevied
                      key={item.product_code}
                      image={item.photo}
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
                <PaginationQuotation total_pages={quotation.total_pages}/>
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
