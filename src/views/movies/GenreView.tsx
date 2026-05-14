import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Gallery, LinkGroup, Pagination } from "@/components";
import type { Genre, SearchResponse } from "@/core";
import { GENRE_ENDPOINT, getImageUrl } from "@/core";
import { useTmdb } from "@/hooks";

export const GenreView = () => {
  const movieGenres: Genre[] = [
    { id: 28, label: "Action", name: "action" },
    { id: 12, label: "Adventure", name: "adventure" },
    { id: 16, label: "Animation", name: "animation" },
    { id: 80, label: "Crime", name: "crime" },
    { id: 10751, label: "Family", name: "family" },
    { id: 14, label: "Fantasy", name: "fantasy" },
    { id: 36, label: "History", name: "history" },
    { id: 27, label: "Horror", name: "horror" },
    { id: 9648, label: "Mystery", name: "mystery" },
    { id: 878, label: "Sci-Fi", name: "sci-fi" },
  ];
  const tvGenres: Genre[] = [
    { id: 10759, label: "Action", name: "action" },
    { id: 16, label: "Animation", name: "animation" },
    { id: 35, label: "Comedy", name: "comedy" },
    { id: 80, label: "Crime", name: "crime" },
    { id: 99, label: "Documentary", name: "documentary" },
    { id: 18, label: "Drama", name: "drama" },
    { id: 10751, label: "Family", name: "family" },
    { id: 10762, label: "Kids", name: "kids" },
    { id: 9648, label: "Mystery", name: "mystery" },
    { id: 10765, label: "Sci-Fi", name: "sci-fi" },
  ];

  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { media, genre } = useParams();
  const findGenre = (value: { name: string | undefined }) => {
    return value.name === genre;
  };
  const selectedGenre = media === "movie" ? movieGenres[movieGenres.findIndex(findGenre)].id : tvGenres[tvGenres.findIndex(findGenre)].id;
  const { data } = useTmdb<SearchResponse>(`${GENRE_ENDPOINT}/${media}`, { page, with_genres: selectedGenre });
  console.log(data);
  const genreLinks =
    media === "movie"
      ? movieGenres.map((movieGenre) => ({ label: movieGenre.label, to: `/genre/movie/${movieGenre.name}` }))
      : tvGenres.map((tvGenre) => ({ label: tvGenre.label, to: `/genre/tv/${tvGenre.name}` }));

  const gridData =
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
      <LinkGroup
        options={[
          { label: "Movie", match: "/genre/movie/:genre", to: "/genre/movie/action" },
          { label: "TV", match: "/genre/tv/:genre", to: "/genre/tv/action" },
        ]}
      />
      <LinkGroup options={genreLinks} />
      <Gallery images={gridData} onClick={(item) => navigate(`/${media}/${item.id}/summary`)} />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
