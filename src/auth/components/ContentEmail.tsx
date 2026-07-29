import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowRight } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { OtpRequest } from "../actions/OtpRequest";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";
interface Props {
  handleSection: (section: number) => void;
  handleEmail: (email: string) => void;
}
type FormData = {
  email: string;
};

export const ContentEmail = ({ handleSection, handleEmail }: Props) => {
  const [isposting, setIsposting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleOtpRequest = async (data: FormData) => {
    setIsposting(true);

    try {
      await OtpRequest(data.email);
      toast.success("Codigo OTP enviado al correo", {
        position: "top-right",
        style: {
          width: "280px",
          fontSize: "14px",
        },
      });
      handleEmail(data.email);
      handleSection(2);
      setIsposting(false);
    } catch (error) {
      setIsposting(false);

      return toast.error("Error al enviar el codigo", {
        position: "top-right",
        style: {
          width: "280px",
          fontSize: "14px",
        },
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleOtpRequest)}>
        <InputGroup className={`h-10 ${errors.email ? "border-red-500" : ""}`}>
          <InputGroupInput
            placeholder="ingresa tu correo"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo no válido",
              },
            })}
          />
          <InputGroupAddon>
            <MdEmail />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {isposting ? (
              <Spinner />
            ) : (
              <Button
                variant="secondary"
                size="icon"
                type="submit"
                className="cursor-pointer py-2"
              >
                <GoArrowRight />
              </Button>
            )}
          </InputGroupAddon>
        </InputGroup>
        {errors.email && (
          <p className="text-sm text-red-500 font-medium">
            {errors.email.message}
          </p>
        )}
      </form>
    </div>
  );
};
