import { useNavigate, useParams } from "react-router-dom";
import { Gallery } from "@/components";
import { type CreditsResponse, getImageUrl, type ImageCell, MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const CreditsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const media = location.pathname.slice(location.pathname.indexOf("/") + 1, location.pathname.indexOf("/") + 2) === "m" ? "movie" : "tv";
  const endpoint = media === "movie" ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { data } = useTmdb<CreditsResponse>(`${endpoint}/${id}/credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.profile_path),
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 font-bold text-2xl">Credits</h2>
      {data.cast.length ? (
        <Gallery images={gridData} onClick={(item) => navigate(`/person/${item.id}/career`)} />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
