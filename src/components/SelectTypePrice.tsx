import { useTypePrice } from "@/shop/hooks/useTypePrice";
import { Field } from "./ui/field";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, type Control } from "react-hook-form";
import type { FormData } from "./ui/DialogQuotes";
interface Props {
  control: Control<FormData>;
}

export const SelectTypePrice = ({ control }: Props) => {
  const { data } = useTypePrice("sparepart");
  return (
    <Field>
      <Label htmlFor="name-1">Tipo de precio</Label>
      <Controller
        name="type_price_slug"
        control={control}
        rules={{ required: true }}
        render={({ field,fieldState }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger aria-invalid={fieldState.error ? true : false}>
              <SelectValue placeholder="Seleccione tipo de precio" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Precios</SelectLabel>

                {data?.map((typeprice) => (
                  <SelectItem key={typeprice.slug} value={typeprice.slug}>
                    {typeprice.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </Field>
  );
};
