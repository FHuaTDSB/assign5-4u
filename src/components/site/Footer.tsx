import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="align-self-end">
      <div className="h-1 bg-cyan-900" />
      <nav className="flex justify-between bg-blue-950 p-4 px-30 py-5">
        <p className="text-cyan-500">Built with React, Vite, Tailwind and React Router</p>
        <div className="flex gap-8">
          <a className="flex items-center gap-2 text-cyan-500" href="https://github.com/FHuaTDSB/assign5-4u" target="blank">
            <FaGithub className="text-cyan-500" />
            Github
          </a>
        </div>
      </nav>
    </footer>
  );
};
