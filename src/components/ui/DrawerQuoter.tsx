import { type Dispatch, type SetStateAction } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useQuotesStore } from "@/shop/store/quotes.store";
import { CardItem } from "@/shop/components/CardItem";
import { IoCloseOutline } from "react-icons/io5";
import { DialogQuotes } from "./DialogQuotes";


interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DrawerQuoter = ({ open, setOpen }: Props) => {
  const { articles } = useQuotesStore();
    const hanleClose = async () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="flex h-full max-h-screen flex-col">
            <DrawerHeader>
              <div className="flex justify-between">
                <div>
                  <DrawerTitle>Lista</DrawerTitle>
                  <DrawerDescription>
                    agrega los artículos que quieras cotizar
                  </DrawerDescription>
                </div>

                <DrawerClose asChild>
                  <IoCloseOutline size={20} className="cursor-pointer" />
                </DrawerClose>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-4">
              {articles.length === 0 && (
                <em className="text-muted-foreground text-[0.70rem]">
                  lista vacía
                </em>
              )}

              {articles.map((item, index) => (
                <CardItem key={index} {...item} />
              ))}
            </div>

            <DrawerFooter className="border-t bg-background">
              <DialogQuotes hanleClose={hanleClose} />
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
