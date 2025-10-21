import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CustomLogo } from "../components/CustomLogo";
import { FaTiktok, FaInstagram, FaFacebookF, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth.store";
import imgLogo from "../../assets/gutimotos.svg";
import { Spinner } from "@/components/ui/spinner";

export const LoginPages = () => {
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

  const redirectToExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {isposting && (
        <div className="fixed inset-0 z-50 bg-black/60">
          <div className="w-full h-screen flex justify-center items-center">
            <Spinner className="size-8 text-[#bf2829]" />
          </div>
        </div>
      )}
      <div className={"flex flex-col gap-6"}>
        <Card className="overflow-hidden p-0  ">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8">
              <div className="flex flex-col gap-6 min-h-[400px]  justify-between">
                <div className="flex flex-col items-center text-center">
                  <CustomLogo />

                  <h2 className="text-sm text-muted-foreground">
                    En Tarija, somos tu concesionaria de confianza con las mejores marcas de
                    motocicletas, repuestos, piezas y accesorios. Contamos con
                    soporte y servicio técnico especializado para brindarte la mejor experiencia, <span className='text-black'>nuestra prioridad es tu satisfacción</span>.
                  </h2>
                </div>

              <Button
                onClick={handlelogin}
                className="w-full cursor-pointer"
                disabled={isposting}
              >
                <FaGoogle />
                Ingresar con google
              </Button>
              <div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    nuestras redes
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-5">
                  <Button variant="outline" className="w-full" onClick={() => redirectToExternal("https://www.facebook.com/share/1AE1zW2o3q/")}>
                    <FaFacebookF color="#bf2829" />
                    <span className="sr-only">Login facebook</span>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => redirectToExternal("https://www.instagram.com/gutimotos.tj?utm_source=qr&igsh=MXJvcTI2d2dnc2p1dg==")}>
                    <FaInstagram color="#bf2829" />
                    <span className="sr-only">Login with Instagram</span>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => redirectToExternal("https://www.tiktok.com/@gutimotos_tj?is_from_webapp=1&sender_device=pc")}>
                    <FaTiktok color="#bf2829" />
                    <span className="sr-only">Login with tiktok</span>
                  </Button>
                 
                </div>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={imgLogo}
              alt="logo Gutimotos"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Bienvenido a nuestra plataforma
      </div>
    </div>
    </>
  );
};
