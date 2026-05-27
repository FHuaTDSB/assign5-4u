export type MoviesResponse = {
  results: Array<{
    id: number;
    original_title: string;
    poster_path: string;
    release_date: string;
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
    name?: string;
    poster_path?: string;
    profile_path?: string;
    release_date?: string;
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

export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string;
    character: string;
  }>;
};

export type TrailersResponse = {
  results: Array<{
    key: string;
    name: string;
    site: string;
    type: string;
  }>;
};

export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

export type SeasonsResponse = {
  name: string;
  seasons: Array<{
    name: string;
    poster_path: string;
    season_number: number;
    air_date: string;
    id: number;
  }>;
};

export type EpisodesResponse = {
  episodes: Array<{
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    still_path: string;
  }>;
  season_number: number;
  air_date: string;
};

export type PersonResponse = {
  id: number;
  name: string;
  profile_path: string;
  place_of_birth: string;
  birthday: string;
  deathday: string;
  known_for_department: string;
  biography: string;
};

export type PeopleResponse = {
  results: Array<{
    id: number;
    name: string;
    profile_path: string;
  }>;
  total_pages: number;
};

export type CareerResponse = {
  cast: Array<{
    id: number;
    original_title: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type ImagesResponse = {
  profiles: Array<{
    file_path: string;
  }>;
};
