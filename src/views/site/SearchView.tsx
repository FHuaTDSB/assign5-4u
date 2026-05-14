import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gallery, Pagination } from "@/components";
import { getImageUrl, type ImageCell, SEARCH_ENDPOINT, type SearchResponse } from "@/core";
import { useTmdb } from "@/hooks";

type SearchViewProps = {
  debouncedQuery: string;
  type: string;
};

export const SearchView = ({ debouncedQuery, type }: SearchViewProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<SearchResponse>(`${SEARCH_ENDPOINT}/${type}`, { page, query: debouncedQuery });

  const gridData: ImageCell[] =
    type === "movie"
      ? (data?.results ?? []).map((result) => ({
          id: result.id,
          imageUrl: getImageUrl(result.poster_path ?? ""),
          primaryText: result.original_title,
        }))
      : type === "tv"
        ? (data?.results ?? []).map((result) => ({
            id: result.id,
            imageUrl: getImageUrl(result.poster_path ?? ""),
            primaryText: result.original_name,
          }))
        : (data?.results ?? []).map((result) => ({
            id: result.id,
            imageUrl: getImageUrl(result.profile_path ?? ""),
            primaryText: result.name,
          }));

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 font-bold text-2xl">Results</h2>
      {gridData.length ? (
        <>
          <Gallery images={gridData} onClick={(item) => navigate(`/${type}/${item.id}/${type === "person" ? "career" : "summary"}`)} />
          <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />{" "}
        </>
      ) : (
        <p className="text-center text-cyan-700">No results available.</p>
      )}
    </section>
  );
};
