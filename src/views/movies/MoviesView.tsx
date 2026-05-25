import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Gallery, LinkGroup, Pagination } from "@/components";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import type { ImageCell, MoviesResponse } from "@/core";
import { favouriteAction, findPrice, getImageUrl, MOVIE_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { movieFavourites, toggleMovieFavourites } = useUserContext();
  const location = useLocation();
  const category: string = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
  const { data } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${category}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
    secondaryText: `$${findPrice(result.release_date)}.99`,
  }));

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="flex flex-col gap-4 px-10 py-5">
      <LinkGroup
        options={[
          { label: "Now Playing", to: "/movie/category/now_playing" },
          { label: "Popular", to: "/movie/category/popular" },
          { label: "Top Rated", to: "/movie/category/top_rated" },
          { label: "Upcoming", to: "/movie/category/upcoming" },
        ]}
      />
      <Gallery images={gridData} onClick={(item) => navigate(`/movie/${item.id}/summary`)}>
        {(image) => (
          <ImageOverlay
            actions={[favouriteAction((image: ImageCell) => movieFavourites.has(image.id), toggleMovieFavourites, "right")]}
            image={image}
          />
        )}
      </Gallery>
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
