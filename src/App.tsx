import { useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {
  CareerView,
  CartView,
  CreditsView,
  EpisodeView,
  ErrorView,
  FavouritesView,
  GenreView,
  HomeView,
  ImagesView,
  MoviesView,
  MovieView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  SettingsView,
  SummaryView,
  TelevisionView,
  TrailersView,
  TrendingView,
} from "@/views";
import { useDebounce } from "./hooks";

export const App = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "movie";
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  return (
    <Routes>
      <Route element={<HomeView />} path="/" />
      <Route element={<MainLayout query={query} setQuery={setQuery} type={type} />}>
        <Route path="/movie">
          <Route Component={() => <MoviesView key={window.location.pathname} />} path="category/:category" />
          <Route element={<MovieView />} path=":id">
            <Route element={<SummaryView />} path="summary" />
            <Route element={<CreditsView />} path="credits" />
            <Route element={<TrailersView />} path="trailers" />
            <Route element={<ReviewsView />} path="reviews" />
          </Route>
        </Route>
        <Route path="/tv">
          <Route Component={() => <TelevisionView key={window.location.pathname} />} path="category/:category" />
          <Route element={<MovieView />} path=":id">
            <Route element={<SummaryView />} path="summary" />
            <Route element={<SeasonsView />} path="seasons" />
            <Route element={<EpisodeView />} path="season/:season" />
            <Route element={<CreditsView />} path="credits" />
            <Route element={<TrailersView />} path="trailers" />
            <Route element={<ReviewsView />} path="reviews" />
          </Route>
        </Route>
        <Route Component={() => <TrendingView key={window.location.pathname} />} path="/trending/:media" />
        <Route element={<GenreView />} path="/genre/:media/:genre" />
        <Route element={<SearchView debouncedQuery={debouncedQuery} type={type} />} path="/search" />
        <Route element={<PersonView />} path="/person/:id">
          <Route element={<CareerView />} path="career" />
          <Route element={<ImagesView />} path="images" />
        </Route>
        <Route element={<FavouritesView />} path="/favourites" />
        <Route element={<CartView />} path="/cart" />
        <Route element={<SettingsView />} path="/settings" />
        <Route element={<ErrorView />} path="*" />
      </Route>
    </Routes>
  );
};
