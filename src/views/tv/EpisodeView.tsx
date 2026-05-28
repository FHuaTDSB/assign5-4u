import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Gallery } from "@/components";
import { type EpisodesResponse, findPrice, getImageUrl, type ImageCell, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const EpisodeView = () => {
  const navigate = useNavigate();
  const { id, season } = useParams();
  const { data } = useTmdb<EpisodesResponse>(`${TV_ENDPOINT}/${id}/season/${season}`, {});

  const gridData: ImageCell[] = (data?.episodes ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.still_path),
    primaryText: `Ep ${result.episode_number}: ${result.name}`,
    secondaryText: result.air_date,
  }));

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <Button onClick={() => navigate(-1)}>
        <div className="flex items-center gap-2">
          <FaLongArrowAltLeft /> Back
        </div>
      </Button>
      <div>
        <div className="flex justify-between">
          <h2 className="mb-6 font-bold text-2xl">Season {data.season_number}</h2>
          <h1 className="font-bold text-cyan-300 text-xl">${findPrice(data.air_date)}.99</h1>
        </div>
        {data.episodes.length ? <Gallery images={gridData} /> : <p className="text-center text-gray-400">No seasons available.</p>}
      </div>
    </section>
  );
};
