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
      className={`flex items-center justify-between rounded-xl border bg-white overflow-hidden transition-all duration-300 hover:shadow-md ${className} mb-3`}
    >
      <div className="flex items-center flex-1">
        <div className="relative w-28 h-28 shrink-0 bg-muted border-r">
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
            className={`w-full h-full object-cover object-contain transition-opacity duration-300  ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="px-5">
          <h3 className="text-md font- text-slate-500 line-clamp-2">
            {name}
          </h3>

          <p className="mt-1 text-md font-semibold">
            {currency_code} {price}
          </p>
        </div>
      </div>
      <div className="px-8 grid justify-center items-center">
        <p className="text-md text-slate-500 ">Cantidad</p>
        <span className="text-md text-center font-semibold">{amount}</span>
      </div>
      <div className="px-8">
        <p className="text-md text-slate-500 text-center">Total</p>
        <span className="text-md font-semibold text-center">
          {currency_code} {price}
        </span>
      </div>
    </div>
  );
};
