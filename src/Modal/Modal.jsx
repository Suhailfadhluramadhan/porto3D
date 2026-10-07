import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ onClose, children, maxWidth = "max-w-5xl" }) {
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

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9998] flex overflow-y-auto overscroll-contain bg-[#0a0e27]/95 p-5 backdrop-blur-sm sm:p-8"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`relative m-auto w-full ${maxWidth} rounded-3xl border border-white/10 bg-[#12172f] p-7 text-slate-200 shadow-2xl sm:p-10 lg:p-14`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-3 top-2 rounded-full px-2.5 py-1 text-lg text-slate-500 transition-colors hover:text-emerald-400"
        >
          ✕
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}