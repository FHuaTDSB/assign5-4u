import type { ReactNode } from "react";
import { UserContext } from "@/context";
import { CART_KEY, FAVORITES_KEY, type ImageCell, MOVIE_PREFERENCES_KEY, type StoredGenre, TV_PREFERENCES_KEY, USERNAME_KEY } from "@/core";
import { useLocalStorage } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, "User");
  const [movieGenres, setMovieGenres] = useLocalStorage<StoredGenre[]>(MOVIE_PREFERENCES_KEY, [
    { active: true, id: 28, label: "Action", name: "action" },
    { active: true, id: 12, label: "Adventure", name: "adventure" },
    { active: true, id: 16, label: "Animation", name: "animation" },
    { active: true, id: 80, label: "Crime", name: "crime" },
    { active: true, id: 10751, label: "Family", name: "family" },
    { active: true, id: 14, label: "Fantasy", name: "fantasy" },
    { active: true, id: 36, label: "History", name: "history" },
    { active: true, id: 27, label: "Horror", name: "horror" },
    { active: true, id: 9648, label: "Mystery", name: "mystery" },
    { active: true, id: 878, label: "Sci-Fi", name: "sci-fi" },
  ]);
  const [tvGenres, setTvGenres] = useLocalStorage<StoredGenre[]>(TV_PREFERENCES_KEY, [
    { active: true, id: 10759, label: "Action", name: "action" },
    { active: true, id: 16, label: "Animation", name: "animation" },
    { active: true, id: 35, label: "Comedy", name: "comedy" },
    { active: true, id: 80, label: "Crime", name: "crime" },
    { active: true, id: 99, label: "Documentary", name: "documentary" },
    { active: true, id: 18, label: "Drama", name: "drama" },
    { active: true, id: 10751, label: "Family", name: "family" },
    { active: true, id: 10762, label: "Kids", name: "kids" },
    { active: true, id: 9648, label: "Mystery", name: "mystery" },
    { active: true, id: 10765, label: "Sci-Fi", name: "sci-fi" },
  ]);
  const [movieFavourites, setMovieFavourites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [cart, setCart] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(CART_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });

  const toggleMovieFavourites = (image: ImageCell) => {
    setMovieFavourites((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
      }

      return cloned;
    });
    setCart((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      }

      return cloned;
    });
  };

  const [tvFavourites, setTvFavourites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });

  const toggleTvFavourites = (image: ImageCell) => {
    setMovieFavourites((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
      }

      return cloned;
    });
    setCart((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      }

      return cloned;
    });
  };

  const toggleCart = (image: ImageCell) => {
    setCart((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
      }

      return cloned;
    });
    setMovieFavourites((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      }

      return cloned;
    });
    setTvFavourites((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      }

      return cloned;
    });
  };

  return (
    <UserContext.Provider
      value={{
        cart,
        movieFavourites,
        movieGenres,
        setCart,
        setMovieFavourites,
        setMovieGenres,
        setTvFavourites,
        setTvGenres,
        setUserName,
        toggleCart,
        toggleMovieFavourites,
        toggleTvFavourites,
        tvFavourites,
        tvGenres,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
