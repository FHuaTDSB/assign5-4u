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
          season: result.season,
          secondaryText: result.secondaryText,
          showId: result.showId,
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
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl text-indigo-400">{media === "movie" ? "Movies" : "TV"}</h2>
        {gridData.length !== 0 && (
          <Button
            onClick={() => {
              gridData.forEach((data) => {
                toggleFavourites(data as ImageCell);
              });
            }}
            variant="red"
          >
            Clear
          </Button>
        )}
      </div>
      {gridData.length === 0 ? (
        <p className="mt-10 text-cyan-700">
          No {media}
          {media === "movie" && "s"}, only sadness...
        </p>
      ) : (
        <Gallery
          images={gridData as ImageCell[]}
          onClick={(image) => navigate(media === "movie" ? `/movie/${image.id}/summary` : `/tv/${image.showId}/seasons`)}
        >
          {(image) => (
            <ImageOverlay
              actions={[favouriteAction((image: ImageCell) => favourites.has(image.id), toggleFavourites, "right")]}
              image={image}
            />
          )}
        </Gallery>
      )}
    </section>
  );
};
