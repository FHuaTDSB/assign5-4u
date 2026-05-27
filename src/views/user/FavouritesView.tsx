import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Gallery, ImageOverlay } from "@/components";
import { favouriteAction, type ImageCell, type Media } from "@/core";
import { useUserContext } from "@/hooks";

export const FavouritesView = () => {
  const navigate = useNavigate();
  const { favourites, toggleFavourites } = useUserContext();
  const [media, setMedia] = useState<Media>("movie");
  const gridData: Array<ImageCell | false> = Array.from(favourites.values())
    .map(
      (result) =>
        result.media === media && {
          id: result.id,
          imageUrl: result.imageUrl,
          media: result.media,
          primaryText: result.primaryText,
          secondaryText: result.secondaryText,
        },
    )
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Favorites</h1>
        <ButtonGroup
          onClick={(value) => {
            setMedia(value as Media);
          }}
          options={[
            { label: "Movies", value: "movie" },
            { label: "TV", value: "tv" },
          ]}
          value={media}
        />
      </div>
      {favourites.size === 0 ? (
        <p className="mt-10 text-cyan-700">You have no favorites yet.</p>
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="font-bold text-2xl text-indigo-400">{media === "movie" ? "Movies" : "TV"}</h2>
            <Button onClick={() => {}} variant="red">
              Clear
            </Button>
          </div>
          <Gallery images={gridData as ImageCell[]} onClick={(image) => navigate(`/movie/${image.id}/credits`)}>
            {(image) => (
              <ImageOverlay
                actions={[favouriteAction((image: ImageCell) => favourites.has(image.id), toggleFavourites, "right")]}
                image={image}
              />
            )}
          </Gallery>
        </>
      )}
    </section>
  );
};
