import type { ReactNode } from "react";

export type SearchType = "movie" | "tv" | "person";

export type Media = "movie" | "tv";

export type ImageCell = {
  id: number;
  imageUrl: string;
  primaryText?: string;
  secondaryText?: string;
  showName?: string;
  showId?: number;
  season?: number;
  media?: Media;
};

export type Genre = {
  name: string;
  label: string;
  id: number;
};

export type StoredGenre = {
  name: string;
  label: string;
  id: number;
  active: boolean;
};

export type ImageAction = {
  id: string;
  icon: (active: boolean) => ReactNode;
  active: (image: ImageCell) => boolean;
  onClick: (image: ImageCell) => void;
  position: "left" | "right";
};
