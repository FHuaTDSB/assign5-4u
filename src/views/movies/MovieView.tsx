import { BsCartFill, BsCartPlus } from "react-icons/bs";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { LinkGroup, Modal } from "@/components";
import { findPrice, getBackdropUrl, getImageUrl, ICON_SIZE, type ImageCell, type MediaResponse, MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const MovieView = () => {
  const navigate = useNavigate();
  const { cart, toggleCart } = useUserContext();
  const location = useLocation();
  const media = location.pathname.slice(location.pathname.indexOf("/") + 1, location.pathname.indexOf("/") + 2) === "m" ? "movie" : "tv";
  const { id } = useParams();
  const endpoint = media === "movie" ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { data } = useTmdb<MediaResponse>(`${endpoint}/${id}`, {});
  const links =
    media === "movie"
      ? [
          { label: "Summary", to: "summary" },
          { label: "Credits", to: "credits" },
          { label: "Trailers", to: "trailers" },
          { label: "Reviews", to: "reviews" },
        ]
      : [
          { label: "Summary", to: "summary" },
          { label: "Seasons", match: "/tv/:id/season/:season", to: "seasons" },
          { label: "Credits", to: "credits" },
          { label: "Trailers", to: "trailers" },
          { label: "Reviews", to: "reviews" },
        ];
  const imageCellData: ImageCell | null =
    data && media === "movie"
      ? {
          id: data.id,
          imageUrl: getImageUrl(data.poster_path),
          primaryText: data.title,
          secondaryText: `$${findPrice(data.release_date)}.99`,
        }
      : null;

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img alt={data.title} className="h-60 w-full rounded-2xl object-cover" src={getBackdropUrl(data.backdrop_path)} />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img alt={data.title} className="w-50 rounded-xl object-cover" src={getImageUrl(data.poster_path)} />
          <div className="flex flex-col gap-3 overflow-y-auto">
            <div className="space-y-1">
              <div className="flex justify-between text-cyan-400">
                <h1 className="font-bold text-3xl text-fuchsia-400">{media === "movie" ? data.title : data.name}</h1>
                {media === "movie" && (
                  <button
                    className="relative rounded-full p-2 transition hover:bg-indigo-700"
                    onClick={(event) => {
                      event.stopPropagation();
                      imageCellData && toggleCart(imageCellData);
                      console.log(cart);
                    }}
                  >
                    {cart.has(data.id) ? <BsCartFill size={ICON_SIZE * 1.2} /> : <BsCartPlus size={ICON_SIZE * 1.2} />}
                  </button>
                )}
              </div>
              <div className="flex justify-between">
                <h1 className="font-bold text-cyan-300 text-xl">{data.tagline}</h1>
                {media === "movie" && <h1 className="font-bold text-cyan-300 text-xl">${findPrice(data.release_date)}.99</h1>}
              </div>
            </div>
            <LinkGroup options={links} />
            <div className="overflow-y-auto p-5 pt-0">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
