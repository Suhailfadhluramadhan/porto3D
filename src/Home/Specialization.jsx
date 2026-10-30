import { useRef, forwardRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

const HEADING_STYLE = {
  fontSize: "clamp(2.2rem, 7vw, 7rem)",
  lineHeight: 1.3,
};

export const  Specialization = forwardRef(function SpecSection({ containerRef }, ref) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0., 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, ], [0.6, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 0.3], [16, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section
      id="specialization-section"
      ref={(el) => {
        sectionRef.current = el;
        if (ref) ref.current = el;
      }}
      className="relative -mt-[80vh] h-[200vh]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center px-4">
        <motion.h2
          style={{ ...HEADING_STYLE, opacity, scale, filter }}
          className="text-center  font-serif font-extrabold text-slate-200"
        >
          Specialization in
          <br />
          Front End Developer
        </motion.h2>
      </div>
    </section>
  );
});