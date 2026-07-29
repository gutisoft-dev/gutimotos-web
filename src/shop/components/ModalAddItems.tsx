import { Button } from "@/components/ui/button";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContentReplacementModal } from "./ContentReplacementModal";
import { SearchButton } from "./ReplacementContent";
import type { Item } from "../interfaces/Quotation.response";
import { IoAddOutline } from "react-icons/io5";
interface Prop {
  addItem: (newItem: Item) => void;
  status:boolean
}

export const ModalAddItems = ({ addItem,status }: Prop) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={status}  className="cursor-pointer ">
          <IoAddOutline /> Agregar
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Agregar Items</DialogTitle>
          <div>
            <SearchButton />
          </div>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <ContentReplacementModal addItem={addItem} />
        </div>
        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
