import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export function ScrollIndicator() {
  const [ready, setReady] = useState(false); // muncul pertama kali setelah jeda
  const [isScrolling, setIsScrolling] = useState(false);
  const [atSpecialization, setAtSpecialization] = useState(false);

  // muncul pertama kali setelah 1.5 detik (pengganti delay)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // sembunyikan saat sampai ke section Specialization
 useEffect(() => {
  let observer;
  let tries = 0;

  const attach = () => {
    const el = document.getElementById("specialization-section");
    if (!el) {
      if (tries++ < 20) setTimeout(attach, 100);
      return;
    }
    observer = new IntersectionObserver(
      ([entry]) => setAtSpecialization(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
  };

  attach();
  return () => observer?.disconnect();
}, []);

  // deteksi scroll (window maupun container scroll di dalam modal)
  useEffect(() => {
    let timeout;

    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      // dianggap berhenti kalau 200ms tidak ada scroll lagi
      timeout = setTimeout(() => setIsScrolling(false), 200);
    };

    // capture: true supaya scroll dari elemen mana pun ikut terdeteksi
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      clearTimeout(timeout);
    };
  }, []);

  const visible = ready && !isScrolling && !atSpecialization;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pointer-events-none fixed bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4"
      aria-hidden="true"
    >
      <p className="text-2xl  font-bold font-serif uppercase tracking-widest text-slate-400">
        Scroll
      </p>

      {/* badan mouse */}
      <div className="flex h-16 w-10 justify-center rounded-full border-[3px] border-slate-200 pt-3">
        {/* titik (roda scroll) */}
        <motion.span
          className="block h-3 w-2 rounded-full bg-slate-200"
          animate={{ y: [0, 20, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <p className="text-2xl  font-bold font-serif uppercase tracking-widest text-slate-400">
        Down
      </p>
    </motion.div>
  );
}

export default ScrollIndicator;