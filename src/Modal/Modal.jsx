import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Noise from "../components/Noise";

export default function Modal({ onClose, children, maxWidth = "max-w-[95vw]" }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setReady(true))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9998] flex overscroll-contain bg-amber-50/60 backdrop-blur-sm transition-opacity duration-500"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`relative m-auto h-full w-full ${maxWidth} overflow-hidden border border-white/10 bg-[#12172f] text-slate-200 shadow-2xl`}
      >
        <div className="h-full w-full overflow-y-auto p-7 sm:p-10 lg:p-14">
          <div className="m-auto flex min-h-full w-full flex-col">
            {children}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-30">
          <Noise
            opacity={0.2}
            size={1}
            fps={24}
            blendMode="overlay"
            contrast={0.6}
            colored={false}
            dust={0}
            scratches={0}
            scanlines={0}
            flicker={0}
          />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-3 top-2 z-40 rounded-full px-2.5 py-1 text-lg text-slate-500 transition-colors hover:text-emerald-400"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body,
  );
}