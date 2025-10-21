import { CustomLogo } from "@/auth/components/CustomLogo";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { useAuthStore } from "@/auth/store/auth.store";
import { AvatarUser } from "./AvatarUser";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import {
  ContentSidebarMovil,
  ContentSidebarMovilUser,
} from "@/shop/components/ContentSidebarMovil";
import { IoBagOutline, IoCloseOutline } from "react-icons/io5";
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
export const CustomHeader = () => {
  const { authStatus } = useAuthStore();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [showFilters, setShowFilters] = useState(false);
  const { articles } = useQuotesStore();
  const hanleClose = async () => {
    setShowFilters(false);
  };
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <CustomLogo />

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  path === "" && "underline underline-offset-4"
                } `}
              >
                Motocicletas
              </Link>
              <Link
                to="/spareparts"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  path === "spareparts" && "underline underline-offset-4"
                }`}
              >
                Repuestos
              </Link>
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center  space-x-4">
               <div className="flex flex-col gap-8">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <IoBagOutline />
                </Button>
              </div>
              {authStatus === "authenticated" ? (
                <div
                  className="md:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <RiMenu3Fill size={24} />
                </div>
              ) : (
                <Link className="md:hidden" to="/auth/login">
                  <Button
                    variant="default"
                    size="sm"
                    className="ml-2 cursor-pointer"
                  >
                    Obtener Catálogo
                  </Button>
                </Link>
              )}
             
              <div className="hidden md:flex md:justify-center ">
                {authStatus === "authenticated" ? (
                  <AvatarUser />
                ) : (
                  <Link to="/auth/login">
                    <Button
                      variant="default"
                      size="sm"
                      className="ml-2 cursor-pointer"
                    >
                      Obtener Catálogo
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {showFilters && (
        <div className="fixed overflow-y-auto inset-0 z-50 bg-background p-4 lg:hidden">
          <div className="flex items-center justify-between mb-6">
            <ContentSidebarMovilUser />
            <Button variant="ghost" size="sm" onClick={() => hanleClose()}>
              Cerrar
            </Button>
          </div>
          {/* <FilterSidebar /> */}
          <ContentSidebarMovil onClose={hanleClose} />
        </div>
      )}

      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <div className="flex  justify-between ">
                <div>
                  <DrawerTitle>Lista</DrawerTitle>
                  <DrawerDescription>
                    agrega los articulos que quieras cotizar
                  </DrawerDescription>
                </div>
                <div>
                  <DrawerClose asChild>
                    <IoCloseOutline size={20} className="cursor-pointer" />
                  </DrawerClose>
                </div>
              </div>
            </DrawerHeader>
            <div className="p-4 pb-0 h-[calc(100vh-150px)] flex flex-col items-center overflow-y-scroll">
              {articles.length === 0 && (
                <em className="text-muted-foreground text-[0.70rem] ">
                  lista vacia
                </em>
              )}

              {articles.length > 0 &&
                articles.map((item, index) => (
                  <CardItem key={index} {...item} />
                ))}
            </div>
            <DrawerFooter>
              <Button>Cotizar lista</Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
