import { MOVIE_ENDPOINT, type TrailersResponse, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useLocation, useParams } from 'react-router-dom';

export const TrailersView = () => {
  const { id } = useParams();
  const location = useLocation();
  const media = location.pathname.slice(location.pathname.indexOf('/') + 1, location.pathname.indexOf('/') + 2) == 'm' ? 'movie' : 'tv';
  const { data } =
    media == 'movie'
      ? useTmdb<TrailersResponse>(`${MOVIE_ENDPOINT}/${id}/videos`, {})
      : useTmdb<TrailersResponse>(`${TV_ENDPOINT}/${id}/videos`, {});
  const trailerVideo =
    data?.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer');

  console.log(data);
  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold">Trailers</h2>
      {trailerVideo ? (
        <div className="aspect-video">
          <iframe
            className="w-1/2 h-1/2 rounded-xl"
            src={`https://www.youtube.com/embed/${trailerVideo.key}`}
            title={trailerVideo.name}
            allowFullScreen
          />
        </div>
      ) : (
        <p className="text-gray-400 text-center">No trailers available.</p>
      )}
    </section>
  );
};