import { createContext } from "react";
import type { ImageCell, StoredGenre } from "@/core";

export type UserContextType = {
  userName: string;
  movieGenres: StoredGenre[];
  tvGenres: StoredGenre[];
  movieFavourites: Map<number, ImageCell>;
  tvFavourites: Map<number, ImageCell>;
  cart: Map<number, ImageCell>;
  setUserName: (userName: string) => void;
  toggleMovieFavourites: (image: ImageCell) => void;
  toggleTvFavourites: (image: ImageCell) => void;
  toggleCart: (image: ImageCell) => void;
  setMovieGenres: (preferences: StoredGenre[]) => void;
  setTvGenres: (preferences: StoredGenre[]) => void;
  setCart: (cart: Map<number, ImageCell>) => void;
  setMovieFavourites: (favourites: Map<number, ImageCell>) => void;
  setTvFavourites: (favourites: Map<number, ImageCell>) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
