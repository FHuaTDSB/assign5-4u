import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { ButtonGroup, Footer, LinkGroup } from "@/components";

type MainLayoutProps = {
  query: string;
  setQuery: (value: string) => void;
};

export const MainLayout = ({ query, setQuery }: MainLayoutProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "movie";
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-indigo-950 text-fuchsia-400">
      <header>
        <nav className="justify-bgetween flex bg-purple-950 p-4">
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
                setSearchParams({ q: event.target.value, type: type });
                navigate(`/search`);
              }}
              placeholder="Search..."
              type="search"
              value={query}
            />
            <ButtonGroup
              onClick={(value) => setSearchParams({ q: query, type: value })}
              options={[
                { label: "Movie", value: "movie" },
                { label: "TV", value: "tv" },
                { label: "Person", value: "person" },
              ]}
              value={type}
            />
          </div>
        </nav>
        <div className="h-1 bg-cyan-600" />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
