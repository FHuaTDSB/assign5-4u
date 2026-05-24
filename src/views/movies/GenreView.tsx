import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Gallery, ImageOverlay, LinkGroup, Pagination } from "@/components";
import type { ImageCell, SearchResponse } from "@/core";
import { favouriteAction, findPrice, GENRE_ENDPOINT, getImageUrl } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { favourites, toggleFavourite, movieGenres, tvGenres } = useUserContext();
  const { media, genre } = useParams();
  const findGenre = (value: { name: string | undefined }) => {
    return value.name === genre;
  };
  const selectedGenre = media === "movie" ? movieGenres[movieGenres.findIndex(findGenre)].id : tvGenres[tvGenres.findIndex(findGenre)].id;
  const { data } = useTmdb<SearchResponse>(`${GENRE_ENDPOINT}/${media}`, { page, with_genres: selectedGenre });
  const activeMovieGenres = movieGenres.filter((movieGenre) => movieGenres[movieGenres.findIndex((e) => e.id === movieGenre.id)].active);
  const activeTvGenres = tvGenres.filter((tvGenre) => tvGenres[tvGenres.findIndex((e) => e.id === tvGenre.id)].active);

  const genreLinks =
    media === "movie"
      ? activeMovieGenres.map((movieGenre) => ({ label: movieGenre.label, to: `/genre/movie/${movieGenre.name}` }))
      : activeTvGenres.map((tvGenre) => ({ label: tvGenre.label, to: `/genre/tv/${tvGenre.name}` }));

  const gridData =
    media === "movie"
      ? (data?.results ?? []).map((result) => ({
          id: result.id,
          imageUrl: getImageUrl(result.poster_path ?? ""),
          primaryText: result.original_title,
          secondaryText: result.release_date && `$${findPrice(result.release_date)}.99`,
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
          { label: "Movie", match: "/genre/movie/:genre", to: `/genre/movie/${activeMovieGenres[0].name}` },
          { label: "TV", match: "/genre/tv/:genre", to: `/genre/tv/${activeTvGenres[0].name}` },
        ]}
      />
      <LinkGroup options={genreLinks} />
      <Gallery images={gridData} onClick={(item) => navigate(`/${media}/${item.id}/summary`)}>
        {(image) =>
          media === "movie" && (
            <ImageOverlay
              actions={[favouriteAction((image: ImageCell) => favourites.has(image.id), toggleFavourite, "right")]}
              image={image}
            />
          )
        }
      </Gallery>
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
