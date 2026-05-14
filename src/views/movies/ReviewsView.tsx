import { useLocation, useParams } from "react-router-dom";
import { MOVIE_ENDPOINT, type ReviewsResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const ReviewsView = () => {
  const { id } = useParams();
  const location = useLocation();
  const media = location.pathname.slice(location.pathname.indexOf("/") + 1, location.pathname.indexOf("/") + 2) === "m" ? "movie" : "tv";
  const endpoint = media === "movie" ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { data } = useTmdb<ReviewsResponse>(`${endpoint}/${id}/reviews`, {});

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="font-bold text-2xl">Reviews</h2>
      {data.results.length ? (
        data.results.slice(0, 5).map((review) => (
          <div className="rounded-xl bg-gray-800 p-5 shadow" key={review.id}>
            <p className="mb-2 text-gray-400 text-sm">By {review.author}</p>
            <p className="line-clamp-6 text-gray-300 text-sm leading-relaxed">{review.content}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-cyan-700">No reviews available.</p>
      )}
    </section>
  );
};
