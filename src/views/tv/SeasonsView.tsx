import { useNavigate, useParams } from "react-router-dom";
import { Gallery } from "@/components";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import { cartAction, favouriteAction, findPrice, getImageUrl, type ImageCell, type Media, type SeasonsResponse, TV_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { favourites, toggleFavourites, cart, toggleCart } = useUserContext();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  const gridData: Array<ImageCell | false> = (data?.seasons ?? [])
    .map(
      (result) =>
        result.air_date !== null && {
          id: result.id,
          imageUrl: getImageUrl(result.poster_path),
          media: "tv" as Media,
          primaryText: result.name,
          season: result.season_number,
          secondaryText: result.air_date && `$${findPrice(result.air_date)}.99`,
          showId: data?.id,
          showName: data?.name,
        },
    )
    .filter(Boolean);

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 font-bold text-2xl">Seasons</h2>
      {data.seasons.length ? (
        <Gallery images={gridData as ImageCell[]} onClick={(item) => navigate(`/tv/${id}/season/${item.season}`)}>
          {(image) => (
            <>
              <ImageOverlay
                actions={[favouriteAction((image: ImageCell) => favourites.has(image.id), toggleFavourites, "left")]}
                image={image}
              />
              <ImageOverlay actions={[cartAction((image: ImageCell) => cart.has(image.id), toggleCart, "right")]} image={image} />
            </>
          )}
        </Gallery>
      ) : (
        <p className="text-center text-cyan-700">No seasons available.</p>
      )}
    </section>
  );
};
