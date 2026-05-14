import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ButtonGroup, Gallery, LinkGroup, Pagination } from "@/components";
import type { ImageCell, SearchResponse } from "@/core";
import { getImageUrl, TRENDING_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { media } = useParams();
  const interval = searchParams.get("interval") || "day";
  const { data } = useTmdb<SearchResponse>(`${TRENDING_ENDPOINT}/${media}/${interval}`, { page, time_window: interval });

  const gridData: ImageCell[] =
    media === "movie"
      ? (data?.results ?? []).map((result) => ({
          id: result.id,
          imageUrl: getImageUrl(result.poster_path ?? ""),
          primaryText: result.original_title,
        }))
      : (data?.results ?? []).map((result) => ({
          id: result.id,
          imageUrl: getImageUrl(result.poster_path ?? ""),
          primaryText: result.original_name,
        }));

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="flex flex-col gap-4 px-10 py-5">
      <div className="flex items-start justify-between">
        <LinkGroup
          options={[
            { label: "Movie", to: "/trending/movie?interval=day" },
            { label: "TV", to: "/trending/tv?interval=day" },
          ]}
        />
        <ButtonGroup
          onClick={(value) => setSearchParams({ interval: value })}
          options={[
            { label: "Today", value: "day" },
            { label: "Week", value: "week" },
          ]}
          value={interval}
        />
      </div>
      <Gallery images={gridData} onClick={(item) => navigate(`/${media}/${item.id}/summary`)} />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
