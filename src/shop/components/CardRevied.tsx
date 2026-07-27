import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  image: string;
  name: string;
  price: string;
  amount: number;
  className?: string;
  currency_code?: string;
}

export const CardRevied = ({
  image,
  name,
  price,
  className,
  amount,
  currency_code,
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div
      className={`mb-3 overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Información del producto */}
        <div className="flex flex-1">
          <div className="relative h-24 w-24 shrink-0 border-r bg-muted md:h-28 md:w-28">
            {!imageLoaded && (
              <Skeleton
                className="
              absolute inset-0
              overflow-hidden
              bg-muted
              before:absolute
              before:inset-0
              before:w-1/2
              before:-translate-x-full
              before:animate-[shimmer_1.5s_linear_infinite]
              before:bg-linear-to-r
              before:from-transparent
              before:via-white/40
              before:to-transparent
              before:content-['']
            "
              />
            )}

            <LazyLoadImage
              src={image}
              alt={name}
              afterLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <div className="flex flex-1 flex-col justify-center px-4 py-3">
            <h3 className="line-clamp-2 text-sm font-medium text-slate-600 md:text-base">
              {name}
            </h3>

            <p className="mt-2 text-base font-semibold">
              {currency_code} {price}
            </p>
          </div>
        </div>

        {/* Cantidad y Total */}
        <div className="grid grid-cols-2 border-t md:border-t-0 md:flex md:items-center">
          <div className="px-6 py-3 text-center">
            <p className="text-sm text-slate-500">Cantidad</p>
            <span className="text-base font-semibold">{amount}</span>
          </div>

          <div className="border-l px-6 py-3 text-center md:border-l-0">
            <p className="text-sm text-slate-500">Total</p>
            <span className="text-base font-semibold">
              {currency_code} {price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
