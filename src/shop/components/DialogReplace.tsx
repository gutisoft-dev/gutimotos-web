import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAuthStore } from "@/auth/store/auth.store";
import { ConentSkeleton } from "./ConentSkeleton";
import { useDetailReplacement } from "../hooks/useDetailReplacement";
import { DetailReplacement } from "./DetailReplacement";

interface Props {
  product_description: string;
  detail: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DialogReplace = ({
  open,
  setOpen,
  product_description,
}: Props) => {

  const { data, isLoading } = useDetailReplacement();
  const { user } = useAuthStore();
  const handleRedirectTowhatsapp = () => {
    const phoneNumber = "59167398260";
    const message = `
    Soy usuario con el email:${user?.email}.
    Quiero una cotización de este repuesto:
    Codigo:${data?.data.product_code}
    Descripción: ${product_description}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };



  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-h-[90vh] overflow-auto"
          onInteractOutside={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <ConentSkeleton />
          ) : (
            data?.data && (
              <DetailReplacement
                data={data?.data}
                description={product_description}
              />
            )
          )}
          {!isLoading && (
            <div className="grid grid-cols-1  gap-2 mt-5">
              {/* <Button
              className="w-full cursor-pointer"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </Button> */}
              {/* <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setOpenDialog(true)}
              >
                Agregar a lista de cotizaciones
              </Button> */}
              <Button
                className="cursor-pointer w-full"
                onClick={() => handleRedirectTowhatsapp()}
              >
                Cotizar repuesto
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
