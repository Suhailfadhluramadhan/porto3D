import { profile } from "../Home/profile.js";

const skills = [
  "React",
  "JavaScript",
  "Three.js",
  "React Three Fiber",
  "Tailwind CSS",
  "Git",
  "Figma",
  "Node.js",
];

const experiences = [
  {
    year: "2024 — Sekarang",
    title: "Frontend Developer (Freelance)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ganti teks ini dengan pengalaman kerjamu.",
  },
  {
    year: "2023 — 2024",
    title: "Web Developer",
    desc: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ganti teks ini dengan pengalaman kerjamu.",
  },
  {
    year: "2022 — 2023",
    title: "Internship",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation. Ganti teks ini dengan pengalaman kerjamu.",
  },
];

export function AboutContent() {
  return (
    <div className="space-y-9">
      <header>
        <p className="font-mono text-xs tracking-widest text-emerald-400 sm:text-sm">
          ABOUT ME
        </p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{profile.name}</h2>
        <p className="mt-2 text-slate-400 sm:text-lg">{profile.role}</p>
      </header>

      <div className="grid gap-9 md:grid-cols-2">
        <section>
          <h3 className="mb-3 font-semibold text-emerald-400">Biografi</h3>
          <div className="space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            <p>{profile.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ganti
              paragraf ini dengan cerita singkat tentang dirimu.
            </p>
          </div>
        </section>

        <section>
          <h3 className="mb-3 font-semibold text-emerald-400">Keahlian</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <h3 className="mb-3 mt-7 font-semibold text-emerald-400">Bahasa</h3>
          <div className="flex flex-wrap gap-2">
            {["Indonesia", "Inggris"].map((language) => (
              <span
                key={language}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
              >
                {language}
              </span>
            ))}
          </div>
        </section>
      </div>

      <section>
        <h3 className="mb-4 font-semibold text-emerald-400">Pengalaman</h3>
        <ul className="space-y-4">
          {experiences.map((experience) => (
            <li
              key={experience.year}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"
            >
              <p className="font-mono text-xs text-emerald-400">
                {experience.year}
              </p>
              <p className="mt-1 font-semibold">{experience.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {experience.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AboutContent;