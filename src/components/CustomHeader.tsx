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
export const CustomHeader = () => {
  const { authStatus } = useAuthStore();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [showFilters, setShowFilters] = useState(false);

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
                Motos
              </Link>
              <Link
                to="/spareparts"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  path === "spareparts" && "underline underline-offset-4"
                }`}
              >
                Repuesto
              </Link>
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
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
                    Obtener Catalogo
                  </Button>
                </Link>
              )}

              <div className="hidden md:block">
                {authStatus === "authenticated" ? (
                  <AvatarUser />
                ) : (
                  <Link to="/auth/login">
                    <Button
                      variant="default"
                      size="sm"
                      className="ml-2 cursor-pointer"
                    >
                      Obtener Catalogo
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
    </>
  );
};
