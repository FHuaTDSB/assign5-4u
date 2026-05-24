import { createContext } from "react";
import type { ImageCell, StoredGenre } from "@/core";

export type UserContextType = {
  userName: string;
  movieGenres: StoredGenre[];
  tvGenres: StoredGenre[];
  favourites: Map<number, ImageCell>;
  cart: Map<number, ImageCell>;
  setUserName: (userName: string) => void;
  toggleFavourite: (image: ImageCell) => void;
  toggleCart: (image: ImageCell) => void;
  setMovieGenres: (preferences: StoredGenre[]) => void;
  setTvGenres: (preferences: StoredGenre[]) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
