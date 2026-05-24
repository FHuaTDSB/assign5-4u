import { useState } from "react";
import { Button } from "@/components";
import { useUserContext } from "@/hooks";

export const SettingsView = () => {
  const { userName, setUserName, movieGenres, tvGenres, setMovieGenres, setTvGenres } = useUserContext();
  const [value, setValue] = useState(userName);
  const [nameError, setNameError] = useState("");
  const [nameSuccess, setNameSuccess] = useState("");
  const [prefError, setPrefError] = useState("");
  const activeMovieGenres = movieGenres.filter((movieGenre) => movieGenres[movieGenres.findIndex((e) => e.id === movieGenre.id)].active);
  const activeTvGenres = tvGenres.filter((tvGenre) => tvGenres[tvGenres.findIndex((e) => e.id === tvGenre.id)].active);

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Settings</h1>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <div className="max-w-md space-y-4 rounded-2xl border-2 border-blue-950 bg-indigo-900 p-6">
            <div>
              <h2 className="font-semibold text-lg">Profile</h2>
              <p className="text-blue-400 text-sm">Update your profile</p>
            </div>
            <div className="space-y-2">
              <label className="text-cyan-300 text-sm">Username</label>
              <input
                className="w-full rounded-lg border border-blue-950 bg-indigo-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(event) => {
                  setValue(event.target.value);
                  setNameError("");
                  setNameSuccess("");
                }}
                placeholder="Enter your name"
                type="text"
                value={value}
              />
              {nameError && <p className="text-red-400 text-sm">{nameError}</p>}
              {nameSuccess && <p className="text-green-400 text-sm">{nameSuccess}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setValue(userName)} variant="secondary">
                Reset
              </Button>
              <Button
                onClick={() => {
                  const trimmed = value.trim();

                  if (!trimmed) {
                    setNameError("Username cannot be empty!");
                    setNameSuccess("");
                    return;
                  } else {
                    setUserName(trimmed);
                    setNameError("");
                    setNameSuccess("Profile updated!");
                  }
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-2xl space-y-4 rounded-2xl border-2 border-blue-950 bg-indigo-900 p-6">
          <div>
            <h2 className="font-semibold text-lg">Preferences</h2>
            <p className="text-blue-400 text-sm">Choose genres you like!</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Movies</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {movieGenres.map((genre) => (
                <label
                  className="flex items-center gap-2 text-purple-300 text-sm"
                  key={genre.id}
                  onChange={() => {
                    if (activeMovieGenres.length === 1 && genre.active) {
                      setPrefError("Preferences cannot be empty!");
                      return;
                    } else {
                      setMovieGenres(
                        movieGenres.toSpliced(
                          movieGenres.findIndex((e) => e.id === genre.id),
                          1,
                          {
                            active: !genre.active,
                            id: genre.id,
                            label: genre.label,
                            name: genre.name,
                          },
                        ),
                      );
                      setPrefError("");
                    }
                  }}
                >
                  {genre.active ? <input checked readOnly type="checkbox" /> : <input type="checkbox" />}
                  {genre.label}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">TV</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {tvGenres.map((genre) => (
                <label
                  className="flex items-center gap-2 text-purple-300 text-sm"
                  key={genre.id}
                  onChange={() => {
                    if (activeTvGenres.length === 1 && genre.active) {
                      setPrefError("Preferences cannot be empty!");
                      return;
                    } else {
                      setTvGenres(
                        tvGenres.toSpliced(
                          tvGenres.findIndex((e) => e.id === genre.id),
                          1,
                          {
                            active: !genre.active,
                            id: genre.id,
                            label: genre.label,
                            name: genre.name,
                          },
                        ),
                      );
                      setPrefError("");
                    }
                  }}
                >
                  {genre.active ? <input checked readOnly type="checkbox" /> : <input type="checkbox" />}
                  {genre.label}
                </label>
              ))}
            </div>
          </div>
          {prefError && <p className="text-red-400 text-sm">{prefError}</p>}
        </div>
      </div>
    </section>
  );
};
