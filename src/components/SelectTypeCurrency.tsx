import { Controller, type Control } from "react-hook-form";
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
import { useCurrency } from "@/shop/hooks/useCurrency";
import type { FormData } from "./ui/DialogQuotes";
interface Props {
  control: Control<FormData>;
}

export const SelectTypeCurrency = ({ control }: Props) => {
  const { data } = useCurrency();
  return (
    <Field>
      <Label htmlFor="name-1">Tipo de Moneda</Label>
      <Controller
        name="currency_code"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger aria-invalid={fieldState.error ? true : false}>
              <SelectValue placeholder="Seleccione tipo de moneda" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Monedas</SelectLabel>

                {data?.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.name}
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
