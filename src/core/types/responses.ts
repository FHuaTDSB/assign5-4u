export type MoviesResponse = {
  results: Array<{
    id: number;
    original_title: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type TvResponse = {
  results: Array<{
    id: number;
    original_name: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type SearchResponse = {
  results: Array<{
    id: number;
    original_title?: string;
    original_name?: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type MediaResponse = {
  id: number;
  title: string;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  tagline: string;
  vote_average: string;
  results: Array<{
    id: number;
    original_title: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type SummaryResponse = {
  id: number;
  overview: string;
  release_date: string;
  first_air_date: string;
  runtime: number;
  status: string;
  genres: Array<{
    name: string;
  }>;
  number_of_seasons: number;
  vote_average: string;
  number_of_episodes: number;
};
