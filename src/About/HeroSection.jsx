import { motion } from "framer-motion";
import FadeContent from "../components/FadeContent.jsx";

export function HeroSection() {
  return (
    <FadeContent
  effect="mist"
  duration={1.8}
  ease="power2.out"
  stagger={0.1}
  threshold={0.1}
>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo - Left (desktop), Top (mobile) */}
          <div className="relative h-[400px] md:h-auto w-full aspect-square md:aspect-none">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
              alt="Profile"
              className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Text - Right (desktop), Bottom (mobile) */}
          <div className="flex flex-col justify-center text-left md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight"
            >
              Hello, I'm Suhail
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed mb-6"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4"
            >
              <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold transition">
                Contact Me
              </button>
              <button className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white rounded-xl font-semibold transition">
                Download CV
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </FadeContent>
  );
}

export default HeroSection;
