import { FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components";
import { fixPrice, ICON_SIZE } from "@/core";
import { useUserContext } from "@/hooks";

export const CartView = () => {
  const { cart, setCart, toggleCart, toggleFavourites } = useUserContext();
  const subTotal = fixPrice(
    Array.from(cart.values())
      .map((value) => Number(value.secondaryText?.slice(1)))
      .reduce((a, b) => a + b, 0),
  );

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Cart</h1>
        {cart.size !== 0 && (
          <Button
            onClick={() => {
              setCart(new Map());
            }}
            variant="red"
          >
            Empty Cart
          </Button>
        )}
      </div>
      {cart.size === 0 ? (
        <p className="mt-10 text-cyan-700">Cart is empty!</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-blue-700 bg-blue-950">
          <table className="w-full text-left">
            <thead className="bg-blue-900 text-cyan-300 text-sm">
              <tr>
                <th className="p-3 text-lg">Items</th>
                <th className="p-3 text-lg">Type</th>
                <th className="p-3 text-lg">Price</th>
                <th className="p-3 text-right text-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(cart.values()).map((item) => (
                <tr className="content-center border-blue-800 border-t" key={item.id}>
                  <td className="flex items-center gap-3 p-3">
                    <img className="w-20 rounded object-cover" src={item.imageUrl} />
                    <p className="text-cyan-400">{item.media === "movie" ? item.primaryText : `${item.showName} - ${item.primaryText}`}</p>
                  </td>
                  <td className="p-3 text-indigo-400">{item.media === "movie" ? "Movie" : "TV Show"}</td>
                  <td className="p-3 text-purple-300">{item.secondaryText}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <button
                        className="relative rounded-full p-2 text-fuchsia-400 transition hover:bg-indigo-700"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavourites(item);
                        }}
                      >
                        <FaRegHeart size={ICON_SIZE * 1.1} />
                      </button>
                      <button
                        className="relative rounded-full p-2 text-red-400 transition hover:bg-indigo-700"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleCart(item);
                        }}
                      >
                        <FaRegTrashAlt size={ICON_SIZE * 1.1} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="content-center border-blue-800 border-t">
                <td className="p-3 text-center font-semibold text-indigo-400 text-lg" colSpan={2}>
                  Subtotal
                </td>
                <td className="p-3 text-center font-semibold text-indigo-400 text-lg">{`$${subTotal}`}</td>
                <td></td>
              </tr>
              <tr className="content-center border-blue-800 border-t">
                <td className="p-3 text-center font-semibold text-lg text-purple-400" colSpan={2}>
                  Taxes
                </td>
                <td className="p-3 text-center font-semibold text-lg text-purple-400">{`$${fixPrice(subTotal * 0.13)}`}</td>
                <td></td>
              </tr>
              <tr className="bg-indigo-900 text-fuchsia-400 text-sm">
                <td className="p-3 text-center font-semibold text-lg" colSpan={2}>
                  Total
                </td>
                <td className="p-3 text-center font-semibold text-lg">{`$${fixPrice(subTotal * 1.13)}`}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
