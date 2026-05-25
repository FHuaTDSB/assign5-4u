import { Button, Gallery } from "@/components";
import { useUserContext } from "@/hooks";

export const CartView = () => {
  const { cart, setCart } = useUserContext();
  console.log(cart);

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Cart</h1>
        <Button
          onClick={() => {
            setCart(new Map());
          }}
          variant="red"
        >
          Empty Cart
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-300 text-sm">
            <tr>
              <th className="p-3 text-lg">Items</th>
              <th className="p-3 text-lg">Type</th>
              <th className="p-3 text-lg">Price</th>
              <th className="p-3 text-right text-lg">Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      {cart.size === 0 ? (
        <p className="mt-10 text-cyan-700">No movies, only sadness...</p>
      ) : (
        <Gallery images={Array.from(cart.values())}></Gallery>
      )}
    </section>
  );
};
