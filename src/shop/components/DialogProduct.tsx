import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DetailContent } from "./DetailContent";
import { useDetail } from "../hooks/useDetail";
import { useAuthStore } from "@/auth/store/auth.store";
import { ConentSkeleton } from "./ConentSkeleton";
import { useQuotesStore, type Article } from "../store/quotes.store";
import { toast } from "react-toastify";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DialogProduct = ({ open, setOpen }: Props) => {
  const { data, isLoading } = useDetail();
     const {addArticle}=useQuotesStore()
  const { user } = useAuthStore();
  const handleRedirectTowhatsapp = () => {
    const phoneNumber = "59167398260";
    const message = `
    Soy usuario con el email:${user?.email}.
    Quiero una cotización de la motocicleta:
    Marca:${data?.data.brand_name}
    Tipo:${data?.data.motorcycle_type_name}
    Color:${data?.data.color_name}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  const handleAddToQuotes = () => {
    if (!data?.data) return;
    const newArticle: Article = {
      motorcycle_type: data.data.motorcycle_type_name,
      brand: data.data.brand_name,
      color: data.data.color_name,
      photo: data.data.photos[0].photo || "",
      amount: 1,
      code: data.data.motorcycle_type_id.toString(),
    };
    addArticle(newArticle);
    toast.success("Item agregado a la cotizacion", {
      position: "top-right",
      autoClose: 3000});
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
            data?.data && <DetailContent data={data?.data} />
          )}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* <Button
              className="w-full cursor-pointer"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </Button> */}
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => handleAddToQuotes()}
              >
                Agregar a lista de cotizaciones
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => handleRedirectTowhatsapp()}
              >
                Cotizar motocicleta
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
