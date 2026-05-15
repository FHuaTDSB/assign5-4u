import { FaCalendar, FaClock, FaFilm, FaStar } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { DetailItem } from "@/components";
import { MOVIE_ENDPOINT, type SummaryResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const SummaryView = () => {
  const location = useLocation();
  const media = location.pathname.slice(location.pathname.indexOf("/") + 1, location.pathname.indexOf("/") + 2) === "m" ? "movie" : "tv";
  const { id } = useParams();
  const endpoint = media === "movie" ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { data } = useTmdb<SummaryResponse>(`${endpoint}/${id}`, {});
  const runtime = data ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : "0h 0m";
  const genres = data
    ? (data?.genres ?? []).map((genre) => {
        return ` ${genre.name}`;
      })
    : "";

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <div>
      <p className="text-gray-300 leading-relaxed">{data.overview}</p>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <DetailItem icon={<FaCalendar />} label="Release" value={media === "movie" ? data.release_date : data.first_air_date} />
        <DetailItem icon={<FaClock />} label={media === "movie" ? "Runtime" : "Status"} value={media === "movie" ? runtime : data.status} />
        <DetailItem
          icon={<FaFilm />}
          label={media === "movie" ? "Genres" : "Seasons"}
          value={media === "movie" ? genres.toString() : data.number_of_seasons}
        />
        <DetailItem
          icon={<FaStar />}
          label={media === "movie" ? "Rating" : "Episodes"}
          value={media === "movie" ? `${data.vote_average} / 10` : data.number_of_episodes}
        />
      </div>
    </div>
  );
};
