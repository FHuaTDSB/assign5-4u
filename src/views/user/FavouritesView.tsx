import { useNavigate } from "react-router-dom";
import { Gallery, ImageOverlay } from "@/components";
import { favouriteAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const FavouritesView = () => {
  const navigate = useNavigate();
  const { favourites, toggleFavourite } = useUserContext();

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Favorites</h1>
      {favourites.size === 0 ? (
        <p className="mt-10 text-cyan-700">You have no favorites yet.</p>
      ) : (
        <Gallery images={Array.from(favourites.values())} onClick={(image) => navigate(`/movie/${image.id}/credits`)}>
          {(image) => (
            <ImageOverlay
              actions={[favouriteAction((image: ImageCell) => favourites.has(image.id), toggleFavourite, "right")]}
              image={image}
            />
          )}
        </Gallery>
      )}
    </section>
  );
};
