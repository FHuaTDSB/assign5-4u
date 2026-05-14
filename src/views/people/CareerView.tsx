import { useNavigate, useParams } from "react-router-dom";
import { Gallery } from "@/components";
import { type CareerResponse, getImageUrl, type ImageCell, PERSON_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const CareerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<CareerResponse>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 font-bold text-2xl">Career</h2>
      {data.cast.length ? (
        <Gallery images={gridData} onClick={(item) => navigate(`/movie/${item.id}/summary`)} />
      ) : (
        <p className="text-center text-cyan-700">No credits available.</p>
      )}
    </section>
  );
};
