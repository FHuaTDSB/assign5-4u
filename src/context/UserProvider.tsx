import type { ReactNode } from "react";
import { UserContext } from "@/context";
import { CART_KEY, FAVORITES_KEY, type ImageCell, USERNAME_KEY } from "@/core";
import { useLocalStorage } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, "User");
  const [favourites, setFavourites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [cart, setCart] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(CART_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });

  const toggleFavourite = (image: ImageCell) => {
    setFavourites((prev) => {
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
    setFavourites((prev) => {
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
        favourites,
        setUserName,
        toggleCart,
        toggleFavourite,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
