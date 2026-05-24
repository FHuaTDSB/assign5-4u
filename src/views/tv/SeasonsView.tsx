import { useNavigate, useParams } from "react-router-dom";
import { Gallery } from "@/components";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import { cartAction, favouriteAction, findPrice, getImageUrl, type ImageCell, type SeasonsResponse, TV_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { favourites, toggleFavourite, cart, toggleCart } = useUserContext();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  const gridData: ImageCell[] = (data?.seasons ?? []).map((result) => ({
    id: result.season_number,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.name,
    secondaryText: result.air_date && `$${findPrice(result.air_date)}.99`,
  }));

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 font-bold text-2xl">Seasons</h2>
      {data.seasons.length ? (
        <Gallery images={gridData} onClick={(item) => navigate(`/tv/${id}/season/${item.id}`)}>
          {(image) => (
            <>
              <ImageOverlay
                actions={[favouriteAction((image: ImageCell) => favourites.has(image.id), toggleFavourite, "left")]}
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
