import { useRef, forwardRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

const STROKE = "#34d399";

const HEADING_STYLE = {
  fontSize: "clamp(2.2rem, 7vw, 7rem)",
  lineHeight: 1.3,
};

export const TitleSection = forwardRef(function TitleSection({ containerRef }, ref) {
  const titleRef = useRef(null);

  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(titleProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const titleScale   = useTransform(titleProgress, [0, 0.25, 0.9, 1], [0.6, 1, 1, 0.6]);
  const titleBlurPx  = useTransform(titleProgress, [0, 0.25], [16, 0]);
  const titleFilter = useMotionTemplate`blur(${titleBlurPx}px)`;

  const drawn = useTransform(titleProgress, [0.25, 0.65], [0, 1]);
 const circleOpacity = useTransform(titleProgress, [0.25, 0.26], [0, 1]);
  const pathLength = useSpring(drawn, { stiffness: 100, damping: 25 });
  

  return (
    <section ref={(el) => { titleRef.current = el; if (ref) ref.current = el; }} className="relative -mt-[100vh] h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-4">
        <motion.h2
          style={{
            ...HEADING_STYLE,
            opacity: titleOpacity,
            scale: titleScale,
            filter: titleFilter,
          }}
          className="text-center  font-serif font-extrabold text-slate-200"
        >
          Creative Developer Based In
          <br />
          <span className=" font-serif relative inline-block px-2">
            Indonesia
            <svg
              viewBox="0 0 400 140"
              className="pointer-events-none absolute left-1/2 top-1/2 aspect-[400/140] w-[140%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
            >
              <motion.path
                d="M 70 32 C 150 8, 320 8, 380 46 C 410 82, 330 130, 200 130 C 70 130, 10 104, 22 66 C 34 28, 130 12, 300 30 C 340 38, 365 48, 400 90"
                fill="none"
                stroke={STROKE}
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength, opacity: circleOpacity }}
              />
            </svg>
          </span>
        </motion.h2>
      </div>
    </section>
  );
});