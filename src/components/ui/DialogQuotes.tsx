import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Field, FieldGroup } from "./field";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectTypePrice } from "../SelectTypePrice";
import { useForm } from "react-hook-form";
import { useQuotesStore } from "@/shop/store/quotes.store";
import { createQuotation } from "@/shop/actions/quotation.actions";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
export type FormData = {
  whatsapp: string;
  type_price_slug: string;
  currency_code: string;
};

interface Props {
  hanleClose: () => Promise<void>;
}

export const DialogQuotes = ({ hanleClose }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const { articles, clearArticles } = useQuotesStore();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: FormData) => {
    const quotation = {
      items: articles.map((item) => ({
        product_code: item.code,
        quantity: item.amount,
      })),
      type_price_slug: data.type_price_slug,
      currency_code: "BOB",
      whatsapp: data.whatsapp,
    };
    const resp = await createQuotation(quotation);
    if (!resp.success) {
      return toast.error(resp.message);
    }

    reset();
    clearArticles();
    setOpen(false);
    hanleClose();
    toast.success(resp.message);
    queryClient.invalidateQueries({
      queryKey: ["quotations"],
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button
            className="w-full cursor-pointer"
            disabled={articles.length === 0}
          >
            Cotizar lista
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Enviar cotización</DialogTitle>
            <DialogDescription>
              Esta cotización se enviará a nuestro equipo de ventas, quien se
              pondrá en contacto contigo para brindarte una respuesta
              personalizada.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="gap-3">
            <Field>
              <Label htmlFor="name-1">
                Telefono{" "}
                <Tooltip>
                  <TooltipTrigger>
                    <FiAlertCircle className="cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>importante escribir el telefono para enviar la cotizacion</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input
                id="whatsapp"
                type="number"
                aria-invalid={!!errors.whatsapp}
                {...register("whatsapp", {
                  required: "El teléfono es obligatorio",
                })}
              />
            </Field>
            <SelectTypePrice control={control} />
            {/* <SelectTypeCurrency control={control} /> */}
          </FieldGroup>
          <DialogFooter className=" w-full">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              onClick={handleSubmit(onSubmit)}
            >
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
