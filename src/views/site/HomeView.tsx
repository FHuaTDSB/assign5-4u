import { useNavigate } from "react-router-dom";
import { Button, Footer } from "@/components";

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-indigo-950 text-white">
      <main className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center px-4">
        <section className="space-y-8 text-center">
          <h1 className="font-bold text-5xl tracking-tight">Flickerpix V2</h1>
          <p className="text-cyan-100 text-lg">All your favourite movies and shows in one place!</p>
          <Button onClick={() => navigate("/movie/category/now_playing")}>Enter</Button>
        </section>
      </main>
      <Footer />
    </div>
  );
};
