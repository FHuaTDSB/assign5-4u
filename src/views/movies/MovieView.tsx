import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { LinkGroup, Modal } from "@/components";
import { getBackdropUrl, getImageUrl, type MediaResponse, MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const MovieView = () => {
  const navigate = useNavigate();
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

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img alt={data.title} className="h-60 w-full rounded-2xl object-cover" src={getBackdropUrl(data.backdrop_path)} />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img alt={data.title} className="w-50 rounded-xl object-cover" src={getImageUrl(data.poster_path)} />
          <div className="space-y-4 overflow-y-auto">
            <div className="space-y-1">
              <h1 className="font-bold text-3xl">{media === "movie" ? data.title : data.name}</h1>
              <h1 className="font-bold text-cyan-300 text-xl">{data.tagline}</h1>
            </div>
            <LinkGroup options={links} />
            <Outlet />
          </div>
        </div>
      </div>
    </Modal>
  );
};
