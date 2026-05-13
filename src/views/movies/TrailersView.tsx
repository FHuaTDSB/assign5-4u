import { useLocation, useParams } from "react-router-dom";
import { MOVIE_ENDPOINT, type TrailersResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const TrailersView = () => {
  const { id } = useParams();
  const location = useLocation();
  const media = location.pathname.slice(location.pathname.indexOf("/") + 1, location.pathname.indexOf("/") + 2) === "m" ? "movie" : "tv";
  const endpoint = media === "movie" ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { data } = useTmdb<TrailersResponse>(`${endpoint}/${id}/videos`, {});
  const trailerVideo = data?.results.find((video) => video.site === "YouTube" && video.type === "Trailer");

  console.log(data);
  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="font-bold text-2xl">Trailers</h2>
      {trailerVideo ? (
        <div className="aspect-video">
          <iframe
            allowFullScreen
            className="h-1/2 w-1/2 rounded-xl"
            src={`https://www.youtube.com/embed/${trailerVideo.key}`}
            title={trailerVideo.name}
          />
        </div>
      ) : (
        <p className="text-center text-gray-400">No trailers available.</p>
      )}
    </section>
  );
};
