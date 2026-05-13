import type { ReactNode } from "react";
import type { ImageCell } from "@/core";

type GalleryProps = {
  images: ImageCell[];
  onClick?: (image: ImageCell) => void;
  children?: (image: ImageCell) => ReactNode;
};

export const Gallery = ({ images, onClick, children }: GalleryProps) => {
  return (
    <div className="grid grid-cols-5 gap-5">
      {images.map((image) => (
        <div
          className={`relative overflow-hidden rounded-lg border-fuchsia-300 bg-blue-900 ${onClick ? "cursor-pointer transition hover:scale-[1.02] hover:border-2 hover:bg-fuchsia-700 hover:text-white" : ""}`}
          key={image.id}
          onClick={() => onClick?.(image)}
        >
          {children?.(image)}
          <img alt={image.primaryText} src={image.imageUrl} />
          {(image.primaryText || image.secondaryText) && (
            <div className="flex flex-col p-3 text-center">
              {image.primaryText && <p className="truncate font-semibold text-sm">{image.primaryText}</p>}
              {image.secondaryText && <p className="truncate font-semibold text-blue-400 text-sm">{image.secondaryText}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
