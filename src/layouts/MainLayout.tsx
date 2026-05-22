import { BsCart } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ButtonGroup, Footer, LinkGroup } from "@/components";
import { ICON_SIZE } from "@/core";
import { useUserContext } from "@/hooks";

type MainLayoutProps = {
  query: string;
  setQuery: (value: string) => void;
  type: string;
};

export const MainLayout = ({ query, setQuery, type }: MainLayoutProps) => {
  const navigate = useNavigate();
  const { userName, favourites, cart } = useUserContext();

  return (
    <div className="flex min-h-screen flex-col bg-indigo-950 text-fuchsia-400">
      <header>
        <nav className="flex justify-between bg-purple-900 p-4">
          <div className="flex gap-8">
            <Link className="flex items-center gap-2" to="/">
              <img alt="FlickerPix Logo" className="h-10" src="/src/assets/logo.png" />
              <h1 className="border-cyan-300 border-l-3 pl-2 font-bold text-3xl">Flickerpix</h1>
            </Link>
            <LinkGroup
              options={[
                { label: "Movie", match: "/movie/category/:category", to: "/movie/category/now_playing" },
                { label: "TV", match: "/tv/category/:category", to: "/tv/category/airing_today" },
                { label: "Trending", match: "/trending/:media", to: "/trending/movie?interval=day" },
                { label: "Genre", match: "/genre/:media/:genre", to: "/genre/movie/action" },
              ]}
            />
          </div>
          <div className="flex gap-4">
            <input
              className="flex-1 rounded-xl bg-indigo-950 p-2 transition focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
              onChange={(event) => {
                setQuery(event.target.value);
                navigate(`/search?q=${event.target.value}&type=${type}`);
              }}
              placeholder="Search..."
              type="search"
              value={query}
            />
            <ButtonGroup
              onClick={(value) => navigate(`/search?q=${query}&type=${value}`)}
              options={[
                { label: "Movie", value: "movie" },
                { label: "TV", value: "tv" },
                { label: "Person", value: "person" },
              ]}
              value={type}
            />
          </div>
        </nav>
      </header>
      <header>
        <nav className="flex justify-between bg-purple-950 p-4">
          <div className="flex">
            <h1 className="border-blue-400 border-l-3 pl-2 font-bold text-3xl text-indigo-300">{`Hello ${userName}!`}</h1>
          </div>
          <div>
            <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/favorites")}>
              <FaRegHeart size={ICON_SIZE} />
              {favourites.size > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {favourites.size}
                </span>
              )}
            </button>
            <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/cart")}>
              <BsCart size={ICON_SIZE} />
              {cart.size > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {cart.size}
                </span>
              )}
            </button>
            <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/settings")}>
              <GoGear size={ICON_SIZE} />
            </button>
          </div>
        </nav>
      </header>
      <div className="h-1 bg-cyan-600" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
