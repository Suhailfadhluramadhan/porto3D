import { useContext, useState } from "react";
import { Darkmode } from "../context/DarkmodeContext.js";
import { FaDownload } from "react-icons/fa";
import { profile } from "./profile.js";

export function HomeContent() {
  const { toggle } = useContext(Darkmode) ?? {};
  const [photoError, setPhotoError] = useState(false);

  const initials = profile.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const photoSize = "h-40 w-40 sm:h-48 sm:w-48 lg:h-64 lg:w-64";

  return (
    <div className="flex flex-col items-center gap-7 text-center md:flex-row md:items-center md:gap-12 md:text-left">
      <div className="relative shrink-0">
        <div
          className={`absolute -inset-3 rounded-full blur-2xl ${
            toggle ? "bg-emerald-400/30" : "bg-emerald-500/25"
          }`}
        />
        {!photoError && (
          <img
            src={profile.photo}
            alt={`Foto ${profile.name}`}
            onError={() => setPhotoError(true)}
            className={`relative rounded-full object-cover shadow-2xl ${photoSize} ${
              toggle
                ? "border-2 border-emerald-500/60"
                : "border-2 border-emerald-400/50"
            }`}
          />
        )}
        {photoError && (
          <div
            className={`relative flex items-center justify-center rounded-full border-2 text-4xl font-bold lg:text-5xl ${photoSize} ${
              toggle
                ? "border-emerald-500/60 bg-white text-emerald-600"
                : "border-emerald-400/50 bg-[#12172f] text-emerald-400"
            }`}
          >
            {initials}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`font-mono text-xs tracking-widest sm:text-sm lg:text-base ${
            toggle ? "text-emerald-600" : "text-emerald-400"
          }`}
        >
          HELLO, I&apos;M{" "}
          <span className="inline-block animate-[wiggle_1s_ease-in-out_infinite]">
            👋🏻
          </span>
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {profile.name}
        </h1>

        <p
          className={`mt-3 text-base sm:text-lg lg:text-2xl ${
            toggle ? "text-slate-600" : "text-slate-400"
          }`}
        >
          {profile.role}
        </p>

        <p className="mt-5 text-sm leading-relaxed sm:text-base lg:mt-7 lg:text-lg">
          {profile.description}
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-4 lg:mt-9 md:justify-start">
          <a
            href={profile.cv}
            download
            className={`inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-105 lg:px-9 lg:py-4 lg:text-base ${
              toggle
                ? "bg-emerald-600 text-white"
                : "bg-emerald-400 text-[#0a0e27]"
            }`}
          >
            <FaDownload size={14} />
            Download CV
          </a>
        </div>
      </div>

      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }
      `}</style>
    </div>
  );
}

export default HomeContent;