import { useState } from "react";
import "react-inner-image-zoom/lib/styles.min.css";
import { ImageViewer } from "./ImageViewer";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
interface Props {
  images: string[];
  height: string;
  initialIndex?: number;
}

export const ContentImg = ({ images, height, initialIndex = 0 }: Props) => {
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const image = images[initialIndex];
  return (
    <>
       <div className={clsx("relative overflow-hidden rounded-md", height)}>
      {!imageLoaded && (
        <Skeleton
          className="
            absolute 
            inset-0 
            overflow-hidden 
            rounded-md 
            bg-muted
            before:absolute 
            before:inset-0 
            before:w-1/2 
            before:-translate-x-full 
            before:animate-[shimmer_1.5s_linear_infinite]
            before:bg-linear-to-r 
            before:from-transparent 
            before:via-white/40 
            dark:before:via-white/15 
            before:to-transparent 
            before:content-['']
          "
        />
      )}

      <LazyLoadImage
        src={image}
        alt=""
        afterLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
        onClick={() => setOpen(true)}
        className={clsx(
          "object-cover transition-all duration-300 cursor-pointer",
          height,
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
      {open && (
        <ImageViewer
          images={images}
          initialIndex={initialIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
