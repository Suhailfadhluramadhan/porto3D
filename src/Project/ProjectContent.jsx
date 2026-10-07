const projects = [
  {
    title: "Project 1",
    desc: "Deskripsi singkat project 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ganti teks ini dengan penjelasan project aslimu.",
    tags: ["React", "Three.js", "Tailwind"],
    gradient: "from-emerald-500/40 via-sky-500/30 to-transparent",
  },
  {
    title: "Project 2",
    desc: "Deskripsi singkat project 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ganti teks ini dengan penjelasan project aslimu.",
    tags: ["Vite", "JavaScript", "CSS"],
    gradient: "from-violet-500/40 via-fuchsia-500/30 to-transparent",
  },
  {
    title: "Project 3",
    desc: "Deskripsi singkat project 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ganti teks ini dengan penjelasan project aslimu.",
    tags: ["React", "Node.js", "REST API"],
    gradient: "from-amber-500/40 via-orange-500/30 to-transparent",
  },
  {
    title: "Project 4",
    desc: "Deskripsi singkat project 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ganti teks ini dengan penjelasan project aslimu.",
    tags: ["Three.js", "GLSL", "R3F"],
    gradient: "from-sky-500/40 via-cyan-500/30 to-transparent",
  },
];

export function ProjectContent() {
  return (
    <div className="space-y-8">
      <header>
        <p className="font-mono text-xs tracking-widest text-emerald-400 sm:text-sm">
          PROJECT
        </p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Karya Saya</h2>
        <p className="mt-2 text-slate-400 sm:text-lg">
          Kumpulan project yang pernah saya buat.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-emerald-500/50"
          >
            <div
              className={`h-36 bg-gradient-to-br ${project.gradient} bg-cover bg-center`}
            />
            <div className="p-5">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {project.desc}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-3 text-sm">
                <a
                  href="#"
                  className="rounded-lg bg-emerald-500/15 px-3 py-1.5 text-emerald-300 transition-colors hover:bg-emerald-500/30"
                >
                  Live Demo
                </a>
                <a
                  href="#"
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-300"
                >
                  Source Code
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ProjectContent;