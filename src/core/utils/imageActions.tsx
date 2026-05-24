import { BsCartFill, BsCartPlus } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ICON_SIZE, type ImageAction, type ImageCell } from "@/core";

export const favouriteAction = (
  isFavourite: (image: ImageCell) => boolean,
  onToggleFavourite: (image: ImageCell) => void,
  position: "left" | "right",
): ImageAction => ({
  active: isFavourite,
  icon: (active) =>
    active ? <FaHeart className="text-fuchsia-400" size={ICON_SIZE} /> : <FaRegHeart className="text-white" size={ICON_SIZE} />,
  id: "favorite",
  onClick: onToggleFavourite,
  position: position,
});

export const cartAction = (
  isInCart: (image: ImageCell) => boolean,
  onToggleCart: (image: ImageCell) => void,
  position: "left" | "right",
): ImageAction => ({
  active: isInCart,
  icon: (active) =>
    active ? <BsCartFill className="text-cyan-400" size={ICON_SIZE} /> : <BsCartPlus className="text-white" size={ICON_SIZE} />,
  id: "cart",
  onClick: onToggleCart,
  position: position,
});
