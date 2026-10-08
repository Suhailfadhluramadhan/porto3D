import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ onClose, children, maxWidth = "max-w-[95vw]" }) {
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
      className="fixed inset-0 z-[9998] flex overflow-y-auto overscroll-contain bg-amber-50/60 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`relative m-auto flex h-full w-full ${maxWidth} flex-col overflow-y-auto  border border-white/10 bg-[#12172f] p-7 text-slate-200 shadow-2xl sm:p-10 lg:p-14`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-3 top-2 rounded-full px-2.5 py-1 text-lg text-slate-500 transition-colors hover:text-emerald-400"
        >
          ✕
        </button>

        <div className="m-auto flex min-h-full w-full flex-col">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
