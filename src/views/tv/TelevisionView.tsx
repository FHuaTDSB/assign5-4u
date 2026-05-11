import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageGrid, LinkGroup, Pagination } from "@/components";
import type { ImageCell, TvResponse } from "@/core";
import { getImageUrl, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks/useTmdb";

export const TelevisionView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const category: string = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
  const { data } = useTmdb<TvResponse>(`${TV_ENDPOINT}/${category}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_name,
  }));

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="flex flex-col gap-4 px-10 py-5">
      <LinkGroup
        options={[
          { label: "Airing Today", to: "/tv/category/airing_today" },
          { label: "On The Air", to: "/tv/category/on_the_air" },
          { label: "Popular", to: "/tv/category/popular" },
          { label: "Top Rated", to: "/tv/category/top_rated" },
        ]}
      />
      <ImageGrid images={gridData} onClick={(item) => navigate(`/tv/${item.id}/summary`)} />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
