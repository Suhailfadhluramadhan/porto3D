import { useState } from "react";
import { profile } from "../Home/profile.js";

const contacts = [
  { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { label: "GitHub", value: "github.com/username", href: "https://github.com" },
  { label: "LinkedIn", value: "linkedin.com/in/username", href: "https://linkedin.com" },
  { label: "Instagram", value: "@username", href: "https://instagram.com" },
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-500/60";

export function KontakContent() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="flex flex-1 flex-col justify-center space-y-8">
      <header>
        <p className="font-mono text-xs tracking-widest text-emerald-400 sm:text-sm">
          CONTACT
        </p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
          Hubungi Saya
        </h2>
        <p className="mt-2 text-slate-400 sm:text-lg">
          Punya ide atau proyek? Kirim pesan, saya akan balas secepatnya.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-slate-400" htmlFor="nama">
              Nama
            </label>
            <input id="nama" name="nama" className={inputClass} placeholder="Nama kamu" required />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-slate-400" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={inputClass}
              placeholder="nama@email.com"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-slate-400" htmlFor="pesan">
              Pesan
            </label>
            <textarea
              id="pesan"
              name="pesan"
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="Tulis pesanmu..."
              required
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
          >
            {sent ? "Pesan terkirim ✓" : "Kirim Pesan"}
          </button>

          {sent && (
            <p className="text-sm text-emerald-300">
              Template saja — hubungkan ke EmailJS / API milikmu nanti.
            </p>
          )}
        </form>

        <section>
          <h3 className="mb-3 font-semibold text-emerald-400">Kontak Lain</h3>
          <ul className="space-y-3">
            {contacts.map((contact) => (
              <li key={contact.label}>
                <a
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition-colors hover:border-emerald-500/50"
                >
                  <span className="text-slate-400">{contact.label}</span>
                  <span className="text-slate-200">{contact.value}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            Profil lengkap kamu ada di <span className="text-slate-300">{profile.name}</span>{" "}
            — ganti data konten di file <span className="font-mono text-emerald-300">src/Kontak/KontakContent.jsx</span>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default KontakContent;