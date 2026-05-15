import { useNavigate } from "react-router-dom";
import { Button } from "@/components";

export const ErrorView = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-indigo-950 text-white">
      <h1 className="font-bold text-4xl text-purple-300">404</h1>
      <p className="text-indigo-300">Whoops! The page you're looking for doesn't exist!</p>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </main>
  );
};
