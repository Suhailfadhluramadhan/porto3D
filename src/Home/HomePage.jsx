import { useContext } from "react";
import { Darkmode } from "../context/DarkmodeContext.js";
import { HomeContent } from "./HomeContent.jsx";

export default function HomePage() {
  const { toggle } = useContext(Darkmode) ?? {};

  return (
    <div
      className={`flex min-h-screen w-full items-center justify-center px-5 py-12 transition-colors duration-300 ${
        toggle
          ? "bg-slate-100 text-slate-900"
          : "bg-[#0a0e27] text-slate-200"
      }`}
    >
      <div className="w-full max-w-6xl">
        <HomeContent />
      </div>
    </div>
  );
}