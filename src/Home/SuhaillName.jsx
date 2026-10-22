import { motion } from "framer-motion";

// Teks "Suhail" dijadikan mask: video hanya tampil di dalam huruf,
// sisanya transparan (background halaman tetap terlihat).
const TEXT = "Suhail";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
  <text x="300" y="170" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-weight="900" font-size="200"
        textLength="580" lengthAdjust="spacingAndGlyphs"
        fill="white" stroke="white" stroke-width="6" stroke-linejoin="round">${TEXT}</text>
</svg>`;

const MASK = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

export function SuhaillName() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden pb-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        // lebar menentukan ukuran huruf: naikkan angka vw untuk memperbesar
        className="aspect-[3/1] w-[94vw]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="h-full w-full object-cover"
          style={{
            WebkitMaskImage: MASK,
            maskImage: MASK,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        >
          <source src="/pantai.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </section>
  );
}

export default SuhaillName; 