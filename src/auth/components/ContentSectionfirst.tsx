import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomLogo } from "./CustomLogo";
import {  FaGoogle,  } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth.store";
import { Spinner } from "@/components/ui/spinner";
import { ContentEmail } from "./ContentEmail";
import { Separator } from "@/components/ui/separator";

interface Props {
  handleSection: (section: number) => void;
    handleEmail: (email: string) => void;
}

export const ContentSectionfirst = ({ handleSection, handleEmail }: Props) => {
  const [isposting, setIsposting] = useState(false);
  const { login } = useAuthStore();
  const handlelogin = async () => {
    setIsposting(true);

    const resp = await login();
    if (!resp) {
      setIsposting(false);
      return toast.error("error al iniciar session", {
        position: "top-right",
      });
    }

    setIsposting(false);
  };

  // const redirectToExternal = (url: string) => {
  //   window.open(url, "_blank", "noopener,noreferrer");
  // };
  return (
    <>
      {isposting && (
        <div className="fixed inset-0 z-50 bg-black/60">
          <div className="w-full h-screen flex justify-center items-center">
            <Spinner className="size-8 text-[#bf2829]" />
          </div>
        </div>
      )}
      <div className="flex flex-col items-center text-center mb-3">
        <CustomLogo />

        <h2 className="text-sm text-muted-foreground mt-3">
          Explora catálogo de motos, repuestos y accesorios.
        </h2>
      </div>
      <div className="">
         <div className="space-y-4 sm:space-y-5 ">
        <Button
          onClick={handlelogin}
          disabled={isposting}
          className="
              w-full
              h-10
              font-medium
              text-sm
              sm:text-base
              cursor-pointer
              transition-all
              duration-200
              hover:scale-[1.01]
              active:scale-[0.99]
              flex
              items-center
              justify-center
              gap-3
              shadow-sm
            "
        >
          <FaGoogle className="text-lg" />

          <span>{isposting ? "Conectando..." : "Continuar con Google"}</span>
        </Button>
        <Separator  />
        <ContentEmail  handleSection={handleSection} handleEmail={handleEmail}/>
      </div>
      </div>
     

      {/* <div>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Nuestras redes sociales
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              redirectToExternal("https://www.facebook.com/share/1AE1zW2o3q/")
            }
          >
            <FaFacebookF color="#bf2829" />
            <span className="sr-only">Login facebook</span>
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              redirectToExternal(
                "https://www.instagram.com/gutimotos.tj?utm_source=qr&igsh=MXJvcTI2d2dnc2p1dg==",
              )
            }
          >
            <FaInstagram color="#bf2829" />
            <span className="sr-only">Login with Instagram</span>
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              redirectToExternal(
                "https://www.tiktok.com/@gutimotos_tj?is_from_webapp=1&sender_device=pc",
              )
            }
          >
            <FaTiktok color="#bf2829" />
            <span className="sr-only">Login with tiktok</span>
          </Button>
        </div>
      </div> */}
    </>
  );
};
