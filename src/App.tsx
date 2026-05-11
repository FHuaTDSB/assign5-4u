import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {
  CareerView,
  CreditsView,
  EpisodeView,
  ErrorView,
  GenreView,
  HomeView,
  ImagesView,
  MoviesView,
  MovieView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  SummaryView,
  TelevisionView,
  TrailersView,
  TrendingView,
} from "@/views";

export const App = () => {
  return (
    <Routes>
      <Route element={<HomeView />} path="/" />
      <Route element={<MainLayout />}>
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
        <Route element={<SearchView />} path="/search" />
        <Route element={<PersonView />} path="/person/:id">
          <Route element={<CareerView />} path="career" />
          <Route element={<ImagesView />} path="images" />
        </Route>
      </Route>
      <Route element={<ErrorView />} path="*" />
    </Routes>
  );
};
