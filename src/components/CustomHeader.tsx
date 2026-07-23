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

import { DrawerQuoter } from "./ui/DrawerQuoter";
export const CustomHeader = () => {
  const { authStatus } = useAuthStore();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [showFilters, setShowFilters] = useState(false);
  const [open, setOpen] = useState(false);

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
              <Link
                to="/quotes"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  path === "quotes" && "underline underline-offset-4"
                }`}
              >
                Cotizaciones
              </Link>
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center  space-x-4">
              <div className="flex flex-col gap-8"></div>

              {authStatus === "authenticated" ? (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    <IoBagOutline />
                  </Button>
                  <div
                    className="md:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <RiMenu3Fill size={24} />
                  </div>
                </>
              ) : (
                <Link className="md:hidden" to="/auth/login">
                  <Button
                    variant="default"
                    size="sm"
                    className="ml-2 cursor-pointer "
                  >
                    <span className="text-[10px]">Obtener Catálogo</span>
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

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300
        ${
          showFilters
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={hanleClose} />
        <div
          className={`absolute top-0 left-0 h-full w-80 bg-background p-4 overflow-y-auto
            transform transition-transform duration-300 ease-in-out
            ${showFilters ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <ContentSidebarMovilUser />

            <Button variant="ghost" size="icon" onClick={hanleClose}>
              <IoCloseOutline size={20} />
            </Button>
          </div>

          <ContentSidebarMovil onClose={hanleClose} />
        </div>
      </div>
      <DrawerQuoter open={open} setOpen={setOpen} />
    </>
  );
};
