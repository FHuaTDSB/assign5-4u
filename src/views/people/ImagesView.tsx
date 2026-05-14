import { useParams } from "react-router-dom";
import { Gallery } from "@/components";
import { getImageUrl, type ImageCell, type ImagesResponse, PERSON_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<ImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {});

  const gridData: ImageCell[] = (data?.profiles ?? []).map((profile) => ({
    id: (data?.profiles ?? []).indexOf(profile),
    imageUrl: getImageUrl(profile.file_path),
  }));

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 font-bold text-2xl">Images</h2>
      {data.profiles.length ? <Gallery images={gridData} /> : <p className="text-center text-cyan-700">No images available.</p>}
    </section>
  );
};
