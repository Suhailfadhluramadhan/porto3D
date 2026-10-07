import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { profile } from "./profile.js";

export function HomeContent() {
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
        <div className="absolute -inset-3 rounded-full bg-emerald-500/25 blur-2xl" />
        {!photoError && (
          <img
            src={profile.photo}
            alt={`Foto ${profile.name}`}
            onError={() => setPhotoError(true)}
            className={`relative rounded-full border-2 border-emerald-400/50 object-cover shadow-2xl ${photoSize}`}
          />
        )}
        {photoError && (
          <div
            className={`relative flex items-center justify-center rounded-full border-2 border-emerald-400/50 bg-[#12172f] text-4xl font-bold text-emerald-400 lg:text-5xl ${photoSize}`}
          >
            {initials}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs tracking-widest text-emerald-400 sm:text-sm lg:text-base">
          HELLO, I&apos;M{" "}
          <span className="inline-block animate-[wiggle_1s_ease-in-out_infinite]">
            👋🏻
          </span>
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {profile.name}
        </h1>

        <p className="mt-3 text-base text-slate-400 sm:text-lg lg:text-2xl">
          {profile.role}
        </p>

        <p className="mt-5 text-sm leading-relaxed sm:text-base lg:mt-7 lg:text-lg">
          {profile.description}
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-4 lg:mt-9 md:justify-start">
          <a
            href={profile.cv}
            download
            className="inline-flex items-center gap-3 rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-semibold text-[#0a0e27] transition-transform hover:scale-105 lg:px-9 lg:py-4 lg:text-base"
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